# Guia de Autenticação

> Guia focado e sem over-engineering. O objetivo é ter autenticação funcional.

---

## Índice

1. [O que vamos construir](#1-o-que-vamos-construir)
2. [Tipos partilhados](#2-tipos-partilhados)
3. [MSW — mock dos endpoints](#3-msw--mock-dos-endpoints)
4. [RTK Query — serviço de autenticação](#4-rtk-query--serviço-de-autenticação)
5. [Redux — authSlice](#5-redux--authslice)
6. [Integrar na store](#6-integrar-na-store)
7. [Inicializar sessão ao carregar a app](#7-inicializar-sessão-ao-carregar-a-app)
8. [Proteção de rotas](#8-proteção-de-rotas)
9. [Páginas de login e registo](#9-páginas-de-login-e-registo)
10. [Stories](#10-stories)

---

## 1. O que vamos construir

Quatro endpoints, dois no MSW por agora:

```
POST /api/auth/register   → cria conta
POST /api/auth/login      → autentica, devolve user + token
POST /api/auth/logout     → termina sessão
GET  /api/auth/me         → devolve o utilizador da sessão atual
```

No frontend:
- `authApi` — RTK Query com os quatro endpoints
- `authSlice` — guarda `{ user, token }` no Redux
- `AppInitializer` — ao carregar a app, verifica se há sessão ativa
- `RequireAuth` — redireciona para `/login` se não autenticado
- `LoginPage` e `RegisterPage`

---

## 2. Tipos partilhados

Define os tipos num só lugar. Tanto o MSW como o RTK Query vão usar estes tipos.

```ts
// src/libs/types/auth.ts

export interface AuthUser {
  id: number;
  name: string;
  email: string;
}

// Resposta de login e register — sempre devolvem user + token
export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}
```

---

## 3. MSW — mock dos endpoints

### O que o mock precisa de simular

O mock não precisa de ser perfeito — precisa de ser suficiente para o frontend funcionar durante o desenvolvimento. Quatro comportamentos:

- `register` — cria um utilizador e devolve `{ user, token }`
- `login` — verifica credenciais e devolve `{ user, token }`, ou 401 se inválidas
- `logout` — devolve 200 (o estado é limpo no frontend)
- `me` — devolve o utilizador se o token for válido, ou 401 se não for

### Guardar estado no mock

O MSW corre num Service Worker — o estado (utilizadores registados, sessão ativa) não persiste entre reloads. Para desenvolvimento, isso é aceitável. Guardamos o estado em variáveis em memória.

```ts
// src/mocks/auth-store.ts
// Estado em memória do mock — reinicia com cada reload da página
// Não é produção — serve apenas para o desenvolvimento funcionar

import type { AuthUser } from '@/libs/types/auth';

interface MockUser extends AuthUser {
  password: string;
}

// Utilizador pré-definido para facilitar testes sem registar sempre
const defaultUser: MockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
};

// Simula a base de dados de utilizadores
export const mockUsers: MockUser[] = [defaultUser];

// Simula as sessões ativas — token → userId
export const mockSessions = new Map<string, number>();

// Gera um token simples para o mock
// Não é um JWT real — é apenas um identificador único para o mock
export function generateMockToken(userId: number): string {
  const token = `mock-token-${userId}-${Date.now()}`;
  mockSessions.set(token, userId);
  return token;
}

export function getUserFromToken(token: string): MockUser | undefined {
  const userId = mockSessions.get(token);
  if (!userId) return undefined;
  return mockUsers.find((u) => u.id === userId);
}
```

### Handlers de autenticação

```ts
// src/mocks/handlers/auth.handlers.ts

import { http, HttpResponse } from 'msw';
import type { LoginPayload, RegisterPayload, AuthResponse } from '@/libs/types/auth';
import {
  mockUsers,
  mockSessions,
  generateMockToken,
  getUserFromToken,
} from '../auth-store';

export const authHandlers = [

  // POST /api/auth/register
  http.post<never, RegisterPayload>('/api/auth/register', async ({ request }) => {
    const body = await request.json();

    // Verificar se o email já existe
    const exists = mockUsers.find((u) => u.email === body.email);
    if (exists) {
      return HttpResponse.json(
        { error: 'Email already in use' },
        { status: 409 },
      );
    }

    // Criar o utilizador — id incremental simples
    const newUser = {
      id: mockUsers.length + 1,
      name: body.name,
      email: body.email,
      password: body.password,  // em produção seria hash — no mock não importa
    };

    mockUsers.push(newUser);

    const token = generateMockToken(newUser.id);

    const response: AuthResponse = {
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
      token,
    };

    return HttpResponse.json(response, { status: 201 });
  }),

  // POST /api/auth/login
  http.post<never, LoginPayload>('/api/auth/login', async ({ request }) => {
    const body = await request.json();

    const user = mockUsers.find((u) => u.email === body.email);

    // Mensagem genérica — não revelar se o email existe
    if (!user || user.password !== body.password) {
      return HttpResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 },
      );
    }

    const token = generateMockToken(user.id);

    const response: AuthResponse = {
      user: { id: user.id, name: user.name, email: user.email },
      token,
    };

    return HttpResponse.json(response);
  }),

  // POST /api/auth/logout
  http.post('/api/auth/logout', ({ request }) => {
    // Extrair o token do header Authorization
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (token) {
      mockSessions.delete(token);  // invalida a sessão
    }

    return HttpResponse.json({ message: 'Logged out' });
  }),

  // GET /api/auth/me
  http.get('/api/auth/me', ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = getUserFromToken(token);

    if (!user) {
      return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return HttpResponse.json({
      user: { id: user.id, name: user.name, email: user.email },
    });
  }),

];
```

### Adicionar ao ficheiro principal de handlers

```ts
// src/mocks/handlers.ts

import { authHandlers } from './handlers/auth.handlers';
import { productHandlers } from './handlers/product.handlers';  // os que já tens

export const handlers = [
  ...authHandlers,
  ...productHandlers,
];
```

---

## 4. RTK Query — serviço de autenticação

### Como o token é enviado

O backend real vai usar cookies HTTP-only. O mock usa o header `Authorization: Bearer <token>`.

Para não ter dois comportamentos diferentes, configuramos um `baseQuery` personalizado que injeta o token do Redux state em todas as requisições:

```ts
// src/app/services/base-query.ts

import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/app/store';

// baseQuery com injeção automática do token
// Lê o token do Redux state e adiciona ao header Authorization
export const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      // Lê o token do estado atual do Redux
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  });

  return baseQuery(args, api, extraOptions);
};
```

**Porquê `prepareHeaders` em vez de passar o token manualmente em cada endpoint?**
Com `prepareHeaders`, o token é injetado automaticamente em todas as requisições — inclusive nas que ainda não existem. Sem isso, cada endpoint precisaria de ler o token do state manualmente, o que é repetitivo e propenso a esquecimento.

### Serviço de autenticação

```ts
// src/app/services/auth.service.ts

import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './base-query';
import type {
  AuthResponse,
  AuthUser,
  LoginPayload,
  RegisterPayload,
} from '@/libs/types/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({

    // Registo
    register: builder.mutation<AuthResponse, RegisterPayload>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),

    // Login
    login: builder.mutation<AuthResponse, LoginPayload>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),

    // Logout — void porque não precisa de payload nem devolve dados úteis
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),

    // Verificar sessão — chamado ao carregar a app
    getMe: builder.query<{ user: AuthUser }, void>({
      query: () => '/auth/me',
    }),

  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
} = authApi;
```

---

## 5. Redux — authSlice

O `authSlice` guarda o utilizador autenticado e o token. É a fonte de verdade no frontend sobre quem está autenticado.

```ts
// src/app/features/auth/auth-slice.ts

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthUser } from '@/libs/types/auth';
import type { RootState } from '@/app/store';

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  // isAuthenticated é derivado de user — não é estado separado
  // evita inconsistências onde user existe mas isAuthenticated é false
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Chamado após login ou register bem-sucedidos
    setCredentials(state, action: PayloadAction<{ user: AuthUser; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    // Chamado após logout
    clearCredentials(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
// isAuthenticated derivado de user — sempre consistente
export const selectIsAuthenticated = (state: RootState) => state.auth.user !== null;

export default authSlice.reducer;
```

**Porquê `isAuthenticated` é derivado de `user` e não um campo separado?**
Se fossem campos separados, era possível ter `user: null` e `isAuthenticated: true` — estado inconsistente. Derivar elimina essa possibilidade.

---

## 6. Integrar na store

```ts
// src/app/store.ts

import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/auth.service';
import authReducer from './features/auth/auth-slice';
import cartReducer from './features/cart/cart-slice';  // já existente

export const store = configureStore({
  reducer: {
    // Reducer do RTK Query — gere o cache das queries
    [authApi.reducerPath]: authApi.reducer,
    // Slices
    auth: authReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      // Middleware do RTK Query — obrigatório para cache e re-fetching
      .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

---

## 7. Inicializar sessão ao carregar a app

Quando a app carrega, precisamos de saber se há uma sessão ativa. Fazemos isso com `useGetMeQuery` — se o token existir e for válido, o servidor devolve o utilizador.

**O problema:** o token não persiste por defeito no Redux — ao recarregar a página, o Redux é reinicializado e o token perde-se.

**A solução:** guardar o token no `localStorage` e restaurá-lo ao inicializar o Redux.

```ts
// src/app/store.ts — atualizado com persistência do token

const TOKEN_KEY = 'auth_token';

// Restaurar token do localStorage ao inicializar
const preloadedState = (() => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return undefined;
  return {
    auth: { user: null, token },
    // user é null — vai ser preenchido pelo AppInitializer via /me
  };
})();

export const store = configureStore({
  reducer: { ... },
  middleware: ...,
  preloadedState,
});

// Guardar/remover token no localStorage quando o estado muda
store.subscribe(() => {
  const token = store.getState().auth.token;
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
});
```

**Porquê guardar apenas o token e não o utilizador inteiro?**
O utilizador pode mudar (nome, email) entre sessões. Guardar apenas o token e validar com `/me` garante que os dados estão sempre atualizados.

### AppInitializer

```tsx
// src/app/app-initializer.tsx

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMeQuery } from '@/app/services/auth.service';
import { setCredentials, clearCredentials, selectToken } from '@/app/features/auth/auth-slice';
import type { AppDispatch } from '@/app/store';

interface AppInitializerProps {
  children: React.ReactNode;
}

const AppInitializer = ({ children }: AppInitializerProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectToken);

  // Só chama /me se houver token — sem token, não há sessão para verificar
  const { data, isSuccess, isError } = useGetMeQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (isSuccess && data.user) {
      // Token válido — preenche o utilizador no Redux
      dispatch(setCredentials({ user: data.user, token: token! }));
    }

    if (isError) {
      // Token inválido ou expirado — limpa o estado
      dispatch(clearCredentials());
    }
  }, [isSuccess, isError, data, token, dispatch]);

  return <>{children}</>;
};

export default AppInitializer;
```

```tsx
// src/main.tsx

enableMocking().then(() => {
  createRoot(root).render(
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <AppInitializer>         {/* verifica sessão antes de renderizar */}
            <ErrorBoundary FallbackComponent={PageError}>
              <App />
            </ErrorBoundary>
          </AppInitializer>
        </Provider>
      </BrowserRouter>
    </StrictMode>,
  );
});
```

---

## 8. Proteção de rotas

```tsx
// src/components/widgets/require-auth/require-auth.tsx

import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsAuthenticated } from '@/app/features/auth/auth-slice';

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    // `state.from` guarda a rota que o utilizador tentou aceder
    // após o login, é usado para redirecionar de volta
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace  // substitui no histórico — "Back" não volta ao checkout vazio
      />
    );
  }

  return <>{children}</>;
};

export default RequireAuth;
```

```tsx
// src/app.tsx

<Route
  path="/checkout"
  element={
    <RequireAuth>
      <RequireCart>
        <CheckoutPage />
      </RequireCart>
    </RequireAuth>
  }
/>
<Route
  path="/profile"
  element={
    <RequireAuth>
      <ProfilePage />
    </RequireAuth>
  }
/>
```

---

## 9. Páginas de login e registo

### Schema Zod

```ts
// src/libs/schemas/auth.ts

import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Wrong format'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Wrong format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  },
);

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
```

### LoginPage

```tsx
// src/pages/login-page/login-page.tsx

