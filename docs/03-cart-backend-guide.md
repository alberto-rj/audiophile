# Guia — Carrinho no Backend

---

## Índice

1. [O que muda e porquê](#1-o-que-muda-e-porquê)
2. [Modelo de dados](#2-modelo-de-dados)
3. [Backend — rotas](#3-backend--rotas)
4. [Frontend — migração do Redux para RTK Query](#4-frontend--migração-do-redux-para-rtk-query)
5. [Sincronização entre sessões](#5-sincronização-entre-sessões)
6. [Fluxo completo](#6-fluxo-completo)

---

## 1. O que muda e porquê

**Antes:** o carrinho vive no Redux + localStorage. É perdido se o utilizador limpar o browser, e não é partilhado entre dispositivos.

**Depois:** o carrinho vive na base de dados, associado ao utilizador autenticado. O utilizador pode fechar o browser, abrir noutro dispositivo, e o carrinho está lá.

### O que muda na arquitetura

| | Antes | Depois |
|---|---|---|
| Onde vive | Redux + localStorage | Base de dados |
| Persiste entre dispositivos | Não | Sim |
| Requer autenticação | Não | Sim |
| Atualização | Síncrona (local) | Assíncrona (fetch) |
| Conflito entre dispositivos | N/A | Última escrita ganha |

### O que mantém-se

O Redux continua a existir — mas apenas para estado de UI (modal aberto/fechado, etc.). O estado do carrinho passa a ser gerido pelo RTK Query como estado remoto.

---

## 2. Modelo de dados

```ts
// server/src/db/schema.ts

export const carts = pgTable('carts', {
  id:        serial('id').primaryKey(),
  userId:    integer('user_id').notNull().unique().references(() => users.id),
  // unique() — um utilizador tem um único carrinho ativo
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const cartItems = pgTable('cart_items', {
  id:        serial('id').primaryKey(),
  cartId:    integer('cart_id').notNull().references(() => carts.id),
  productId: integer('product_id').notNull().references(() => products.id),
  quantity:  integer('quantity').notNull().default(1),
  // unique constraint — um produto aparece uma única vez no carrinho
}, (table) => ({
  uniqueCartProduct: unique().on(table.cartId, table.productId),
}))
```

**Porquê uma tabela `carts` separada de `cart_items`?** A tabela `carts` representa o carrinho do utilizador — existe sempre (mesmo vazio). A tabela `cart_items` contém os produtos. Esta separação permite buscar o carrinho sem ter de verificar se existe items, e facilita operações como "limpar carrinho" (delete todos os items, mantém o cart).

---

## 3. Backend — rotas

```ts
// server/src/routes/cart.ts
import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import { db } from '../db'
import { carts, cartItems, products } from '../db/schema'
import { eq, and } from 'drizzle-orm'

const router = Router()
router.use(authenticate)

// Helper — obtém ou cria o carrinho do utilizador
async function getOrCreateCart(userId: number) {
  const [existing] = await db.select().from(carts).where(eq(carts.userId, userId))
  if (existing) return existing

  const [created] = await db.insert(carts).values({ userId }).returning()
  return created
}

// GET /api/cart — obter carrinho com items e preços atuais
router.get('/', async (req: AuthRequest, res) => {
  const cart = await getOrCreateCart(req.userId!)

  // Join com products para ter nome e preço atuais
  const items = await db
    .select({
      id: cartItems.id,
      productId: cartItems.productId,
      quantity: cartItems.quantity,
      name: products.name,
      price: products.price,
      slug: products.slug,
      image: products.image,
    })
    .from(cartItems)
    .innerJoin(products, eq(cartItems.productId, products.id))
    .where(eq(cartItems.cartId, cart.id))

  res.json({ id: cart.id, items })
})

// POST /api/cart/items — adicionar item
router.post('/items', async (req: AuthRequest, res) => {
  const { productId, quantity = 1 } = req.body
  const cart = await getOrCreateCart(req.userId!)

  // Verificar se o produto existe
  const [product] = await db.select().from(products).where(eq(products.id, productId))
  if (!product) return res.status(404).json({ error: 'Product not found' })

  // Se o produto já está no carrinho, incrementa a quantidade
  const [existing] = await db.select().from(cartItems)
    .where(and(
      eq(cartItems.cartId, cart.id),
      eq(cartItems.productId, productId)
    ))

  if (existing) {
    await db.update(cartItems)
      .set({ quantity: existing.quantity + quantity })
      .where(eq(cartItems.id, existing.id))
  } else {
    await db.insert(cartItems).values({
      cartId: cart.id,
      productId,
      quantity,
    })
  }

  // Devolve o carrinho atualizado
  const updatedCart = await getCartWithItems(cart.id)
  res.json(updatedCart)
})

// PATCH /api/cart/items/:productId — atualizar quantidade
router.patch('/items/:productId', async (req: AuthRequest, res) => {
  const productId = parseInt(req.params.productId)
  const { quantity } = req.body
  const cart = await getOrCreateCart(req.userId!)

  if (quantity < 1) {
    return res.status(400).json({ error: 'Quantity must be at least 1' })
  }

  await db.update(cartItems)
    .set({ quantity })
    .where(and(
      eq(cartItems.cartId, cart.id),
      eq(cartItems.productId, productId)
    ))

  const updatedCart = await getCartWithItems(cart.id)
  res.json(updatedCart)
})

// DELETE /api/cart/items/:productId — remover item
router.delete('/items/:productId', async (req: AuthRequest, res) => {
  const productId = parseInt(req.params.productId)
  const cart = await getOrCreateCart(req.userId!)

  await db.delete(cartItems)
    .where(and(
      eq(cartItems.cartId, cart.id),
      eq(cartItems.productId, productId)
    ))

  const updatedCart = await getCartWithItems(cart.id)
  res.json(updatedCart)
})

// DELETE /api/cart — limpar carrinho
router.delete('/', async (req: AuthRequest, res) => {
  const cart = await getOrCreateCart(req.userId!)

  await db.delete(cartItems).where(eq(cartItems.cartId, cart.id))

  res.json({ id: cart.id, items: [] })
})

export default router
```

---

## 4. Frontend — migração do Redux para RTK Query

### Cart service

```ts
// src/app/services/cart.ts
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './base-query'

interface CartItem {
  id: number
  productId: number
  quantity: number
  name: string
  price: number
  slug: string
  image: ProductImage
}

interface Cart {
  id: number
  items: CartItem[]
}

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Cart'],
  endpoints: (builder) => ({

    getCart: builder.query<Cart, void>({
      query: () => '/cart',
      providesTags: ['Cart'],
    }),

    addToCart: builder.mutation<Cart, { productId: number; quantity: number }>({
      query: (body) => ({
        url: '/cart/items',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Cart'],
    }),

    updateQuantity: builder.mutation<Cart, { productId: number; quantity: number }>({
      query: ({ productId, quantity }) => ({
        url: `/cart/items/${productId}`,
        method: 'PATCH',
        body: { quantity },
      }),
      invalidatesTags: ['Cart'],
    }),

    removeItem: builder.mutation<Cart, number>({
      query: (productId) => ({
        url: `/cart/items/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),

    clearCart: builder.mutation<Cart, void>({
      query: () => ({
        url: '/cart',
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),

  }),
})

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateQuantityMutation,
  useRemoveItemMutation,
  useClearCartMutation,
} = cartApi
```

### Optimistic updates — feedback imediato ao utilizador

Sem optimistic updates, o utilizador clica "Add to Cart" e espera pelo fetch antes de ver a mudança. Com optimistic updates, a UI atualiza imediatamente e reverte se o servidor falhar:

```ts
addToCart: builder.mutation<Cart, { productId: number; quantity: number }>({
  query: (body) => ({
    url: '/cart/items',
    method: 'POST',
    body,
  }),
  // Atualiza o cache imediatamente, sem esperar pela resposta do servidor
  async onQueryStarted({ productId, quantity }, { dispatch, queryFulfilled }) {
    const patchResult = dispatch(
      cartApi.util.updateQueryData('getCart', undefined, (draft) => {
        const existing = draft.items.find(i => i.productId === productId)
        if (existing) {
          existing.quantity += quantity
        }
        // Se não existe no cache local, não adiciona — o invalidatesTags vai fazer re-fetch
      })
    )
    try {
      await queryFulfilled
    } catch {
      // Se o servidor falhar, reverte a mudança otimista
      patchResult.undo()
    }
  },
  invalidatesTags: ['Cart'],
}),
```

### Uso nos componentes

```tsx
// product-detailed-card.tsx
const [addToCart, { isLoading }] = useAddToCartMutation()

const handleAddToCart = async () => {
  try {
    await addToCart({ productId: product.id, quantity }).unwrap()
    // feedback de sucesso — ex: abrir cart modal
  } catch {
    // feedback de erro
  }
}

<Button
  variant="primary"
  onClick={handleAddToCart}
  disabled={isLoading}
>
  {isLoading ? 'Adding...' : 'Add to Cart'}
</Button>
```

```tsx
// cart-modal.tsx
const { data: cart, isLoading } = useGetCartQuery()
const [updateQuantity] = useUpdateQuantityMutation()
const [removeItem] = useRemoveItemMutation()
const [clearCart] = useClearCartMutation()

// A lista de items vem do cart.items — não do Redux slice
```

### O que remover do Redux

Com o carrinho no backend, o `cartSlice` deixa de ser necessário para os items. Mantém apenas o que for estado de UI:

```ts
// Remover do cartSlice:
// - items, addItem, removeItem, updateQuantity, clearCart
// - persistência no localStorage

// Manter (se necessário):
// - isCartModalOpen, openCartModal, closeCartModal
```

---

## 5. Sincronização entre sessões

Quando o utilizador fazia login com um carrinho local (localStorage), havia um conflito: o carrinho local e o carrinho na base de dados podiam ter items diferentes.

**Decisão para este projeto: o carrinho do servidor prevalece.**

Ao fazer login, o frontend faz `refetch` do carrinho do servidor e descarta o estado local. É a abordagem mais simples e previsível — o utilizador vê sempre o carrinho que estava no servidor.

```ts
// auth-slice.ts — ao fazer login com sucesso
async onQueryStarted(_, { dispatch, queryFulfilled }) {
  const { data } = await queryFulfilled
  dispatch(setCredentials({ user: data.user, accessToken: data.accessToken }))

  // Força re-fetch do carrinho do servidor após login
  dispatch(cartApi.util.invalidateTags(['Cart']))
}
```

---

## 6. Fluxo completo

```
Utilizador autenticado adiciona produto
  → addToCart mutation
    → POST /api/cart/items (com access token)
    → Backend: getOrCreateCart → upsert item
    → Devolve carrinho atualizado
  → invalidatesTags(['Cart']) → re-fetch automático
  → CartModal mostra o carrinho atualizado

Utilizador abre o site noutro dispositivo
  → useGetCartQuery ao montar
    → GET /api/cart (com access token do cookie)
    → Backend devolve carrinho da base de dados
  → Mesmo carrinho em todos os dispositivos

Utilizador faz checkout
  → createOrder com items do carrinho
  → clearCart mutation após pedido criado
    → DELETE /api/cart
    → CartModal mostra carrinho vazio
```
