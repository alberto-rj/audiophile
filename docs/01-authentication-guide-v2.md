# Guia de Autenticação e Gestão de Perfil

---

## Índice

1. [Visão geral](#1-visão-geral)
2. [Stack e decisões](#2-stack-e-decisões)
3. [Backend — modelo de dados e rotas](#3-backend--modelo-de-dados-e-rotas)
4. [JWT — o que é e como funciona](#4-jwt--o-que-é-e-como-funciona)
5. [Implementação backend](#5-implementação-backend)
6. [Implementação frontend](#6-implementação-frontend)
7. [Proteção de rotas](#7-proteção-de-rotas)
8. [Gestão de perfil](#8-gestão-de-perfil)
9. [Fluxo completo](#9-fluxo-completo)

---

## 1. Visão geral

A autenticação permite que um utilizador se identifique na aplicação. Com autenticação implementada, é possível:

- Associar pedidos a um utilizador específico
- Gerir o carrinho no backend por utilizador
- Proteger rotas que requerem login (checkout, perfil, pedidos)

**Features a implementar:**
- Registo de conta (nome, email, password)
- Login com email e password
- Logout
- Perfil do utilizador (ver e editar nome, email)
- Proteção de rotas no frontend e no backend

---

## 2. Stack e decisões

### Backend
- **bcrypt** — para fazer hash das passwords antes de guardar na base de dados. Nunca guardar passwords em texto simples.
- **jsonwebtoken (JWT)** — para gerar tokens de sessão após login. O cliente guarda o token e envia-o em cada pedido autenticado.
- **cookie-parser** — para enviar o token num cookie HTTP-only em vez de `localStorage`. Mais seguro contra ataques XSS.

```bash
npm install bcrypt jsonwebtoken cookie-parser
npm install -D @types/bcrypt @types/jsonwebtoken @types/cookie-parser
```

### Frontend
- **RTK Query** — para as chamadas de autenticação (login, registo, logout, perfil)
- **Redux slice** — para guardar o estado do utilizador autenticado (`authSlice`)
- **react-hook-form + zod** — para os formulários de login e registo

---

## 3. Backend — modelo de dados e rotas

### Schema Drizzle

```ts
// server/src/db/schema.ts
export const users = pgTable('users', {
  id:        serial('id').primaryKey(),
  name:      text('name').notNull(),
  email:     text('email').notNull().unique(),
  password:  text('password').notNull(),  // hash bcrypt, nunca plaintext
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})
```

### Rotas

```
POST  /api/auth/register  → cria conta
POST  /api/auth/login     → autentica e devolve token
POST  /api/auth/logout    → limpa o cookie do token
GET   /api/auth/me        → devolve o utilizador autenticado (protegida)
PATCH /api/auth/me        → atualiza nome e/ou email (protegida)
```

---

## 4. JWT — o que é e como funciona

JWT (JSON Web Token) é um token assinado que o servidor gera após o login. Contém informação sobre o utilizador (payload) e uma assinatura que garante que não foi adulterado.

**Estrutura:**
```
header.payload.signature

eyJhbGciOiJIUzI1NiJ9           ← algoritmo de assinatura
.eyJpZCI6MSwiZW1haWwiOiIuLi59  ← dados do utilizador
.SflKxwRJSMeKKF2QT4fwpMeJf36   ← assinatura com JWT_SECRET
```

**O fluxo:**
1. Utilizador faz login com email + password
2. Servidor verifica a password com `bcrypt.compare`
3. Servidor gera JWT com `jwt.sign({ id, email }, JWT_SECRET)`
4. Servidor envia o JWT num cookie HTTP-only
5. Browser guarda o cookie e envia-o automaticamente em cada pedido
6. Em rotas protegidas, o servidor verifica o JWT com `jwt.verify`

**Porquê cookie HTTP-only em vez de `localStorage`?**
`localStorage` é acessível por JavaScript — se houver um ataque XSS, o token pode ser roubado. Um cookie HTTP-only não é acessível por JavaScript — o browser envia-o automaticamente mas nenhum script pode lê-lo.

---

## 5. Implementação backend

### Middleware de autenticação

```ts
// server/src/middleware/auth.ts
import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface JwtPayload {
  id: number
  email: string
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
    req.user = payload
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
import { users } from '../db/schema'
import { eq } from 'drizzle-orm'
import { requireAuth } from '../middleware/auth'

const router = Router()
const SALT_ROUNDS = 12

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
}

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  const existing = await db.select().from(users).where(eq(users.email, email))
  if (existing.length > 0) {
    return res.status(409).json({ error: 'Email already in use' })
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

  const [user] = await db.insert(users).values({
    name, email, password: hashedPassword,
  }).returning({ id: users.id, name: users.name, email: users.email })

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  })

  res.cookie('token', token, cookieOptions)
  res.status(201).json({ user })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  const [user] = await db.select().from(users).where(eq(users.email, email))

  // Mensagem genérica — não revelar se o email existe ou não
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  })

  res.cookie('token', token, cookieOptions)
  res.json({ user: { id: user.id, name: user.name, email: user.email } })
})

router.post('/logout', (req, res) => {
  res.clearCookie('token')
  res.json({ message: 'Logged out' })
})

router.get('/me', requireAuth, async (req, res) => {
  const [user] = await db
    .select({ id: users.id, name: users.name, email: users.email })
    .from(users)
    .where(eq(users.id, req.user!.id))

  if (!user) return res.status(404).json({ error: 'User not found' })
  res.json({ user })
})

router.patch('/me', requireAuth, async (req, res) => {
  const { name, email } = req.body

  const [updated] = await db
    .update(users)
    .set({ name, email, updatedAt: new Date() })
    .where(eq(users.id, req.user!.id))
    .returning({ id: users.id, name: users.name, email: users.email })

  res.json({ user: updated })
})

export default router
```

### Registar no servidor

```ts
// server/src/index.ts
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth'

app.use(cookieParser())
app.use('/api/auth', authRouter)
```

### Variável de ambiente

```env
# server/.env
JWT_SECRET=string_longa_e_aleatoria  # gerar com: openssl rand -base64 32
```

---

## 6. Implementação frontend

### `authSlice`

```ts
// src/app/features/auth/auth-slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'

interface User {
  id: number
  name: string
  email: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, isAuthenticated: false } as AuthState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload
      state.isAuthenticated = true
    },
    clearUser(state) {
      state.user = null
      state.isAuthenticated = false
    },
  },
})

export const { setUser, clearUser } = authSlice.actions
export const selectUser = (state: RootState) => state.auth.user
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
export default authSlice.reducer
```

### Serviço RTK Query

```ts
// src/app/services/auth.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/auth',
    credentials: 'include',  // envia cookies em todas as requisições
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({ url: '/register', method: 'POST', body }),
    }),
    login: builder.mutation({
      query: (body) => ({ url: '/login', method: 'POST', body }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({ url: '/logout', method: 'POST' }),
    }),
    getMe: builder.query<{ user: User }, void>({
      query: () => '/me',
    }),
    updateProfile: builder.mutation({
      query: (body) => ({ url: '/me', method: 'PATCH', body }),
    }),
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
} = authApi
```

### Inicializar sessão ao carregar a app

```tsx
// src/app/app-initializer.tsx
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useGetMeQuery } from '@/app/services/auth'
import { setUser } from '@/app/features/auth/auth-slice'

const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch()
  const { data, isSuccess } = useGetMeQuery()

  useEffect(() => {
    if (isSuccess && data?.user) {
      dispatch(setUser(data.user))
    }
  }, [isSuccess, data, dispatch])

  return <>{children}</>
}
```

```tsx
// main.tsx
<Provider store={store}>
  <AppInitializer>
    <App />
  </AppInitializer>
</Provider>
```

---

## 7. Proteção de rotas

```tsx
// src/components/widgets/require-auth/require-auth.tsx
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { selectIsAuthenticated } from '@/app/features/auth/auth-slice'

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    // Guarda a rota de origem para redirecionar após login
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
```

```tsx
// src/app.tsx
<Route path="/checkout" element={
  <RequireAuth><RequireCart><CheckoutPage /></RequireCart></RequireAuth>
} />
<Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
<Route path="/orders"  element={<RequireAuth><OrdersPage /></RequireAuth>} />
```

### Redirecionar após login

```tsx
const from = location.state?.from?.pathname ?? '/'

const onSubmit = async (data: LoginFormData) => {
  try {
    const result = await login(data).unwrap()
    dispatch(setUser(result.user))
    navigate(from, { replace: true })
  } catch {
    // mostrar erro de credenciais inválidas
  }
}
```

---

## 8. Gestão de perfil

```tsx
// src/pages/profile-page.tsx
const ProfilePage = () => {
  const user = useSelector(selectUser)
  const [updateProfile, { isLoading }] = useUpdateProfileMutation()

  const onSubmit = async (data: UpdateProfileFormData) => {
    try {
      const result = await updateProfile(data).unwrap()
      dispatch(setUser(result.user))
    } catch {
      // mostrar erro
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue={user?.name} {...register('name')} />
      <input defaultValue={user?.email} {...register('email')} />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save changes'}
      </button>
    </form>
  )
}
```

---

## 9. Fluxo completo

```
App carrega
  → AppInitializer chama GET /api/auth/me
  → Cookie existe → servidor valida JWT → devolve user
  → authSlice.setUser → isAuthenticated = true

Utilizador acede a /checkout sem sessão
  → RequireAuth → Navigate to="/login" state.from=/checkout

Login bem-sucedido
  → POST /api/auth/login → cookie HTTP-only criado
  → authSlice.setUser → navigate(state.from)

Pedido autenticado
  → Browser envia cookie automaticamente
  → requireAuth middleware valida JWT
  → req.user disponível na rota

Logout
  → POST /api/auth/logout → cookie limpo no servidor
  → authSlice.clearUser → navigate("/")
```