import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useLoginMutation } from '@/app/services/auth.service';
import { setCredentials } from '@/app/features/auth/auth-slice';
import { Button, Input, Label } from '@/components/ui';
import { loginSchema, type LoginFormData } from '@/libs/schemas/auth';
import type { AppDispatch } from '@/app/store';
import { cn } from '@/libs/cn';

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  // Rota de origem — para onde redirecionar após login
  // Se não houver origem, vai para a home
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/';

  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await login(data).unwrap();
      // .unwrap() lança exceção se o status for >= 400
      // sem .unwrap(), o catch nunca seria chamado em erros HTTP

      dispatch(setCredentials({ user: result.user, token: result.token }));
      navigate(from, { replace: true });

    } catch (error) {
      // Erro de credenciais — mostrar no campo de password
      // Não mostrar qual campo está errado (email ou password) por segurança
      setError('password', { message: 'Invalid email or password' });
    }
  };

  return (
    <main className={cn('wrapper', 'min-block-screen', 'flex', 'items-center', 'justify-center')}>
      <div className={cn('w-full', 'max-w-md', 'flex', 'flex-col', 'gap-8')}>
        <h1 className={cn('text-2xl', 'uppercase')}>Sign in</h1>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className={cn('flex', 'flex-col', 'gap-6')}>

          <div className={cn('flex', 'flex-col', 'gap-2')}>
            <Label htmlFor="email" isInvalid={!!errors.email}>
              Email
            </Label>
            <Input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="johndoe@example.com"
              isInvalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              {...register('email')}
            />
            {errors.email && (
              <p id="email-error" role="alert" className={cn('text-xs', 'text-danger-400')}>
                {errors.email.message}
              </p>
            )}
          </div>

          <div className={cn('flex', 'flex-col', 'gap-2')}>
            <Label htmlFor="password" isInvalid={!!errors.password}>
              Password
            </Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              isInvalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
              {...register('password')}
            />
            {errors.password && (
              <p id="password-error" role="alert" className={cn('text-xs', 'text-danger-400')}>
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={!isValid || isLoading}
            className={cn('w-full')}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>

        </form>

        <p className={cn('text-sm', 'text-center', 'text-black/50')}>
          Don't have an account?{' '}
          <Link to="/register" className={cn('text-primary-400', 'underline')}>
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
```

### RegisterPage

```tsx
// src/pages/register-page/register-page.tsx

import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useRegisterMutation } from '@/app/services/auth.service';
import { setCredentials } from '@/app/features/auth/auth-slice';
import { Button, Input, Label } from '@/components/ui';
import { registerSchema, type RegisterFormData } from '@/libs/schemas/auth';
import type { AppDispatch } from '@/app/store';
import { cn } from '@/libs/cn';

const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const result = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        // confirmPassword não é enviado ao servidor — é apenas validação local
      }).unwrap();

      dispatch(setCredentials({ user: result.user, token: result.token }));
      navigate('/', { replace: true });

    } catch (error: unknown) {
      // Email já em uso — o servidor devolve 409
      const fetchError = error as { status?: number };
      if (fetchError.status === 409) {
        setError('email', { message: 'This email is already in use' });
      }
    }
  };

  return (
    <main className={cn('wrapper', 'min-block-screen', 'flex', 'items-center', 'justify-center')}>
      <div className={cn('w-full', 'max-w-md', 'flex', 'flex-col', 'gap-8')}>
        <h1 className={cn('text-2xl', 'uppercase')}>Create account</h1>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className={cn('flex', 'flex-col', 'gap-6')}>

          <div className={cn('flex', 'flex-col', 'gap-2')}>
            <Label htmlFor="name" isInvalid={!!errors.name}>
              Name
            </Label>
            <Input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="John Doe"
              isInvalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              {...register('name')}
            />
            {errors.name && (
              <p id="name-error" role="alert" className={cn('text-xs', 'text-danger-400')}>
                {errors.name.message}
              </p>
            )}
          </div>

          <div className={cn('flex', 'flex-col', 'gap-2')}>
            <Label htmlFor="reg-email" isInvalid={!!errors.email}>
              Email
            </Label>
            <Input
              id="reg-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="johndoe@example.com"
              isInvalid={!!errors.email}
              aria-describedby={errors.email ? 'reg-email-error' : undefined}
              {...register('email')}
            />
            {errors.email && (
              <p id="reg-email-error" role="alert" className={cn('text-xs', 'text-danger-400')}>
                {errors.email.message}
              </p>
            )}
          </div>

          <div className={cn('flex', 'flex-col', 'gap-2')}>
            <Label htmlFor="reg-password" isInvalid={!!errors.password}>
              Password
            </Label>
            <Input
              id="reg-password"
              type="password"
              autoComplete="new-password"
              placeholder="Min. 8 characters"
              isInvalid={!!errors.password}
              aria-describedby={errors.password ? 'reg-password-error' : undefined}
              {...register('password')}
            />
            {errors.password && (
              <p id="reg-password-error" role="alert" className={cn('text-xs', 'text-danger-400')}>
                {errors.password.message}
              </p>
            )}
          </div>

          <div className={cn('flex', 'flex-col', 'gap-2')}>
            <Label htmlFor="confirm-password" isInvalid={!!errors.confirmPassword}>
              Confirm Password
            </Label>
            <Input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              isInvalid={!!errors.confirmPassword}
              aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p id="confirm-password-error" role="alert" className={cn('text-xs', 'text-danger-400')}>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={!isValid || isLoading}
            className={cn('w-full')}
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>

        </form>

        <p className={cn('text-sm', 'text-center', 'text-black/50')}>
          Already have an account?{' '}
          <Link to="/login" className={cn('text-primary-400', 'underline')}>
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
};

