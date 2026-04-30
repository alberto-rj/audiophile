# RTK Query — Guia Prático

> Guia focado no uso de RTK Query no projeto Audiophile. Sem over-engineering.

---

## Índice

1. [O que é RTK Query e porquê usá-lo](#1-o-que-é-rtk-query-e-porquê-usá-lo)
2. [Anatomia de um `createApi`](#2-anatomia-de-um-createapi)
3. [Queries — buscar dados](#3-queries--buscar-dados)
4. [Mutations — enviar dados](#4-mutations--enviar-dados)
5. [Estados de loading e erro](#5-estados-de-loading-e-erro)
6. [Cache — o que acontece por baixo](#6-cache--o-que-acontece-por-baixo)
7. [Organização de ficheiros no projeto](#7-organização-de-ficheiros-no-projeto)
8. [O que não fazer](#8-o-que-não-fazer)

---

## 1. O que é RTK Query e porquê usá-lo

Sem RTK Query, fazer uma requisição num componente implica sempre o mesmo padrão repetitivo:

```tsx
const [data, setData] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
  setIsLoading(true);
  fetch('/api/products')
    .then((res) => res.json())
    .then((data) => setData(data))
    .catch((err) => setError(err))
    .finally(() => setIsLoading(false));
}, []);
```

Este padrão tem problemas:

- Repetes-o em cada componente que faz fetch
- Não há cache — cada montagem do componente faz um novo pedido
- Gerir loading, erro, e dados em simultâneo com `useState` é frágil

**RTK Query resolve tudo isso.** Defines os endpoints uma vez, e ele gera hooks automaticamente com loading, erro, cache, e re-fetching incluídos.

```tsx
// Com RTK Query — o mesmo resultado em duas linhas
const { data, isLoading, isError } = useGetProductsQuery();
```

---

## 2. Anatomia de um `createApi`

```ts
// src/app/services/products.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  // Nome único — usado internamente pelo Redux para gerir o estado
  // Não pode colidir com outros createApi no mesmo store
  reducerPath: 'productsApi',

  // Define a URL base de todas as requisições deste API slice
  // Todas as queries são relativas a este URL
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),

  // Endpoints — cada um gera um hook automaticamente
  endpoints: (builder) => ({
    // builder.query = GET (buscar dados)
    // builder.mutation = POST, PUT, PATCH, DELETE (modificar dados)
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
      // Resultado: hook useGetProductsQuery()
    }),
  }),
});

// Exporta os hooks gerados automaticamente
// O nome segue o padrão: use + NomeDoEndpoint + Query (ou Mutation)
export const { useGetProductsQuery } = productsApi;
```

### Registar no store

Cada `createApi` precisa de ser registado no store — o RTK Query gere o seu próprio estado e cache internamente:

```ts
// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './services/products';
import { categoriesApi } from './services/categories';

export const store = configureStore({
  reducer: {
    // Adiciona o reducer do RTK Query — gere o cache internamente
    [productsApi.reducerPath]: productsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      // O middleware é obrigatório — gere cache, invalidação, e re-fetching
      .concat(productsApi.middleware)
      .concat(categoriesApi.middleware),
});
```

---

## 3. Queries — buscar dados

### Definir

```ts
// src/app/services/products.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product } from '@/libs/types';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    // Query sem parâmetros — void significa que o hook não recebe argumentos
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
    }),

    // Query com parâmetro — o tipo do argumento substitui void
    getProductBySlug: builder.query<Product, string>({
      query: (slug) => `/products/${slug}`,
      // O hook gerado: useGetProductBySlugQuery('yx1-earphones')
    }),
  }),
});

export const { useGetProductsQuery, useGetProductBySlugQuery } = productsApi;
```

### Usar num componente

```tsx
// Sem parâmetro
const ProductsPage = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  if (isLoading) return <ProductListSkeleton />;
  if (isError) return <ErrorMessage />;

  return <ProductList products={products!} />;
};
```

```tsx
// Com parâmetro — vem do useParams
const ProductPage = () => {
  const { slug } = useParams();

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductBySlugQuery(slug!, {
    // Não faz a query se slug for undefined
    // Evita requisições com URL inválido como /api/products/undefined
    skip: !slug,
  });

  if (isLoading) return <ProductSkeleton />;
  if (isError) return <ErrorMessage />;
  if (!product) return null;

  return <ProductDetail product={product} />;
};
```

### Os valores retornados mais úteis

| Valor        | Tipo                  | Quando usar                                   |
| ------------ | --------------------- | --------------------------------------------- |
| `data`       | `T \| undefined`      | Os dados da resposta                          |
| `isLoading`  | `boolean`             | Primeira carga — sem dados em cache           |
| `isFetching` | `boolean`             | Qualquer carga — incluindo re-fetch com cache |
| `isError`    | `boolean`             | A requisição falhou                           |
| `isSuccess`  | `boolean`             | Dados disponíveis com sucesso                 |
| `error`      | `FetchBaseQueryError` | Detalhes do erro                              |

**Diferença entre `isLoading` e `isFetching`:**

- `isLoading` é `true` apenas na primeira vez que não há dados em cache
- `isFetching` é `true` sempre que há uma requisição em curso, mesmo que já haja dados cacheados

Para mostrar um skeleton inicial usa `isLoading`. Para mostrar um indicador subtil de atualização usa `isFetching`.

---

## 4. Mutations — enviar dados

Mutations são para operações que modificam dados no servidor: POST, PUT, PATCH, DELETE.

### Definir

```ts
// src/app/services/orders.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CheckoutFormData } from '@/libs/schemas';
import type { CartItem } from '@/libs/types';

interface CreateOrderPayload extends CheckoutFormData {
  items: CartItem[];
  total: number;
}

interface CreateOrderResponse {
  id: number;
  createdAt: string;
}

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    createOrder: builder.mutation<CreateOrderResponse, CreateOrderPayload>({
      query: (payload) => ({
        url: '/orders',
        method: 'POST',
        body: payload,
        // fetchBaseQuery serializa body como JSON automaticamente
        // e adiciona Content-Type: application/json
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApi;
```

### Usar num componente

O hook de mutation devolve um tuplo — o primeiro elemento é a função que dispara a mutation, o segundo tem o estado:

```tsx
const CheckoutForm = ({
  id,
  onSubmittingChange,
  onValidChange,
}: CheckoutFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector(selectItems);
  const grandTotal = useSelector(selectGrandTotal);

  // Tuplo: [função trigger, estado]
  const [createOrder, { isLoading, isError, isSuccess }] =
    useCreateOrderMutation();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useCheckoutForm();

  // Sincroniza isLoading com a página para desativar o botão
  useEffect(() => {
    onSubmittingChange?.(isLoading);
  }, [isLoading, onSubmittingChange]);

  useEffect(() => {
    onValidChange?.(isValid);
  }, [isValid, onValidChange]);

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      const result = await createOrder({
        ...data,
        items: cartItems,
        total: grandTotal,
      }).unwrap();
      // .unwrap() lança exceção se a mutation falhar
      // sem .unwrap(), erros HTTP (404, 500) não são lançados como exceções

      dispatch(clearCart());
      // abrir modal de confirmação com result.id
    } catch (error) {
      // erro de rede ou resposta HTTP >= 400
      console.error('Order failed:', error);
    }
  };

  return (
    <form
      id={id}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* campos */}
    </form>
  );
};
```

### Porquê `.unwrap()`

Por defeito, mutations do RTK Query nunca lançam exceções — capturam tudo internamente e expõem o erro através de `isError`. Isso significa que sem `.unwrap()`, o teu `try/catch` nunca apanharia um erro HTTP:

```tsx
// Sem .unwrap() — o catch nunca é chamado mesmo com erro 500
try {
  await createOrder(payload); // falha silenciosamente
} catch (error) {
  // nunca chega aqui
}

// Com .unwrap() — comportamento normal de async/await
try {
  await createOrder(payload).unwrap(); // lança exceção em caso de erro
} catch (error) {
  // apanha erros de rede e HTTP >= 400
}
```

---

## 5. Estados de loading e erro

### Loading — skeleton vs spinner

Para páginas completas usa skeleton — é menos disruptivo do que um spinner centrado:

```tsx
const CategoryPage = () => {
  const { slug } = useParams();
  const { data, isLoading, isError } = useGetProductsByCategoryQuery(slug!, {
    skip: !slug,
  });

  // isLoading — primeira carga sem cache
  if (isLoading) {
    return (
      <>
        <Header title='...' /> {/* título ainda não disponível */}
        <ProductListSkeleton count={3} />
      </>
    );
  }

  if (isError) {
    return (
      <ErrorMessage message='Failed to load products. Please try again.' />
    );
  }

  return (
    <>
      <Header title={data!.name} />
      <ProductList products={data!.items} />
    </>
  );
};
```

### Erro — não deixar o utilizador sem resposta

O estado de erro devia sempre dar ao utilizador uma ação:

```tsx
if (isError) {
  return (
    <div role='alert'>
      <p>Something went wrong loading this page.</p>
      <button onClick={() => window.location.reload()}>Try again</button>
    </div>
  );
}
```

`role="alert"` anuncia o erro a leitores de ecrã automaticamente quando o elemento aparece no DOM.

---

## 6. Cache — o que acontece por baixo

O RTK Query cacheia automaticamente os resultados por endpoint + argumentos. Isto significa:

- `useGetProductBySlugQuery('yx1-earphones')` — faz fetch uma vez, cacheia o resultado
- Se outro componente chamar o mesmo hook com o mesmo argumento, usa o cache — sem fetch repetido
- O cache expira 60 segundos após o último componente que o usa ser desmontado

Para este projeto não precisas de configurar nada — o comportamento por defeito é correto. O único caso onde precisas de pensar no cache é depois de criar um pedido: o stock pode ter mudado, mas como não há gestão de stock neste projeto, não é relevante.

---

## 7. Organização de ficheiros no projeto

```
src/
  app/
    services/
      products.ts      ← useGetProductsQuery, useGetProductBySlugQuery
      categories.ts    ← useGetCategoriesQuery, useGetProductsByCategoryQuery
      orders.ts        ← useCreateOrderMutation
    features/
      cart/
        cart-slice.ts  ← estado local do carrinho (não é fetch)
        selectors.ts
    store.ts           ← configureStore com todos os reducers e middlewares
```

**Porquê separar `services` de `features`?**

`services` contém dados que vêm do servidor — produtos, categorias, pedidos. São dados remotos geridos pelo RTK Query.

`features/cart` contém estado local — o carrinho existe só no browser, não é fetched de lado nenhum. É um Redux slice normal, não RTK Query.

A separação torna claro o que é estado local e o que é estado remoto.

---

## 8. O que não fazer

**Não uses `useEffect` + `fetch` quando tens RTK Query**

Se já configuraste o RTK Query, não faz sentido voltar ao padrão manual. Mesmo para um endpoint simples, o hook gerado é mais conciso e inclui cache.

**Não cries um `createApi` por componente**

Um `createApi` por domínio (produtos, categorias, pedidos) é suficiente. Criar um por componente multiplica os reducers e middlewares no store desnecessariamente.

**Não ignores o `skip`**

Sempre que um argumento de query pode ser `undefined` — como `useParams()` — usa `skip: !slug`. Sem isso fazes requisições para URLs inválidos que o servidor não reconhece.

**Não uses `.unwrap()` em queries, só em mutations**

Em queries, `isError` e `error` são suficientes para tratar erros. O `.unwrap()` é para mutations onde precisas de `try/catch` no `onSubmit`.

**Não copies `data` para estado local com `useState`**

```tsx
// Errado — duplica o estado desnecessariamente
const { data } = useGetProductsQuery();
const [products, setProducts] = useState(data);

// Correto — usa data diretamente
const { data: products } = useGetProductsQuery();
```

O RTK Query já gere o estado — copiar para `useState` cria duas fontes de verdade que podem dessincronizar.
