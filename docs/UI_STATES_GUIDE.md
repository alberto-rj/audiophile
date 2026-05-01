# Guia de UI States — Not Found, Error e Loader

> Referência prática para implementar os estados de erro, carregamento e página não encontrada no projeto Audiophile. Sem over-engineering.

---

## Índice

1. [Mapa de responsabilidades](#1-mapa-de-responsabilidades)
2. [Page Not Found](#2-page-not-found)
3. [Error Page — erros de rota](#3-error-page--erros-de-rota)
4. [Error Boundary — erros de render](#4-error-boundary--erros-de-render)
5. [Error Message — erros de fetch](#5-error-message--erros-de-fetch)
6. [Page Loader](#6-page-loader)
7. [Onde colocar cada peça](#7-onde-colocar-cada-peça)
8. [Fluxo completo de erros](#8-fluxo-completo-de-erros)

---

## 1. Mapa de responsabilidades

Cada tipo de erro tem uma ferramenta diferente. Usar a errada significa que o erro não é capturado.

| Situação | Ferramenta |
|---|---|
| URL não existe | Rota `*` → `NotFoundPage` |
| Erro numa rota do React Router | `errorElement` → `ErrorPage` |
| Erro durante render de um componente | `ErrorBoundary` → `ErrorBoundaryFallback` |
| Fetch falhou (RTK Query) | `isError` + componente `ErrorMessage` inline |
| Erro num event handler (`onClick`, `onSubmit`) | `try/catch` manual |
| Ação a processar | `disabled` no botão + texto "Processing..." |

---

## 2. Page Not Found

**Contexto:** o utilizador acedeu a um URL que não existe.

**O que considerar:**
- É uma página real com rota `*` — precisa de `<title>` descritivo
- O `<h1>` deve ser descritivo, não apenas "404"
- O número "404" é decorativo — usa `aria-hidden`
- Sempre oferece uma ação de navegação — nunca uma página morta

```tsx
// src/pages/not-found-page.tsx
import { Link } from 'react-router-dom';
import { cn } from '@/libs/cn';

const NotFoundPage = () => {
  return (
    <>
      <title>Page not found — Audiophile</title>

      <main
        className={cn(
          'wrapper',
          'min-block-screen',
          'flex',
          'flex-col',
          'items-center',
          'justify-center',
          'gap-6',
          'text-center',
          'py-20',
        )}
      >
        {/* aria-hidden — o número é decorativo, o h1 é o conteúdo real */}
        <span
          aria-hidden="true"
          className={cn('text-[8rem]', 'font-bold', 'text-primary-400', 'leading-none')}
        >
          404
        </span>

        <h1 className={cn('text-2xl', 'uppercase')}>
          Page not found
        </h1>

        <p className={cn('text-base', 'text-black/50', 'max-w-sm')}>
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link to="/" className={cn('btn', 'btn--primary')}>
          Back to home
        </Link>
      </main>
    </>
  );
};

export default NotFoundPage;
```

Registar no router:

```tsx
// src/app.tsx
<Route path="*" element={<NotFoundPage />} />
```

---

## 3. Error Page — erros de rota

**Contexto:** o React Router lança um erro numa rota — por exemplo, um loader que falha, ou uma rota que tenta aceder a dados que não existem.

**O que considerar:**
- `errorElement` captura erros de rotas, não erros de render de componentes
- `useRouteError()` dá acesso ao erro — distingue erros HTTP de erros JavaScript
- Oferece sempre duas ações: tentar novamente e voltar à home

```tsx
// src/pages/error-page.tsx
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { cn } from '@/libs/cn';

const ErrorPage = () => {
  const error = useRouteError();

  // isRouteErrorResponse — distingue erros HTTP (404, 500)
  // de erros JavaScript inesperados (TypeError, etc.)
  const message = isRouteErrorResponse(error)
    ? error.statusText
    : 'An unexpected error occurred.';

  return (
    <>
      <title>Something went wrong — Audiophile</title>

      <main
        className={cn(
          'wrapper',
          'min-block-screen',
          'flex',
          'flex-col',
          'items-center',
          'justify-center',
          'gap-6',
          'text-center',
          'py-20',
        )}
      >
        <h1 className={cn('text-2xl', 'uppercase')}>
          Something went wrong
        </h1>

        <p className={cn('text-base', 'text-black/50', 'max-w-sm')}>
          {message}
        </p>

        <div className={cn('flex', 'gap-4')}>
          {/* Recarrega a página — tenta recuperar do erro */}
          <button
            onClick={() => window.location.reload()}
            className={cn('btn', 'btn--secondary')}
          >
            Try again
          </button>

          {/* Fallback seguro — sempre funciona */}
          <Link to="/" className={cn('btn', 'btn--primary')}>
            Back to home
          </Link>
        </div>
      </main>
    </>
  );
};

export default ErrorPage;
```

Registar no router — `errorElement` na rota pai captura erros de todas as rotas filhas:

```tsx
// src/app.tsx
<Route
  path="/"
  element={<MainLayout />}
  errorElement={<ErrorPage />}
>
  <Route index element={<HomePage />} />
  <Route path="/categories/:slug" element={<CategoryPage />} />
  <Route path="/products/:slug" element={<ProductPage />} />
  <Route path="/checkout" element={<CheckoutPage />} />
</Route>
```

---

## 4. Error Boundary — erros de render

**Contexto:** um componente React lança uma exceção durante o render — por exemplo, aceder a uma propriedade de `undefined`, ou uma biblioteca de UI que falha inesperadamente.

**O que considerar:**
- O `errorElement` do React Router **não** captura erros de render — são responsabilidades diferentes
- O React não tem hook para Error Boundaries — usa `react-error-boundary` para evitar escrever uma classe
- `resetErrorBoundary` re-renderiza apenas a árvore abaixo do boundary, sem recarregar a página
- Posicionar o boundary no `MainLayout` mantém a Navbar e Footer funcionais quando uma página falha

```bash
npm install react-error-boundary
```

### Componente de fallback

```tsx
// src/components/ui/error-boundary-fallback/error-boundary-fallback.tsx
import { Link } from 'react-router-dom';
import type { FallbackProps } from 'react-error-boundary';
import { cn } from '@/libs/cn';

const ErrorBoundaryFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    // role="alert" — anuncia imediatamente a leitores de ecrã
    // adequado para erros, ao contrário de role="status" que é não intrusivo
    <div
      role="alert"
      className={cn(
        'wrapper',
        'flex',
        'flex-col',
        'items-center',
        'justify-center',
        'gap-6',
        'py-20',
        'text-center',
      )}
    >
      <h2 className={cn('text-2xl', 'uppercase')}>
        Something went wrong
      </h2>

      <p className={cn('text-base', 'text-black/50', 'max-w-sm')}>
        An unexpected error occurred. You can try again or go back to the home page.
      </p>

      <div className={cn('flex', 'gap-4')}>
        {/* resetErrorBoundary re-renderiza a árvore — sem recarregar a página */}
        <button
          onClick={resetErrorBoundary}
          className={cn('btn', 'btn--secondary')}
        >
          Try again
        </button>

        <Link to="/" className={cn('btn', 'btn--primary')}>
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default ErrorBoundaryFallback;
```

### Posicionar no MainLayout

O boundary no `MainLayout` isola o erro ao conteúdo da página — a Navbar e Footer continuam funcionais:

```tsx
// src/app/layouts/main-layout.tsx
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from '@/components/widgets';
import ErrorBoundaryFallback from '@/components/ui/error-boundary-fallback';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        {/* Só o conteúdo da página é substituído quando há erro */}
        {/* Navbar e Footer ficam visíveis — utilizador pode navegar */}
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
};
```

### Boundary global como última linha de defesa

O boundary no `main.tsx` captura tudo o que escapar ao boundary do layout — incluindo erros no próprio `MainLayout`:

```tsx
// src/main.tsx
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '@/components/ui/error-boundary-fallback';

enableMocking().then(() => {
  createRoot(root).render(
    <StrictMode>
      {/* Último recurso — captura erros fora do MainLayout */}
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <Provider store={store}>
          <App />
        </Provider>
      </ErrorBoundary>
    </StrictMode>,
  );
});
```

---

## 5. Error Message — erros de fetch

**Contexto:** uma query do RTK Query falhou — o servidor retornou erro ou não há conexão.

**O que considerar:**
- Não é uma página — é um componente inline que substitui o conteúdo que falhou
- `refetch` do RTK Query é preferível a `window.location.reload()` — repete apenas o pedido, sem perder o estado da app
- `role="alert"` anuncia o erro a leitores de ecrã quando o componente aparece no DOM

```tsx
// src/components/ui/error-message/error-message.tsx
import { cn } from '@/libs/cn';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorMessage = ({
  message = 'Something went wrong. Please try again.',
  onRetry,
}: ErrorMessageProps) => {
  return (
    <div
      role="alert"
      className={cn(
        'flex',
        'flex-col',
        'items-center',
        'gap-4',
        'py-20',
        'text-center',
      )}
    >
      <p className={cn('text-base', 'text-black/50')}>{message}</p>

      {/* Só renderiza o botão se houver ação de retry disponível */}
      {onRetry && (
        <button
          onClick={onRetry}
          className={cn('btn', 'btn--secondary')}
        >
          Try again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
```

Uso nas páginas com RTK Query:

```tsx
// category-page.tsx
const { data, isLoading, isError, refetch } = useGetProductsByCategoryQuery(
  slug!,
  { skip: !slug }
);

// isLoading — primeira carga sem dados em cache
if (isLoading) return <Spinner label="Loading products..." />;

// isError — fetch falhou
if (isError) {
  return (
    <ErrorMessage
      message="Failed to load products."
      onRetry={refetch}  // refetch gerado automaticamente pelo RTK Query
    />
  );
}
```

---

## 6. Page Loader

**Contexto:** uma página está a carregar dados antes de renderizar.

**O que considerar:**
- Não é uma página — é um estado visual temporário
- `role="status"` para leitores de ecrã — não intrusivo, ao contrário de `role="alert"`
- O texto do `aria-label` deve descrever o que está a carregar, não apenas "Loading"
- O elemento visual (círculo) tem `aria-hidden` — o label já descreve o estado

```tsx
// src/components/ui/spinner/spinner.tsx
import { cn } from '@/libs/cn';

interface SpinnerProps {
  label?: string;
}

const Spinner = ({ label = 'Loading...' }: SpinnerProps) => {
  return (
    // role="status" — anuncia de forma não intrusiva quando o leitor de ecrã está inativo
    // adequado para loading, ao contrário de role="alert" que interrompe imediatamente
    <div
      role="status"
      aria-label={label}
      className={cn(
        'flex',
        'items-center',
        'justify-center',
        'py-20',
      )}
    >
      {/* aria-hidden — o círculo é decorativo, o aria-label já descreve */}
      <span
        aria-hidden="true"
        className={cn(
          'size-10',
          'rounded-full',
          'border-4',
          'border-gray-300',
          'border-t-primary-400',
          'animate-spin',
        )}
      />
    </div>
  );
};

export default Spinner;
```

Uso nas páginas:

```tsx
if (isLoading) {
  return <Spinner label="Loading products..." />;
}
```

**`isLoading` vs `isFetching` no RTK Query:**

| Hook | Quando é `true` |
|---|---|
| `isLoading` | Apenas na primeira carga — sem dados em cache |
| `isFetching` | Sempre que há uma requisição em curso, incluindo re-fetch com cache |

Para o spinner de página usa `isLoading` — só mostra na primeira carga. Para um indicador subtil de atualização usa `isFetching`.

---

## 7. Onde colocar cada peça

```
src/
  pages/
    not-found-page.tsx          ← rota *
    error-page.tsx              ← errorElement do React Router

  components/
    ui/
      spinner/
        spinner.tsx             ← loading state nas páginas
      error-message/
        error-message.tsx       ← erros de fetch inline
      error-boundary-fallback/
        error-boundary-fallback.tsx  ← fallback do ErrorBoundary

  app/
    layouts/
      main-layout.tsx           ← ErrorBoundary envolve o <Outlet />

  main.tsx                      ← ErrorBoundary global como última defesa
```

---

## 8. Fluxo completo de erros

```
URL não existe
  → React Router → rota * → NotFoundPage

Erro de rota (loader falhou, etc.)
  → React Router → errorElement → ErrorPage
    → "Try again" → window.location.reload()
    → "Back to home" → Link to="/"

Erro durante render de componente
  → ErrorBoundary (MainLayout) → ErrorBoundaryFallback
    → "Try again" → resetErrorBoundary (re-renderiza a árvore)
    → "Back to home" → Link to="/"
  → Se o erro for no próprio MainLayout
    → ErrorBoundary global (main.tsx) → ErrorBoundaryFallback

Erro de fetch (RTK Query isError)
  → ErrorMessage inline
    → "Try again" → refetch() (repete só o pedido que falhou)

Erro num event handler (ex: onSubmit)
  → try/catch manual
    → mostrar mensagem de erro no formulário ou toast

Página a carregar (RTK Query isLoading)
  → Spinner com role="status" e aria-label descritivo
```

---

## Diferença entre `role="alert"` e `role="status"`

| Atributo | Comportamento | Quando usar |
|---|---|---|
| `role="alert"` | Interrompe o leitor de ecrã imediatamente | Erros — algo correu mal |
| `role="status"` | Anuncia quando o leitor de ecrã está inativo | Loading — informação não urgente |