export default RegisterPage;
```

---

## 10. Stories

As stories das páginas de autenticação têm um desafio: são páginas com formulários que disparam mutations do RTK Query. Para as stories funcionarem no Storybook precisamos de:

1. O `StoreDecorator` (já tens) — fornece o Redux store
2. O `RouterDecorator` (já tens) — fornece o contexto de routing
3. O MSW configurado no Storybook (já tens com `msw-storybook-addon`)

### Stories da LoginPage

```tsx
// src/pages/login-page/login-page.stories.tsx

import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within, expect } from '@storybook/test';

import { LoginPage } from '@/pages';

const meta = {
  title: 'pages/LoginPage',
  component: LoginPage,
  parameters: {
    layout: 'fullscreen',
    // Rota correta para o RouterDecorator
    route: '/login',
    routePath: '/login',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

// Estado inicial — formulário vazio
export const Default: Story = {};

// Formulário preenchido com credenciais válidas
// Útil para ver o estado do botão quando o formulário é válido
export const FilledValid: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(
      canvas.getByLabelText(/email/i),
      'john@example.com',
    );
    await userEvent.type(
      canvas.getByLabelText(/password/i),
      'password123',
    );
  },
};

// Submissão com credenciais inválidas — mostra o erro do servidor
export const InvalidCredentials: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByLabelText(/email/i), 'wrong@example.com');
    await userEvent.type(canvas.getByLabelText(/password/i), 'wrongpassword');

    await userEvent.click(canvas.getByRole('button', { name: /sign in/i }));

    // Verificar que o erro aparece
    await expect(
      await canvas.findByRole('alert'),
    ).toBeInTheDocument();
  },
};

