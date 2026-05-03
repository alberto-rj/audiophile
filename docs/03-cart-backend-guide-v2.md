# Guia de Gestão do Carrinho no Backend

---

## Índice

1. [Visão geral e decisão](#1-visão-geral-e-decisão)
2. [Backend — modelo de dados e rotas](#2-backend--modelo-de-dados-e-rotas)
3. [Implementação backend](#3-implementação-backend)
4. [Implementação frontend](#4-implementação-frontend)
5. [Sincronização no login](#5-sincronização-no-login)
6. [Fluxo completo](#6-fluxo-completo)

---

## 1. Visão geral e decisão

### Porquê mover o carrinho para o backend?

Com o carrinho apenas no cliente (Redux + localStorage):
- O carrinho perde-se se o utilizador trocar de browser ou dispositivo
- Não é possível associar o carrinho a um utilizador específico
- O carrinho não persiste entre sessões em dispositivos diferentes

Com o carrinho no backend:
- Persiste em qualquer dispositivo do utilizador
- É sincronizado automaticamente ao fazer login
- O servidor é a fonte de verdade

### A abordagem híbrida

Para utilizadores **não autenticados**, o carrinho continua no Redux + localStorage — não faz sentido persistir no servidor sem identidade.

Para utilizadores **autenticados**, o carrinho é gerido no servidor. O Redux continua a ser usado como cache local para evitar fetch a cada interação — mas o servidor é a fonte de verdade.

```
Não autenticado:  Redux + localStorage  (comportamento atual)
Autenticado:      Backend (PostgreSQL) + Redux como cache local
```

---

## 2. Backend — modelo de dados e rotas

### Schema Drizzle

```ts
// server/src/db/schema.ts
export const carts = pgTable('carts', {
  id:        serial('id').primaryKey(),
  userId:    integer('user_id').notNull().unique().references(() => users.id),
  // unique() garante que cada utilizador tem apenas um carrinho
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const cartItems = pgTable('cart_items', {
  id:        serial('id').primaryKey(),
  cartId:    integer('cart_id').notNull().references(() => carts.id),
  productId: integer('product_id').notNull().references(() => products.id),
  quantity:  integer('quantity').notNull().default(1),
  // unique por (cartId, productId) — um produto não pode aparecer duas vezes
}, (table) => ({
  uniqueCartProduct: unique().on(table.cartId, table.productId),
}))
```

### Rotas

```
GET    /api/cart              → devolve o carrinho do utilizador
POST   /api/cart/items        → adiciona item ao carrinho
PATCH  /api/cart/items/:id    → atualiza quantidade de um item
DELETE /api/cart/items/:id    → remove item do carrinho
DELETE /api/cart              → limpa o carrinho
```

---

## 3. Implementação backend

```ts
// server/src/routes/cart.ts
import { Router } from 'express'
import { db } from '../db'
import { carts, cartItems, products } from '../db/schema'
import { eq, and } from 'drizzle-orm'
import { requireAuth } from '../middleware/auth'

const router = Router()
router.use(requireAuth)  // todas as rotas requerem autenticação

// Helper — obtém ou cria o carrinho do utilizador
async function getOrCreateCart(userId: number) {
  const [existing] = await db
    .select()
    .from(carts)
    .where(eq(carts.userId, userId))

  if (existing) return existing

  const [created] = await db
    .insert(carts)
    .values({ userId })
    .returning()

  return created
}

// GET /api/cart
router.get('/', async (req, res) => {
  const cart = await getOrCreateCart(req.user!.id)

  // Join com produtos para devolver informação completa de cada item
  const items = await db
    .select({
      id:        cartItems.id,
      quantity:  cartItems.quantity,
      productId: products.id,
      name:      products.name,
      price:     products.price,
      slug:      products.slug,
      image:     products.image,
    })
    .from(cartItems)
    .innerJoin(products, eq(cartItems.productId, products.id))
    .where(eq(cartItems.cartId, cart.id))

  res.json({ cart: { ...cart, items } })
})

// POST /api/cart/items
router.post('/items', async (req, res) => {
  const { productId, quantity = 1 } = req.body
  const cart = await getOrCreateCart(req.user!.id)

  // Verificar se o produto já está no carrinho
  const [existing] = await db
    .select()
    .from(cartItems)
    .where(and(
      eq(cartItems.cartId, cart.id),
      eq(cartItems.productId, productId),
    ))

  if (existing) {
    // Produto já existe — soma a quantidade
    const [updated] = await db
      .update(cartItems)
      .set({ quantity: existing.quantity + quantity })
      .where(eq(cartItems.id, existing.id))
      .returning()

    return res.json({ item: updated })
  }

  // Produto novo — insere
  const [item] = await db
    .insert(cartItems)
    .values({ cartId: cart.id, productId, quantity })
    .returning()

  res.status(201).json({ item })
})

// PATCH /api/cart/items/:id
router.patch('/items/:id', async (req, res) => {
  const itemId = parseInt(req.params.id)
  const { quantity } = req.body

  if (quantity < 1) {
    return res.status(400).json({ error: 'Quantity must be at least 1' })
  }

  const cart = await getOrCreateCart(req.user!.id)

  const [updated] = await db
    .update(cartItems)
    .set({ quantity })
    // Garante que o item pertence ao carrinho do utilizador autenticado
    .where(and(eq(cartItems.id, itemId), eq(cartItems.cartId, cart.id)))
    .returning()

  if (!updated) {
    return res.status(404).json({ error: 'Item not found' })
  }

  res.json({ item: updated })
})

// DELETE /api/cart/items/:id
router.delete('/items/:id', async (req, res) => {
  const itemId = parseInt(req.params.id)
  const cart = await getOrCreateCart(req.user!.id)

  await db
    .delete(cartItems)
    .where(and(eq(cartItems.id, itemId), eq(cartItems.cartId, cart.id)))

  res.json({ message: 'Item removed' })
})

// DELETE /api/cart
router.delete('/', async (req, res) => {
  const cart = await getOrCreateCart(req.user!.id)

  await db.delete(cartItems).where(eq(cartItems.cartId, cart.id))

  res.json({ message: 'Cart cleared' })
})

export default router
```

### Registar no servidor

```ts
// server/src/index.ts
import cartRouter from './routes/cart'
app.use('/api/cart', cartRouter)
```

---

## 4. Implementação frontend

### Serviço RTK Query

```ts
// src/app/services/cart.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { CartItem } from '@/libs/types'

interface CartResponse {
  cart: {
    id: number
    items: CartItem[]
  }
}

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/cart',
    credentials: 'include',
  }),
  tagTypes: ['Cart'],
  endpoints: (builder) => ({

    getCart: builder.query<CartResponse, void>({
      query: () => '/',
      providesTags: ['Cart'],
    }),

    addItem: builder.mutation<void, { productId: number; quantity: number }>({
      query: (body) => ({ url: '/items', method: 'POST', body }),
      invalidatesTags: ['Cart'],
    }),

    updateItem: builder.mutation<void, { id: number; quantity: number }>({
      query: ({ id, quantity }) => ({
        url: `/items/${id}`,
        method: 'PATCH',
        body: { quantity },
      }),
      invalidatesTags: ['Cart'],
    }),

    removeItem: builder.mutation<void, number>({
      query: (id) => ({ url: `/items/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Cart'],
    }),

    clearCart: builder.mutation<void, void>({
      query: () => ({ url: '/', method: 'DELETE' }),
      invalidatesTags: ['Cart'],
    }),

  }),
})

