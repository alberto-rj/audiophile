# Guia de Gestão de Pedidos

---

## Índice

1. [Visão geral](#1-visão-geral)
2. [Backend — modelo de dados e rotas](#2-backend--modelo-de-dados-e-rotas)
3. [Implementação backend](#3-implementação-backend)
4. [Implementação frontend](#4-implementação-frontend)
5. [Página de pedidos](#5-página-de-pedidos)
6. [Fluxo completo](#6-fluxo-completo)

---

## 1. Visão geral

A gestão de pedidos permite que um utilizador autenticado:

- Crie um pedido ao fazer checkout
- Consulte o histórico dos seus pedidos
- Veja o detalhe de um pedido específico

Os pedidos estão sempre associados a um utilizador — não é possível criar ou consultar pedidos sem autenticação.

---

## 2. Backend — modelo de dados e rotas

### Schema Drizzle

```ts
// server/src/db/schema.ts
import { pgTable, serial, text, integer, timestamp, pgEnum } from 'drizzle-orm/pg-core'
import { users } from './schema'

export const orderStatusEnum = pgEnum('order_status', [
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
])

export const orders = pgTable('orders', {
  id:        serial('id').primaryKey(),
  userId:    integer('user_id').notNull().references(() => users.id),
  status:    orderStatusEnum('status').default('pending'),
  // Campos de envio — snapshot do momento do pedido
  // Não referenciar a tabela de utilizadores directamente
  // porque o utilizador pode mudar a morada depois do pedido
  name:      text('name').notNull(),
  email:     text('email').notNull(),
  phone:     text('phone').notNull(),
  address:   text('address').notNull(),
  zip:       text('zip').notNull(),
  city:      text('city').notNull(),
  country:   text('country').notNull(),
  // Método de pagamento
  paymentMethod: text('payment_method').notNull(),
  // Totais — snapshot do momento do pedido
  subtotal:  integer('subtotal').notNull(),
  shipping:  integer('shipping').notNull().default(50),
  vat:       integer('vat').notNull(),
  total:     integer('total').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const orderItems = pgTable('order_items', {
  id:        serial('id').primaryKey(),
  orderId:   integer('order_id').notNull().references(() => orders.id),
  productId: integer('product_id').notNull().references(() => products.id),
  // Snapshot do produto no momento do pedido
  // O produto pode mudar de nome ou preço depois
  name:      text('name').notNull(),
  price:     integer('price').notNull(),
  quantity:  integer('quantity').notNull(),
  image:     text('image').notNull(),
})
```

**Porquê guardar snapshots (nome, preço) em vez de referências?**
Se o produto mudar de preço ou nome depois do pedido, o histórico de pedidos do utilizador devia mostrar o preço e nome que ele pagou — não o preço atual. Guardar snapshots garante imutabilidade do histórico.

### Rotas

```
POST /api/orders              → cria pedido (autenticado)
GET  /api/orders              → lista pedidos do utilizador (autenticado)
GET  /api/orders/:id          → detalhe de um pedido (autenticado)
```

---

## 3. Implementação backend

```ts
// server/src/routes/orders.ts
import { Router } from 'express'
import { db } from '../db'
import { orders, orderItems } from '../db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { requireAuth } from '../middleware/auth'

const router = Router()

// Todas as rotas de pedidos requerem autenticação
router.use(requireAuth)

// POST /api/orders
router.post('/', async (req, res) => {
  const {
    name, email, phone,
    address, zip, city, country,
    paymentMethod,
    items,         // [{ productId, name, price, quantity, image }]
    subtotal, shipping, vat, total,
  } = req.body

  // Validação mínima
  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Order must have at least one item' })
  }

  // Criar pedido e items numa transação
  // Se alguma operação falhar, tudo é revertido
  const result = await db.transaction(async (tx) => {
    const [order] = await tx.insert(orders).values({
      userId: req.user!.id,
      name, email, phone,
      address, zip, city, country,
      paymentMethod,
      subtotal, shipping, vat, total,
    }).returning()

    await tx.insert(orderItems).values(
      items.map((item: any) => ({
        orderId: order.id,
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }))
    )

    return order
  })

  res.status(201).json({ order: result })
})

// GET /api/orders
router.get('/', async (req, res) => {
  const userOrders = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, req.user!.id))
    .orderBy(desc(orders.createdAt))  // mais recentes primeiro

  res.json({ orders: userOrders })
})

// GET /api/orders/:id
router.get('/:id', async (req, res) => {
  const orderId = parseInt(req.params.id)

  const [order] = await db
    .select()
    .from(orders)
    // Garante que o utilizador só vê os seus próprios pedidos
    .where(and(eq(orders.id, orderId), eq(orders.userId, req.user!.id)))

  if (!order) {
    return res.status(404).json({ error: 'Order not found' })
  }

  const items = await db
    .select()
    .from(orderItems)
    .where(eq(orderItems.orderId, orderId))

  res.json({ order: { ...order, items } })
})

export default router
```

**Porquê `and(eq(orders.id, orderId), eq(orders.userId, req.user!.id))`?**
Verificar `orderId` e `userId` em conjunto garante que um utilizador não pode aceder ao pedido de outro utilizador apenas adivinhando o `id` do pedido.

### Registar no servidor

```ts
// server/src/index.ts
import ordersRouter from './routes/orders'
app.use('/api/orders', ordersRouter)
```

---

## 4. Implementação frontend

### Serviço RTK Query

```ts
// src/app/services/orders.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface OrderItem {
  productId: number
  name: string
  price: number
  quantity: number
  image: string
}

interface Order {
  id: number
  status: string
  name: string
  total: number
  createdAt: string
  items?: OrderItem[]
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
  total: number
}

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/orders',
    credentials: 'include',
  }),
  tagTypes: ['Order'],  // para invalidação de cache após criar pedido
  endpoints: (builder) => ({

    createOrder: builder.mutation<{ order: Order }, CreateOrderPayload>({
      query: (body) => ({ url: '/', method: 'POST', body }),
      // Invalida a lista de pedidos após criar um novo
      invalidatesTags: ['Order'],
    }),

    getOrders: builder.query<{ orders: Order[] }, void>({
      query: () => '/',
      providesTags: ['Order'],
    }),

    getOrder: builder.query<{ order: Order }, number>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),

  }),
})

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderQuery,
} = ordersApi
```

**Porquê `tagTypes` e `providesTags`/`invalidatesTags`?**
O RTK Query usa tags para gerir invalidação de cache. Quando `createOrder` é chamado, `invalidatesTags: ['Order']` diz ao RTK Query para refazer todas as queries com `providesTags: ['Order']` — a lista de pedidos atualiza automaticamente sem código extra.

### Integração no checkout

```tsx
// src/pages/checkout/checkout-form.tsx
import { useCreateOrderMutation } from '@/app/services/orders'
import { useSelector, useDispatch } from 'react-redux'
import { selectItems, selectSubtotal, selectVAT, selectGrandTotal, clearCart } from '@/app/features/cart'

const CheckoutForm = ({ id, onSuccess }: CheckoutFormProps) => {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectItems)
  const subtotal = useSelector(selectSubtotal)
  const vat = useSelector(selectVAT)
  const grandTotal = useSelector(selectGrandTotal)

  const [createOrder, { isLoading }] = useCreateOrderMutation()
  const { handleSubmit } = useCheckoutForm()

  const onSubmit = async (formData: CheckoutFormData) => {
    try {
      const result = await createOrder({
        ...formData,
        items: cartItems.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image.mobile,  // imagem para o resumo do pedido
        })),
        subtotal,
        shipping: 50,
        vat,
        total: grandTotal,
      }).unwrap()

      dispatch(clearCart())
      onSuccess(result.order)  // abre modal de confirmação com os dados do pedido

    } catch (error) {
      // mostrar erro — pedido falhou
    }
  }

  return <form id={id} onSubmit={handleSubmit(onSubmit)}>{/* campos */}</form>
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

const OrdersPage = () => {
  const { data, isLoading, isError, refetch } = useGetOrdersQuery()

  if (isLoading) return <Spinner label="Loading orders..." />
  if (isError) return <ErrorMessage onRetry={refetch} />

  const orders = data!.orders

  return (
    <main>
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <ul role="list">
          {orders.map((order) => (
            <li key={order.id}>
              <article>
                <h2>Order #{order.id}</h2>
                <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                <p>{order.status}</p>
                <p>{toMoney(order.total)}</p>
                <a href={`/orders/${order.id}`}>View details</a>
              </article>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
```

---

## 6. Fluxo completo

```
Checkout submetido
  → POST /api/orders com cookie de sessão
  → requireAuth valida JWT → req.user disponível
  → Transação: cria order + orderItems
  → Responde com order.id
  → Frontend: clearCart + abre modal de confirmação

Utilizador acede a /orders
  → RequireAuth verifica sessão
  → GET /api/orders → lista pedidos do utilizador
  → Cada pedido mostra id, data, status, total

Utilizador acede a /orders/:id
  → GET /api/orders/:id
  → Verifica userId — utilizador só vê os seus pedidos
  → Devolve pedido com items (snapshot de nome e preço)
```