// Erros de validação — submeter com campos vazios
export const ValidationErrors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Focar e sair do campo email sem preencher
    await userEvent.click(canvas.getByLabelText(/email/i));
    await userEvent.tab();

    // Focar e sair do campo password sem preencher
    await userEvent.click(canvas.getByLabelText(/password/i));
    await userEvent.tab();
  },
};
```

### Stories da RegisterPage

```tsx
// src/pages/register-page/register-page.stories.tsx

import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within, expect } from '@storybook/test';

import { RegisterPage } from '@/pages';

const meta = {
  title: 'pages/RegisterPage',
  component: RegisterPage,
  parameters: {
    layout: 'fullscreen',
    route: '/register',
    routePath: '/register',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

// Estado inicial
export const Default: Story = {};

// Formulário preenchido corretamente
export const FilledValid: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByLabelText(/^name/i), 'Jane Doe');
    await userEvent.type(canvas.getByLabelText(/email/i), 'jane@example.com');
    await userEvent.type(canvas.getByLabelText(/^password/i), 'securepass123');
    await userEvent.type(canvas.getByLabelText(/confirm/i), 'securepass123');
  },
};

// Passwords não coincidem — valida o .refine() do schema
export const PasswordMismatch: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByLabelText(/^name/i), 'Jane Doe');
    await userEvent.type(canvas.getByLabelText(/email/i), 'jane@example.com');
    await userEvent.type(canvas.getByLabelText(/^password/i), 'securepass123');
    await userEvent.type(canvas.getByLabelText(/confirm/i), 'different456');
    await userEvent.tab();  // trigger de validação ao sair do campo
  },
};

