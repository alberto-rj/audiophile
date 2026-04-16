# Audiophile E-Commerce — Guia de Desenvolvimento

Guia prático para construir o desafio **Audiophile e-commerce website** do Frontend Mentor como projeto fullstack de portfólio.

**Stack:** React · TypeScript · Redux Toolkit · Storybook · Tailwind CSS · Express · Drizzle ORM · PostgreSQL

---

## Índice

1. [Visão geral do projeto](#1-visão-geral-do-projeto)
2. [Decisões de arquitetura](#2-decisões-de-arquitetura)
3. [Fase 1 — Fundação do projeto](#fase-1--fundação-do-projeto)
4. [Fase 2 — Sistema de componentes base](#fase-2--sistema-de-componentes-base)
5. [Fase 3 — Layout e páginas](#fase-3--layout-e-páginas)
6. [Fase 4 — Carrinho e checkout com Redux](#fase-4--carrinho-e-checkout-com-redux)
7. [Fase 5 — API com Express, Drizzle e PostgreSQL](#fase-5--api-com-express-drizzle-e-postgresql)
8. [Fase 6 — Integração frontend ↔ API](#fase-6--integração-frontend--api)
9. [Fase 7 — Polimento e deploy](#fase-7--polimento-e-deploy)
10. [Regras para não desistir](#regras-para-não-desistir)

---

## 1. Visão geral do projeto

### O desafio (Frontend Mentor)

Construir um e-commerce multi-página que permita ao utilizador:

- Ver o layout ideal consoante o tamanho do ecrã (responsivo)
- Ver estados de hover em todos os elementos interativos
- Adicionar e remover produtos do carrinho
- Editar quantidades no carrinho
- Preencher todos os campos no checkout
- Receber validações de formulário em campos em falta ou inválidos
- Ver os totais corretos no checkout:
  - Envio adiciona sempre $50 ao pedido
  - IVA é calculado como 20% do total de produtos (sem envio)
- Ver um modal de confirmação com resumo do pedido após o checkout
- (Bonus) Manter o estado do carrinho após atualizar o browser

### Estrutura de pastas

```
audiophile/
├── client/          # Frontend React
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── utils/
│   ├── .storybook/
│   └── tailwind.config.ts
├── server/          # Backend Express
│   ├── src/
│   │   ├── routes/
│   │   ├── db/
│   │   └── index.ts
│   └── drizzle.config.ts
└── README.md
```

---

## 2. Decisões de arquitetura

### Componentes do zero vs biblioteca (ShadCN)

**Decisão: construir do zero com Tailwind.**

O Frontend Mentor fornece designs com identidade visual muito específica. Usar uma biblioteca de componentes (ShadCN, MUI, etc.) significa passar tempo a desconstruir estilos pré-definidos para chegar ao design fornecido — trabalho contraproducente.

Construir do zero demonstra mais para portfólio: prova que sabes criar um sistema de design consistente a partir de tokens visuais.

### Ordem das fases

O backend é introduzido apenas na Fase 5, quando o frontend visual já está completo. O `data.json` fornecido pelo Frontend Mentor serve perfeitamente durante o desenvolvimento visual. Introduzir o backend cedo é a principal causa de abandono em projetos pessoais.

### Redux Toolkit

O Redux é introduzido apenas na Fase 4, quando o carrinho é implementado. Nas fases anteriores, os dados são passados diretamente via props ou importados do `data.json`. Misturar gestão de estado global com construção de layout aumenta a complexidade sem benefício imediato.

---

## Fase 1 — Fundação do projeto

**Duração estimada: ~1 dia**

### Objetivo

Ter o projeto a correr no browser com as cores e fonte corretas do design, antes de escrever qualquer componente.

### Passos

**1. Criar repositório e estrutura de pastas**

```bash
mkdir audiophile && cd audiophile
git init
mkdir client server
```

**2. Inicializar o frontend com Vite**

```bash
cd client
npm create vite@latest . -- --template react-ts
npm install
```

**3. Instalar e configurar Tailwind CSS**

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**4. Extrair design tokens do Figma e configurar `tailwind.config.ts`**

Abre o Figma do desafio e identifica:

- Paleta de cores (primária, secundária, backgrounds, estados de erro)
- Família tipográfica: **Manrope** (importar via Google Fonts)
- Breakpoints: mobile (375px), tablet (768px), desktop (1440px)

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'orange': '#D87D4A',
        'orange-light': '#FBAF85',
        'black': '#000000',
        'dark': '#191919',
        'gray-dark': '#4C4C4C',
        'gray': '#F1F1F1',
        'gray-light': '#FAFAFA',
        'white': '#FFFFFF',
        'error': '#CD2C2C',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      screens: {
        sm: '375px',
        md: '768px',
        lg: '1440px',
      },
    },
  },
  plugins: [],
};

export default config;
```

**5. Instalar e inicializar Storybook**

```bash
npx storybook@latest init
```

Storybook deteta automaticamente o Vite. Aceita as opções por defeito.

**6. Configurar ESLint + Prettier**

```bash
npm install -D eslint prettier eslint-config-prettier
```

---

**Entregável desta fase:** browser mostra uma página em branco com a fonte Manrope correta. O Storybook abre em `localhost:6006`. As cores do design estão disponíveis como classes Tailwind.

---

## Fase 2 — Sistema de componentes base

**Duração estimada: ~2–3 dias**

### Objetivo

Construir os componentes atómicos reutilizáveis, cada um com uma story no Storybook cobrindo todos os estados visuais.

### Regra desta fase

Um componente de cada vez. Só avança para o próximo quando o story no Storybook cobrir todos os estados (normal, hover, disabled, erro, etc.).

### Componentes a construir

---

#### `Button`

Variantes: `primary` | `secondary` | `outline`
Estados: normal, hover, disabled

```tsx
// src/components/Button/Button.tsx
type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps {
  variant?: ButtonVariant;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}
```

---

#### `Input`

Com label, placeholder, estado de erro com mensagem.

```tsx
interface InputProps {
  label: string;
  placeholder?: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
}
```

---

#### `QuantitySelector`

Botões `–` e `+` com o valor entre eles. Não permite valores abaixo de 1.

```tsx
interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
}
```

---

#### `ProductCard`

Imagem, badge "NEW PRODUCT" (opcional), nome, descrição curta, preço e botão de ação.

---

#### `CategoryCard`

Card de navegação das três categorias: Headphones, Speakers, Earphones. Com imagem, nome e link.

---

## Fase 3 — Layout e páginas

**Duração estimada: ~3–4 dias**

### Objetivo

Construir todas as páginas do site usando dados estáticos do `data.json`. Sem Redux, sem API — apenas layout e responsividade.

### Instalar React Router

```bash
npm install react-router-dom
```

```tsx
// src/main.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<BrowserRouter>
  <Routes>
    <Route
      path='/'
      element={<Home />}
    />
    <Route
      path='/category/:name'
      element={<Category />}
    />
    <Route
      path='/product/:slug'
      element={<ProductDetail />}
    />
    <Route
      path='/checkout'
      element={<Checkout />}
    />
  </Routes>
</BrowserRouter>;
```

### Usar o `data.json` diretamente

```tsx
// src/data/products.ts
import data from '../data.json';
export const products = data;
```

### Páginas

---

#### Navbar + Footer

Componentes de layout partilhados. A Navbar inclui o ícone do carrinho (sem funcionalidade ainda — apenas visual).

---

#### Página Home

- Hero section com CTA
- Grid das três categorias
- Featured product (XX99 Mark II)
- Dois produtos secundários em destaque
- "Best Gear" section

---

#### Página Category (`/category/:name`)

- Título da categoria no topo
- Lista de produtos da categoria, alternando imagem à esquerda/direita
- Link para as outras categorias no fundo

```tsx
const { name } = useParams();
const categoryProducts = products.filter((p) => p.category === name);
```

---

#### Página Product Detail (`/product/:slug`)

- Botão "Go Back"
- Imagem principal + info (nome, descrição, preço, quantity selector, botão Add to Cart)
- Secção Features
- Secção "In the Box" (items incluídos)
- Galeria de 3 imagens
- Secção "You May Also Like"

---

#### Responsividade

Após construir cada página para desktop, adaptar para tablet (768px) e mobile (375px). Tailwind facilita com os prefixos `md:` e `lg:`.

---

**Entregável desta fase:** site navegável completo com dados reais do `data.json`, responsivo nos três breakpoints. O carrinho ainda não funciona.

---

## Fase 4 — Carrinho e checkout com Redux

**Duração estimada: ~2–3 dias**

### Objetivo

Implementar toda a lógica do carrinho e do formulário de checkout.

### Instalar dependências

```bash
npm install @reduxjs/toolkit react-redux
npm install react-hook-form zod @hookform/resolvers
```

### Configurar a store

```tsx
// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Criar o `cartSlice`

```tsx
// src/store/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) item.quantity = action.payload.quantity;
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
```

### Persistência com localStorage

```tsx
// src/store/store.ts (atualizado)
const preloadedState = localStorage.getItem('cart')
  ? { cart: JSON.parse(localStorage.getItem('cart')!) }
  : undefined;

export const store = configureStore({
  reducer: { cart: cartReducer },
  preloadedState,
});

store.subscribe(() => {
  localStorage.setItem('cart', JSON.stringify(store.getState().cart));
});
```

### Totais do carrinho

```tsx
// src/store/cartSelectors.ts
export const selectSubtotal = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const selectShipping = () => 50;

export const selectVAT = (state: RootState) =>
  Math.round(selectSubtotal(state) * 0.2);

export const selectGrandTotal = (state: RootState) =>
  selectSubtotal(state) + selectShipping() + selectVAT(state);
```

### Formulário de checkout com Zod

```tsx
// src/pages/Checkout/schema.ts
import { z } from 'zod';

export const checkoutSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Wrong format'),
  phone: z.string().min(1, 'Phone is required'),
  address: z.string().min(1, 'Address is required'),
  zip: z.string().min(1, 'ZIP code is required'),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
  paymentMethod: z.enum(['e-money', 'cash']),
  eMoneyNumber: z.string().optional(),
  eMoneyPin: z.string().optional(),
});
```

---

**Entregável desta fase:** carrinho funcional com persistência, formulário de checkout com validação, modal de confirmação de pedido.

---

## Fase 5 — API com Express, Drizzle e PostgreSQL

**Duração estimada: ~3–4 dias**

### Objetivo

Construir a API REST que vai servir produtos e persistir pedidos.

### Setup do servidor

```bash
cd server
npm init -y
npm install express cors dotenv
npm install -D typescript ts-node-dev @types/express @types/node
npm install drizzle-orm pg
npm install -D drizzle-kit @types/pg
```

### Schema Drizzle

```ts
// server/src/db/schema.ts
import {
  pgTable,
  serial,
  text,
  integer,
  numeric,
  timestamp,
} from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
});

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  description: text('description'),
  price: integer('price').notNull(),
  isNew: integer('is_new').default(0),
  image: text('image'),
});

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  total: integer('total').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').notNull(),
  productId: integer('product_id').notNull(),
  quantity: integer('quantity').notNull(),
  price: integer('price').notNull(),
});
```

### Rotas

```
GET  /api/products                → lista todos os produtos
GET  /api/products/:slug          → produto por slug
GET  /api/categories/:name        → produtos por categoria
POST /api/orders                  → cria novo pedido
```

### Script de seed

Criar um script `server/src/db/seed.ts` que lê o `data.json` do Frontend Mentor e insere todos os produtos na base de dados.

---

**Entregável desta fase:** API a correr em `localhost:3000/api` com dados reais na base de dados.

---

## Fase 6 — Integração frontend ↔ API

**Duração estimada: ~1–2 dias**

### Objetivo

Substituir o `data.json` por chamadas reais à API.

### Instalar React Query (opcional mas recomendado)

```bash
npm install @tanstack/react-query
```

### Substituir os dados estáticos

```tsx
// Antes
import data from '../data.json';
const products = data.filter((p) => p.category === 'headphones');

// Depois
const { data: products } = useQuery({
  queryKey: ['products', 'headphones'],
  queryFn: () => fetch('/api/categories/headphones').then((r) => r.json()),
});
```

### Loading states

Adicionar skeletons ou spinners enquanto os dados carregam. Mínimo: um estado de loading visível e um estado de erro com mensagem.

### Integrar o checkout com a API

```tsx
const handleCheckout = async (formData: CheckoutFormData) => {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...formData,
      items: cartItems,
      total: grandTotal,
    }),
  });
  if (response.ok) {
    dispatch(clearCart());
    setShowConfirmation(true);
  }
};
```

---

## Fase 7 — Polimento e deploy

**Duração estimada: ~2 dias**

### Revisão pixel-perfect

Comparar cada página lado a lado com o Figma. Pontos de atenção frequentes:

- Espaçamentos entre secções (valores exatos do Figma)
- Tipografia: pesos, tamanhos, letter-spacing
- Imagens: usar as imagens corretas para cada breakpoint (o desafio fornece versões mobile/tablet/desktop)

### Animações e transições

Adicionar com moderação — o objetivo é polimento, não distração:

- Abertura/fecho do cart drawer (`transition-transform`)
- Fade in do modal de confirmação
- Hover states nos botões e links (já definidos no Tailwind)

### README do projeto

O README final deve incluir:

- Screenshot do projeto
- Link para o deploy e para o Storybook
- Stack tecnológica com justificação das escolhas
- Como correr o projeto localmente
- Decisões técnicas relevantes (ex: por que construir componentes do zero)

### Deploy

| Serviço                   | Para quê                     |
| ------------------------- | ---------------------------- |
| **Vercel**                | Frontend React               |
| **Railway** ou **Render** | Backend Express + PostgreSQL |

---

## Regras para não desistir

Estas regras existem porque a maioria dos projetos de portfólio morre de over-engineering, não de falta de capacidade.

**Uma fase de cada vez, sem saltar à frente.**
O backend começa apenas quando o frontend visual estiver completo. Ver o site funcionar visualmente é motivador e confirma que as decisões de design estão corretas antes de investir no backend.

**Sem over-engineering.**
Não há autenticação, testes E2E, CI/CD, Docker, ou microserviços neste projeto — nenhuma dessas coisas faz parte do desafio. Se surgir a tentação de os adicionar, adia para depois do deploy.

**Commit diário, mesmo que pequeno.**
Um commit com uma só alteração ainda é progresso. Ver o histórico a crescer é um motivador real.

**Se ficares bloqueado, reduz o scope.**
Melhor uma página pixel-perfect do que seis incompletas. O Frontend Mentor avalia a qualidade, não a quantidade.

**O Storybook é obrigatório.**
Para portfólio, ter um Storybook a correr com os componentes documentados distingue o projeto de um simples clone. Mostra processo e disciplina.

---

_Guia gerado como referência de desenvolvimento — atualizar conforme o projeto avança._
