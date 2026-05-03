# Guia — Gestão de Pedidos

---

## Índice

1. [O que é e porquê implementar](#1-o-que-é-e-porquê-implementar)
2. [Modelo de dados](#2-modelo-de-dados)
3. [Backend — rotas](#3-backend--rotas)
4. [Frontend — integração](#4-frontend--integração)
5. [Página de pedidos](#5-página-de-pedidos)
6. [Fluxo completo](#6-fluxo-completo)

---

## 1. O que é e porquê implementar

Gestão de pedidos permite ao utilizador autenticado:
- Criar um pedido no checkout
- Ver o histórico de pedidos
- Ver o detalhe de um pedido específico

Sem autenticação, pedidos eram anónimos e perdidos após fechar o browser. Com autenticação, ficam associados ao utilizador e persistem na base de dados.

---

## 2. Modelo de dados

```ts
// server/src/db/schema.ts
import { pgTable, serial, text, integer, timestamp, pgEnum } from 'drizzle-orm/pg-core'

export const orderStatusEnum = pgEnum('order_status', [
  'pending',      // pedido criado, aguarda pagamento
  'paid',         // pagamento confirmado
  'processing',   // a preparar para envio
  'shipped',      // enviado
  'delivered',    // entregue
  'cancelled',    // cancelado
])

export const orders = pgTable('orders', {
  id:            serial('id').primaryKey(),
  userId:        integer('user_id').notNull().references(() => users.id),
  status:        orderStatusEnum('status').notNull().default('pending'),

  // Endereço de entrega — snapshot no momento do pedido
  // Não usar referência ao perfil — o perfil pode mudar depois do pedido
  name:          text('name').notNull(),
  email:         text('email').notNull(),
  phone:         text('phone').notNull(),
  address:       text('address').notNull(),
  zip:           text('zip').notNull(),
  city:          text('city').notNull(),
  country:       text('country').notNull(),

  paymentMethod: text('payment_method').notNull(),  // 'e-money' | 'cash-on-delivery'

  // Totais — snapshot no momento do pedido
  // Não recalcular depois — preços podem mudar
  subtotal:      integer('subtotal').notNull(),  // em cêntimos
  shipping:      integer('shipping').notNull(),
  vat:           integer('vat').notNull(),
  grandTotal:    integer('grand_total').notNull(),

  createdAt:     timestamp('created_at').defaultNow(),
  updatedAt:     timestamp('updated_at').defaultNow(),
})

export const orderItems = pgTable('order_items', {
  id:        serial('id').primaryKey(),
  orderId:   integer('order_id').notNull().references(() => orders.id),
  productId: integer('product_id').notNull().references(() => products.id),

  // Snapshot do produto no momento do pedido
  // Nome e preço podem mudar — guardamos o valor histórico
  name:      text('name').notNull(),
  price:     integer('price').notNull(),  // em cêntimos
  quantity:  integer('quantity').notNull(),
})
```

**Porquê guardar snapshots de nome e preço?** Se o preço de um produto mudar amanhã, os pedidos antigos devem mostrar o preço que o utilizador pagou, não o preço atual. O mesmo para o endereço — o utilizador pode mudar o endereço do perfil sem afetar pedidos já feitos.

**Porquê preços em cêntimos (integers)?** Aritmética de ponto flutuante em JavaScript e bases de dados pode causar erros em cálculos monetários. Guardar em cêntimos (inteiros) evita esse problema. `2999` = $29.99.

---

## 3. Backend — rotas

```ts
// server/src/routes/orders.ts
import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import { db } from '../db'
import { orders, orderItems, products } from '../db/schema'
import { eq, desc } from 'drizzle-orm'

const router = Router()

// Todas as rotas de pedidos requerem autenticação
router.use(authenticate)

// POST /api/orders — criar pedido
router.post('/', async (req: AuthRequest, res) => {
  const {
    name, email, phone, address, zip, city, country,
    paymentMethod, items, subtotal, shipping, vat, grandTotal,
  } = req.body

  // Validação básica
  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Order must have at least one item' })
  }

  // Verificar que os produtos existem e obter preços atuais
  // Não confiar nos preços enviados pelo cliente — validar no servidor
  const productIds = items.map((item: any) => item.productId)
  const dbProducts = await db.select()
    .from(products)
    .where(inArray(products.id, productIds))

  // Criar o pedido numa transação — ou tudo ou nada
  const order = await db.transaction(async (tx) => {
    const [newOrder] = await tx.insert(orders).values({
      userId: req.userId!,
      name, email, phone, address, zip, city, country,
      paymentMethod,
      subtotal, shipping, vat, grandTotal,
    }).returning()

    // Inserir os items com os preços validados no servidor
    await tx.insert(orderItems).values(
      items.map((item: any) => {
        const product = dbProducts.find(p => p.id === item.productId)
        return {
          orderId: newOrder.id,
          productId: item.productId,
          name: product!.name,      // snapshot do nome atual
          price: product!.price,    // preço validado no servidor, não o do cliente
          quantity: item.quantity,
        }
      })
    )

    return newOrder
  })

  res.status(201).json(order)
})

// GET /api/orders — lista de pedidos do utilizador autenticado
router.get('/', async (req: AuthRequest, res) => {
  const userOrders = await db.select()
    .from(orders)
    .where(eq(orders.userId, req.userId!))
    .orderBy(desc(orders.createdAt))  // mais recentes primeiro

  res.json(userOrders)
})

// GET /api/orders/:id — detalhe de um pedido
router.get('/:id', async (req: AuthRequest, res) => {
  const orderId = parseInt(req.params.id)

  const [order] = await db.select()
    .from(orders)
    .where(eq(orders.id, orderId))

  if (!order) {
    return res.status(404).json({ error: 'Order not found' })
  }

  // Verificar que o pedido pertence ao utilizador autenticado
  // Sem esta verificação, qualquer utilizador autenticado podia ver pedidos de outros
  if (order.userId !== req.userId) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  const items = await db.select()
    .from(orderItems)
    .where(eq(orderItems.orderId, orderId))

  res.json({ ...order, items })
})

export default router
```

**Porquê transação no POST?** Se a inserção dos items falhar após criar o pedido, ficaria um pedido sem items na base de dados. A transação garante que ou tudo é inserido ou nada — a base de dados fica sempre consistente.

**Porquê validar o preço no servidor?** Um utilizador malicioso poderia alterar o valor enviado pelo frontend (ex: `price: 1` em vez do preço real). Nunca confiar em dados monetários que vêm do cliente — buscar sempre o preço da base de dados.

---

## 4. Frontend — integração

### Orders service com RTK Query

```ts
// src/app/services/orders.ts
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './base-query'

interface OrderItem {
  productId: number
  quantity: number
}

interface CreateOrderPayload {
  name: string
  email: string
  phone: string
  address: string
  zip: string
  city: string
  country: string
  paymentMethod: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  vat: number
  grandTotal: number
}

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: baseQueryWithReauth,  // usa o baseQuery com renovação automática de token
  tagTypes: ['Order'],
  endpoints: (builder) => ({

    createOrder: builder.mutation<{ id: number }, CreateOrderPayload>({
      query: (payload) => ({
        url: '/orders',
        method: 'POST',
        body: payload,
      }),
      // Invalida a lista de pedidos após criar um novo
      invalidatesTags: ['Order'],
    }),

    getOrders: builder.query<Order[], void>({
      query: () => '/orders',
      providesTags: ['Order'],
    }),

    getOrderById: builder.query<OrderWithItems, number>({
      query: (id) => `/orders/${id}`,
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),

  }),
})

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
} = ordersApi
```

**Porquê `tagTypes` e `invalidatesTags`?** O RTK Query usa tags para saber quando invalidar o cache. Quando crias um novo pedido (`invalidatesTags: ['Order']`), o cache da lista de pedidos (`providesTags: ['Order']`) é automaticamente invalidado — na próxima vez que o componente de lista montar, faz um novo fetch.

### Integração no checkout

```tsx
// checkout-form.tsx
const [createOrder, { isLoading }] = useCreateOrderMutation()
const cartItems = useSelector(selectItems)
const subtotal = useSelector(selectSubtotal)
const shipping = useSelector(selectShipping)
const vat = useSelector(selectVAT)
const grandTotal = useSelector(selectGrandTotal)

const onSubmit = async (data: CheckoutFormData) => {
  try {
    const result = await createOrder({
      ...data,
      items: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      subtotal,
      shipping,
      vat,
      grandTotal,
    }).unwrap()

    dispatch(clearCart())
    // abrir modal de confirmação com result.id

  } catch (error) {
    console.error('Order failed:', error)
  }
}
```

---

## 5. Página de pedidos

```tsx
// src/pages/orders-page.tsx
import { useGetOrdersQuery } from '@/app/services/orders'
import { Spinner } from '@/components/ui'
import { ErrorMessage } from '@/components/widgets'
import { toMoney } from '@/libs/helpers'
import { Link } from 'react-router-dom'
import { cn } from '@/libs/cn'

const OrdersPage = () => {
  const { data: orders, isLoading, isError, refetch } = useGetOrdersQuery()

  if (isLoading) return <Spinner label="Loading orders..." />
  if (isError) return <ErrorMessage onRetry={refetch} />

  return (
    <main className={cn('wrapper', 'region')}>
      <h1 className={cn('text-2xl', 'uppercase')}>My Orders</h1>

      {orders?.length === 0 ? (
        <p className={cn('text-base', 'text-black/50')}>
          You haven't placed any orders yet.
        </p>
      ) : (
        <ul role="list" className={cn('flex', 'flex-col', 'gap-4')}>
          {orders?.map(order => (
            <li key={order.id}>
              <Link
                to={`/orders/${order.id}`}
                className={cn('block', 'p-6', 'bg-white', 'rounded-lg')}
              >
                <div className={cn('flex', 'justify-between', 'items-center')}>
                  <div>
                    <p className={cn('text-base', 'font-bold')}>
                      Order #{order.id}
                    </p>
                    <p className={cn('text-xs', 'text-black/50')}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={cn('text-right')}>
                    <p className={cn('text-md', 'font-bold')}>
                      {toMoney(order.grandTotal)}
                    </p>
                    <p className={cn('text-xs', 'uppercase', 'text-primary-400')}>
                      {order.status}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default OrdersPage
```

---

## 6. Fluxo completo

```
Checkout submetido
  → createOrder mutation
    → POST /api/orders (com access token no header)
    → Backend valida preços contra a base de dados
    → Transação: cria order + order_items
    → Responde com { id: 123 }
  → Frontend: clearCart + abre modal de confirmação

Página de pedidos
  → useGetOrdersQuery
    → GET /api/orders (com access token)
    → Backend filtra por userId — utilizador só vê os seus pedidos
    → Lista ordenada por data (mais recentes primeiro)

Detalhe de pedido
  → useGetOrderByIdQuery(id)
    → GET /api/orders/:id
    → Backend verifica que order.userId === req.userId
    → Retorna pedido com items
```