// Email já em uso — o mock devolve 409
export const EmailAlreadyInUse: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // O utilizador pré-definido no mock tem este email
    await userEvent.type(canvas.getByLabelText(/^name/i), 'John Doe');
    await userEvent.type(canvas.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(canvas.getByLabelText(/^password/i), 'password123');
    await userEvent.type(canvas.getByLabelText(/confirm/i), 'password123');

    await userEvent.click(canvas.getByRole('button', { name: /create account/i }));

    await expect(
      await canvas.findByRole('alert'),
    ).toBeInTheDocument();
  },
};
```

### Notas sobre as stories

**`userEvent.type` em vez de `fireEvent`** — `userEvent` simula comportamento humano real (keystroke por keystroke), o que ativa a validação `onChange` do react-hook-form corretamente. `fireEvent` muda o valor diretamente sem simular eventos de input, o que pode não ativar a validação.

**`canvas.findByRole('alert')` em vez de `getByRole`** — `findBy` é assíncrono e espera até o elemento aparecer no DOM. `getBy` falha imediatamente se o elemento não existir — problemas com operações assíncronas como mutations do RTK Query.

**`getByLabelText` em vez de `getByPlaceholderText`** — selecionar por label é mais robusto e testa implicitamente que o `htmlFor` está correto. Selecionar por placeholder pode quebrar se o texto mudar.
