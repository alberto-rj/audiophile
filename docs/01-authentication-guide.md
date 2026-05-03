# Guia — Autenticação e Gestão de Perfil

---

## Índice

1. [O que é e porquê implementar](#1-o-que-é-e-porquê-implementar)
2. [Decisões de arquitetura](#2-decisões-de-arquitetura)
3. [Modelo de dados](#3-modelo-de-dados)
4. [Backend — rotas e lógica](#4-backend--rotas-e-lógica)
5. [Frontend — integração](#5-frontend--integração)
6. [Proteção de rotas](#6-proteção-de-rotas)
7. [Gestão de perfil](#7-gestão-de-perfil)
8. [Fluxo completo](#8-fluxo-completo)

---

## 1. O que é e porquê implementar

Autenticação é o processo de verificar a identidade de um utilizador — confirmar que quem faz um pedido é quem diz ser.

Para o Audiophile, a autenticação é necessária porque:
- Pedidos precisam de estar associados a um utilizador específico
- Gestão de pedidos requer saber quem está a pedir
- O carrinho no backend precisa de pertencer a alguém
- Sem autenticação, qualquer pessoa poderia ver ou modificar pedidos de outros

---

## 2. Decisões de arquitetura

### JWT vs Sessions

**JWT (JSON Web Token)** — o servidor gera um token assinado que o cliente guarda e envia em cada pedido. O servidor não guarda estado — valida o token com uma chave secreta.

**Sessions** — o servidor guarda o estado da sessão numa base de dados. O cliente guarda apenas um ID de sessão.

**Decisão: JWT.** Para uma API REST stateless com frontend separado, JWT é o padrão mais comum e adequado. Não requer uma tabela de sessões na base de dados.

### Access Token + Refresh Token

Um único JWT com vida longa é um risco de segurança — se for roubado, é válido por muito tempo. A solução é dois tokens:

- **Access token** — vida curta (15 minutos). Enviado em cada pedido autenticado.
- **Refresh token** — vida longa (7 dias). Guardado em cookie httpOnly. Usado apenas para obter um novo access token.

**Porquê cookie httpOnly para o refresh token?** JavaScript não consegue aceder a cookies httpOnly — protege contra ataques XSS. O access token pode viver em memória (não em localStorage, que é acessível por JS).

### Biblioteca: não usar Passport.js para este scope

O Passport.js é útil para múltiplas estratégias de autenticação (Google, Facebook, etc.). Para email/password simples, implementar diretamente com `bcrypt` e `jsonwebtoken` é mais simples e transparente.

---

## 3. Modelo de dados

```ts
// server/src/db/schema.ts
import { pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id:        serial('id').primaryKey(),
  email:     text('email').notNull().unique(),
  password:  text('password').notNull(),  // hash bcrypt — nunca texto simples
  name:      text('name').notNull(),
  phone:     text('phone'),
  address:   text('address'),
  city:      text('city'),
  country:   text('country'),
  zip:       text('zip'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const refreshTokens = pgTable('refresh_tokens', {
  id:        serial('id').primaryKey(),
  userId:    integer('user_id').notNull().references(() => users.id),
  token:     text('token').notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})
```

**Porquê guardar o refresh token na base de dados?** Permite invalidá-lo — quando o utilizador faz logout, o token é removido da base de dados e não pode ser reutilizado mesmo que ainda não tenha expirado.

---

## 4. Backend — rotas e lógica

### Instalar dependências

```bash
npm install bcrypt jsonwebtoken cookie-parser
npm install -D @types/bcrypt @types/jsonwebtoken @types/cookie-parser
```

### Middleware de autenticação

```ts
// server/src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
  userId?: number
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  // O access token vem no header Authorization: Bearer <token>
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Access token required' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as { userId: number }
    req.userId = payload.userId
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}
```

### Rotas de autenticação

```ts
// server/src/routes/auth.ts
import { Router } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { db } from '../db'
import { users, refreshTokens } from '../db/schema'
import { eq } from 'drizzle-orm'

const router = Router()

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body

  // Verificar se o email já existe
  const existing = await db.select().from(users).where(eq(users.email, email))
  if (existing.length > 0) {
    return res.status(409).json({ error: 'Email already in use' })
  }

  // Hash da password — nunca guardar em texto simples
  // 12 é o número de rounds — mais rounds = mais seguro mas mais lento
  const hashedPassword = await bcrypt.hash(password, 12)

  const [user] = await db.insert(users).values({
    email,
    password: hashedPassword,
    name,
  }).returning({ id: users.id, email: users.email, name: users.name })

  const { accessToken, refreshToken } = generateTokens(user.id)
  await saveRefreshToken(user.id, refreshToken)

  // Refresh token em cookie httpOnly — não acessível por JavaScript
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',  // HTTPS apenas em produção
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 dias em ms
  })

  res.status(201).json({ user, accessToken })
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  const [user] = await db.select().from(users).where(eq(users.email, email))

  if (!user) {
    // Mesma mensagem para email e password — não revela qual está errado
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const { accessToken, refreshToken } = generateTokens(user.id)
  await saveRefreshToken(user.id, refreshToken)

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })

  const { password: _, ...userWithoutPassword } = user
  res.json({ user: userWithoutPassword, accessToken })
})

// POST /api/auth/refresh
router.post('/refresh', async (req, res) => {
  const token = req.cookies.refreshToken

  if (!token) {
    return res.status(401).json({ error: 'Refresh token required' })
  }

  // Verificar se o token existe na base de dados
  const [stored] = await db.select()
    .from(refreshTokens)
    .where(eq(refreshTokens.token, token))

  if (!stored || stored.expiresAt < new Date()) {
    return res.status(401).json({ error: 'Invalid refresh token' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as { userId: number }
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(payload.userId)

    // Rotação do refresh token — substitui o antigo pelo novo
    await db.delete(refreshTokens).where(eq(refreshTokens.token, token))
    await saveRefreshToken(payload.userId, newRefreshToken)

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.json({ accessToken })
  } catch {
    res.status(401).json({ error: 'Invalid refresh token' })
  }
})

// POST /api/auth/logout
router.post('/logout', async (req, res) => {
  const token = req.cookies.refreshToken

  if (token) {
    // Remove o token da base de dados — invalida imediatamente
    await db.delete(refreshTokens).where(eq(refreshTokens.token, token))
  }

  res.clearCookie('refreshToken')
  res.json({ message: 'Logged out' })
})

// Helpers
function generateTokens(userId: number) {
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_ACCESS_SECRET!,
    { expiresIn: '15m' }
  )
  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: '7d' }
  )
  return { accessToken, refreshToken }
}

async function saveRefreshToken(userId: number, token: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  await db.insert(refreshTokens).values({ userId, token, expiresAt })
}

export default router
```

### Variáveis de ambiente necessárias

```env
# server/.env
JWT_ACCESS_SECRET=uma_string_longa_e_aleatoria_para_access_token
JWT_REFRESH_SECRET=outra_string_longa_e_aleatoria_para_refresh_token
```

---

## 5. Frontend — integração

### Auth slice no Redux

```ts
// src/app/features/auth/auth-slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: number
  email: string
  name: string
}

interface AuthState {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: User; accessToken: string }>) {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.isAuthenticated = true
    },
    clearCredentials(state) {
      state.user = null
      state.accessToken = null
      state.isAuthenticated = false
    },
  },
})

export const { setCredentials, clearCredentials } = authSlice.actions
export default authSlice.reducer

// Selectors
export const selectUser = (state: RootState) => state.auth.user
export const selectAccessToken = (state: RootState) => state.auth.accessToken
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
```

**Porquê o access token no Redux e não no localStorage?** localStorage é acessível por qualquer script na página — vulnerável a XSS. Em memória (Redux state) é mais seguro. A desvantagem é que se perde ao recarregar a página — o refresh token no cookie httpOnly resolve isso.

### Auth service com RTK Query

```ts
// src/app/services/auth.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, clearCredentials } from '../features/auth/auth-slice'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/auth' }),
  endpoints: (builder) => ({

    register: builder.mutation({
      query: (credentials) => ({
        url: '/register',
        method: 'POST',
        body: credentials,
      }),
      // onQueryStarted corre após a mutation completar com sucesso
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        dispatch(setCredentials({ user: data.user, accessToken: data.accessToken }))
      },
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        dispatch(setCredentials({ user: data.user, accessToken: data.accessToken }))
      },
    }),

    logout: builder.mutation({
      query: () => ({ url: '/logout', method: 'POST' }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
        dispatch(clearCredentials())
      },
    }),

    refresh: builder.mutation({
      query: () => ({ url: '/refresh', method: 'POST' }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        dispatch(setCredentials({ user: data.user, accessToken: data.accessToken }))
      },
    }),

  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
} = authApi
```

### Renovação automática do access token

O access token expira em 15 minutos. Para renovar automaticamente sem forçar o utilizador a fazer login novamente, usa um `baseQuery` personalizado com retry:

```ts
// src/app/services/base-query.ts
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import { selectAccessToken, setCredentials, clearCredentials } from '../features/auth/auth-slice'

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers, { getState }) => {
    // Injeta o access token em cada pedido autenticado
    const token = selectAccessToken(getState() as RootState)
    if (token) headers.set('authorization', `Bearer ${token}`)
    return headers
  },
  credentials: 'include',  // necessário para enviar o cookie httpOnly do refresh token
})

// baseQuery com renovação automática de token
export const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  // Se o pedido falhar com 401, tenta renovar o token
  if (result.error?.status === 401) {
    const refreshResult = await baseQuery(
      { url: '/auth/refresh', method: 'POST' },
      api,
      extraOptions
    )

    if (refreshResult.data) {
      // Token renovado — repete o pedido original
      api.dispatch(setCredentials(refreshResult.data as any))
      result = await baseQuery(args, api, extraOptions)
    } else {
      // Refresh falhou — utilizador tem de fazer login novamente
      api.dispatch(clearCredentials())
    }
  }

  return result
}
```

---

## 6. Proteção de rotas

```tsx
// src/components/widgets/require-auth/require-auth.tsx
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { selectIsAuthenticated } from '@/app/features/auth'

interface RequireAuthProps {
  children: React.ReactNode
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    // Guarda a rota que o utilizador tentou aceder
    // Após login, redireciona para lá em vez da home
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default RequireAuth
```

```tsx
// src/app.tsx
<Route path="/checkout" element={
  <RequireAuth>
    <RequireCart>
      <CheckoutPage />
    </RequireCart>
  </RequireAuth>
} />

<Route path="/orders" element={
  <RequireAuth>
    <OrdersPage />
  </RequireAuth>
} />
```

---

## 7. Gestão de perfil

### Rota no backend

```ts
// server/src/routes/users.ts — protegida com authenticate middleware
router.get('/me', authenticate, async (req: AuthRequest, res) => {
  const [user] = await db.select({
    id: users.id,
    email: users.email,
    name: users.name,
    phone: users.phone,
    address: users.address,
    city: users.city,
    country: users.country,
    zip: users.zip,
  }).from(users).where(eq(users.id, req.userId!))

  res.json(user)
})

router.patch('/me', authenticate, async (req: AuthRequest, res) => {
  const { name, phone, address, city, country, zip } = req.body

  const [updated] = await db.update(users)
    .set({ name, phone, address, city, country, zip, updatedAt: new Date() })
    .where(eq(users.id, req.userId!))
    .returning()

  const { password: _, ...userWithoutPassword } = updated
  res.json(userWithoutPassword)
})
```

---

## 8. Fluxo completo

```
Registo
  → POST /api/auth/register
  → Backend cria user, gera tokens
  → Access token → Redux state
  → Refresh token → cookie httpOnly

Login
  → POST /api/auth/login
  → Mesmo fluxo do registo

Pedido autenticado
  → baseQueryWithReauth injeta access token no header
  → Se 401 → tenta /api/auth/refresh automaticamente
  → Se refresh falhar → clearCredentials → redirect para /login

Logout
  → POST /api/auth/logout
  → Backend remove refresh token da BD
  → Frontend: clearCredentials → redirect para /login

Reload da página
  → Access token perdido (estava em memória)
  → App tenta /api/auth/refresh ao iniciar
  → Se sucesso → setCredentials → utilizador continua autenticado
  → Se falhar → utilizador vê página não autenticada
```

---

## Variáveis de ambiente — resumo

```env
# server/.env
JWT_ACCESS_SECRET=gera_com_openssl_rand_base64_64
JWT_REFRESH_SECRET=gera_com_openssl_rand_base64_64
NODE_ENV=development
```

Para gerar secrets seguros:
```bash
openssl rand -base64 64
```