export const {
  useGetCartQuery,
  useAddItemMutation,
  useUpdateItemMutation,
  useRemoveItemMutation,
  useClearCartMutation,
} = cartApi
```

### Adaptar o `cartSlice`

Com o backend a gerir o carrinho, o `cartSlice` passa a ser apenas cache local — os selectors continuam a funcionar mas os dados vêm da query:

```ts
// src/app/features/cart/cart-slice.ts
// Mantém os selectors para calcular totais
// Os items vêm do useGetCartQuery, não do slice

export const selectSubtotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0)

export const selectShipping = () => 50

export const selectVAT = (items: CartItem[]) =>
  Math.round(selectSubtotal(items) * 0.2)

export const selectGrandTotal = (items: CartItem[]) =>
  selectSubtotal(items) + selectShipping() + selectVAT(items)
```

### Uso nos componentes

```tsx
// Nos componentes autenticados — usa a API
const { data, isLoading } = useGetCartQuery()
const [addItem] = useAddItemMutation()
const [updateItem] = useUpdateItemMutation()
const [removeItem] = useRemoveItemMutation()

const items = data?.cart.items ?? []
const subtotal = selectSubtotal(items)

// Adicionar ao carrinho
await addItem({ productId: product.id, quantity }).unwrap()

// Atualizar quantidade
await updateItem({ id: cartItemId, quantity: newValue }).unwrap()

// Remover item
await removeItem(cartItemId).unwrap()
```

---

## 5. Sincronização no login

Quando o utilizador faz login, o carrinho local (localStorage) deve ser fundido com o carrinho do servidor:

```ts
// server/src/routes/auth.ts — no handler de login
router.post('/login', async (req, res) => {
  // ... verificar credenciais ...

  // Receber carrinho local enviado pelo cliente no login
  const { localCart } = req.body  // [{ productId, quantity }]

  if (localCart && localCart.length > 0) {
    const cart = await getOrCreateCart(user.id)

    // Para cada item local, adicionar ao carrinho do servidor
    // Se já existir, soma a quantidade
    for (const item of localCart) {
      const [existing] = await db.select().from(cartItems)
        .where(and(eq(cartItems.cartId, cart.id), eq(cartItems.productId, item.productId)))

      if (existing) {
        await db.update(cartItems)
          .set({ quantity: existing.quantity + item.quantity })
          .where(eq(cartItems.id, existing.id))
      } else {
        await db.insert(cartItems).values({
          cartId: cart.id,
          productId: item.productId,
          quantity: item.quantity,
        })
      }
    }
  }

  // ... gerar token e responder ...
})
```

```tsx
// Frontend — enviar carrinho local no login
const localCart = store.getState().cart.items.map(item => ({
  productId: item.id,
  quantity: item.quantity,
}))

await login({ email, password, localCart }).unwrap()

// Limpar carrinho local após sincronização
dispatch(clearLocalCart())
```

---

## 6. Fluxo completo

```
Utilizador não autenticado
  → Adiciona produto → Redux + localStorage (comportamento anterior)

Utilizador faz login
  → Envia carrinho local no body do login
  → Servidor funde carrinho local com carrinho do servidor
  → Frontend limpa Redux cart
  → Frontend passa a usar useGetCartQuery

Utilizador autenticado adiciona produto
  → POST /api/cart/items
  → invalidatesTags: ['Cart']
  → useGetCartQuery re-fetch automático
  → UI atualiza

Utilizador abre a app noutro dispositivo
  → AppInitializer valida sessão
  → useGetCartQuery carrega carrinho do servidor
  → Carrinho está sincronizado

Checkout concluído
  → POST /api/orders
  → DELETE /api/cart (limpa carrinho no servidor)
  → invalidatesTags: ['Cart', 'Order']
```
