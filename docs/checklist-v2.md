# Audiophile E-Commerce — Checklist v2

> Marca cada tarefa à medida que concluires. Uma fase de cada vez.

---

## Fase 1 — Fundação do projeto

- [ ] Criar repositório no GitHub com estrutura monorepo (`/client`, `/server`)
- [ ] Inicializar frontend com Vite + TypeScript
- [ ] Instalar e configurar Tailwind CSS
- [ ] Importar fonte Manrope via Google Fonts
- [ ] Extrair cores do Figma e definir em `tailwind.config.ts`
- [ ] Definir breakpoints (375px / 768px / 1440px)
- [ ] Instalar e inicializar Storybook
- [ ] Configurar ESLint + Prettier
- [ ] Primeiro commit com o projeto base a funcionar

---

## Fase 2 — Sistema de componentes base

### Button
- [ ] Variantes: primary, secondary, outline, link
- [ ] Estados: hover, disabled
- [ ] Story com todos os estados

### Input
- [ ] Com label e placeholder
- [ ] Estado de erro (borda + mensagem)
- [ ] Story com todos os estados

### Label
- [ ] Associado ao Input via `htmlFor`
- [ ] Estado de erro
- [ ] Story

### Radio
- [ ] Controlado com `checked` + `onChange`
- [ ] Estado checked e disabled
- [ ] Story com todos os estados

### QuantitySelector
- [ ] Controlado com `value` + `onChange`
- [ ] Respeita `min` e `max`
- [ ] `useId()` para evitar `id` duplicado
- [ ] Story com estado no mínimo

### Spinner
- [ ] `role="status"` e `aria-label`
- [ ] Story

### Skeleton
- [ ] Componente base com `animate-pulse`
- [ ] `aria-hidden` por defeito
- [ ] `motion-reduce:animate-none`
- [ ] Story

### Modal
- [ ] Baseado em Radix UI Dialog
- [ ] Focus trap e Escape funcionais
- [ ] Story com trigger e conteúdo

### Card
- [ ] Contentor com bordas e padding
- [ ] Story

---

## Fase 3 — Layout e páginas

### Setup
- [ ] Instalar React Router e definir rotas
- [ ] Configurar MSW — handlers para produtos e categorias
- [ ] Configurar MSW no Storybook (`msw-storybook-addon`)

### Layout
- [ ] Navbar — menu mobile (hambúrguer) e desktop
- [ ] Navbar — fechar menu com Escape
- [ ] Footer
- [ ] MainLayout — com `<ErrorBoundary>` a envolver o `<Outlet>`

### Páginas
- [ ] HomePage — hero, categorias, featured products, best gear
- [ ] CategoryPage — lista de produtos filtrada por categoria
- [ ] ProductPage — detalhe, galeria, sugestões
- [ ] NotFoundPage — com link para home
- [ ] ErrorPage — com `useRouteError`
- [ ] PageError — fallback do ErrorBoundary

### Responsividade
- [ ] HomePage responsiva (mobile / tablet / desktop)
- [ ] CategoryPage responsiva
- [ ] ProductPage responsiva
- [ ] Navbar responsiva

### Stories de páginas
- [ ] Stories das páginas com `route` e `routePath` nos parâmetros
- [ ] Story da CategoryPage para cada categoria
- [ ] Story da ProductPage para cada produto

---

## Fase 4 — Carrinho e checkout (cliente)

### Redux Store
- [ ] Instalar Redux Toolkit e React Redux
- [ ] Criar `store.ts`
- [ ] Criar `cartSlice` com actions: addItem, removeItem, updateQuantity, clearCart
- [ ] Criar selectors: selectSubtotal, selectShipping, selectVAT, selectGrandTotal
- [ ] Envolver app com `<Provider>`
- [ ] Persistência com localStorage

### Cart
- [ ] Botão "Add to Cart" na ProductPage liga ao Redux
- [ ] CartModal abre ao clicar no ícone da Navbar
- [ ] Lista de items com QuantitySelector por item
- [ ] Remover item individualmente
- [ ] "Remove all" limpa o carrinho
- [ ] Totais calculados corretamente
- [ ] Ícone da Navbar mostra número de items
- [ ] Modal fecha ao clicar fora

### Checkout
- [ ] Instalar react-hook-form, zod, @hookform/resolvers
- [ ] Schema Zod com todos os campos e validação condicional (e-money)
- [ ] `useCheckoutForm` hook com `mode: 'onChange'`
- [ ] Formulário com campos de billing, shipping e payment
- [ ] Campos de e-money visíveis apenas quando selecionado
- [ ] Mensagens de erro por campo com `role="alert"`
- [ ] `RequireCart` guard — redirect se carrinho vazio
- [ ] Botão submit desativado se formulário inválido ou a submeter
- [ ] Modal de confirmação após checkout

---

## Fase 5 — API com Express, Drizzle e PostgreSQL

### Setup
- [ ] Inicializar projeto Node em `/server`
- [ ] Instalar Express + TypeScript + ts-node-dev
- [ ] Instalar Drizzle ORM + pg
- [ ] Ficheiro `.env` com string de ligação à BD
- [ ] Servidor a responder em `localhost:3000`

### Base de dados
- [ ] Schema: tabelas `products`, `categories`
- [ ] Primeira migração gerada e aplicada
- [ ] Script de seed com os dados do `data.json`
- [ ] Seed executado com sucesso

### Rotas
- [ ] `GET /api/products`
- [ ] `GET /api/products/:slug`
- [ ] `GET /api/categories`
- [ ] `GET /api/categories/:slug/products`
- [ ] Tratamento de erros (404, 500) com JSON

---

## Fase 6 — Autenticação e gestão de perfil

> Referência: `guides/01-authentication.md`

### Backend
- [ ] Instalar bcrypt, jsonwebtoken, cookie-parser
- [ ] Schema: tabela `users`
- [ ] Middleware `requireAuth`
- [ ] `POST /api/auth/register`
- [ ] `POST /api/auth/login` com cookie HTTP-only
- [ ] `POST /api/auth/logout`
- [ ] `GET /api/auth/me` (protegida)
- [ ] `PATCH /api/auth/me` (protegida)
- [ ] `JWT_SECRET` no `.env`

### Frontend
- [ ] `authSlice` com setUser e clearUser
- [ ] Selectors: selectUser, selectIsAuthenticated
- [ ] Serviço RTK Query para autenticação (`credentials: 'include'`)
- [ ] `AppInitializer` — verifica sessão ao carregar
- [ ] `RequireAuth` guard com redirect e `state.from`
- [ ] LoginPage com formulário e redirect após login
- [ ] RegisterPage com formulário
- [ ] ProfilePage com formulário de edição
- [ ] Rotas /checkout, /profile, /orders protegidas com RequireAuth

---

## Fase 7 — Gestão de pedidos

> Referência: `guides/02-orders.md`

### Backend
- [ ] Schema: tabelas `orders`, `order_items` com snapshots de preço e nome
- [ ] `POST /api/orders` com transação (order + items)
- [ ] `GET /api/orders` — apenas pedidos do utilizador autenticado
- [ ] `GET /api/orders/:id` — com verificação de propriedade
- [ ] Todas as rotas protegidas com `requireAuth`

### Frontend
- [ ] Serviço RTK Query com `tagTypes: ['Order']`
- [ ] `useCreateOrderMutation` com `invalidatesTags`
- [ ] Integrar `createOrder` no `onSubmit` do checkout
- [ ] OrdersPage — lista de pedidos
- [ ] OrderDetailPage — detalhe com items e totais
- [ ] Rotas /orders e /orders/:id protegidas

---

## Fase 8 — Carrinho no backend

> Referência: `guides/03-cart-backend.md`

### Backend
- [ ] Schema: tabelas `carts`, `cart_items` com unique por (cartId, productId)
- [ ] Helper `getOrCreateCart`
- [ ] `GET /api/cart`
- [ ] `POST /api/cart/items`
- [ ] `PATCH /api/cart/items/:id`
- [ ] `DELETE /api/cart/items/:id`
- [ ] `DELETE /api/cart`
- [ ] Sincronização do carrinho local no login

### Frontend
- [ ] Serviço RTK Query para carrinho com `invalidatesTags`
- [ ] Lógica híbrida: localStorage para não autenticados, API para autenticados
- [ ] Enviar `localCart` no body do login
- [ ] Adaptar `cartSlice` para calculador de totais
- [ ] Adaptar CartModal para usar `useGetCartQuery`
- [ ] Adaptar botão "Add to Cart" para usar `useAddItemMutation`

---

## Fase 9 — Cloudinary

> Referência: `guides/04-cloudinary.md`

### Setup
- [ ] Criar conta no Cloudinary
- [ ] Instalar SDK no backend (`cloudinary`, `multer`)
- [ ] Variáveis de ambiente no servidor e no cliente

### Backend
- [ ] `cloudinary.ts` com configuração
- [ ] Middleware de upload com multer (memória)
- [ ] Helper `uploadToCloudinary`
- [ ] Schema atualizado: `imagePublicId` em vez de URLs
- [ ] Script de seed para migrar imagens existentes

### Frontend
- [ ] Helper `getCloudinaryUrl` com transformações
- [ ] `ResponsiveImage` atualizado para receber `publicId`
- [ ] `VITE_CLOUDINARY_CLOUD_NAME` no `.env`

---

## Fase 10 — Stripe

> Referência: `guides/05-stripe.md`

### Setup
- [ ] Criar conta no Stripe
- [ ] Instalar `stripe` no backend
- [ ] Instalar `@stripe/stripe-js` e `@stripe/react-stripe-js` no frontend
- [ ] Variáveis de ambiente (secret key e publishable key)
- [ ] Instalar Stripe CLI para testar webhooks localmente

### Backend
- [ ] `stripe.ts` com configuração e versão fixa da API
- [ ] `POST /api/payments/create-intent` — total calculado no servidor
- [ ] `POST /api/webhooks/stripe` — verificação de assinatura
- [ ] Webhook atualiza status do pedido ao receber `payment_intent.succeeded`
- [ ] Rota de webhook registada ANTES do `express.json()`

### Frontend
- [ ] `stripePromise` inicializado com publishable key
- [ ] Serviço RTK Query para criar Payment Intent
- [ ] `Elements` e `PaymentElement` integrados no checkout
- [ ] `stripe.confirmPayment` após `createOrder`
- [ ] Testar com cartão `4242 4242 4242 4242`
- [ ] Testar webhook com Stripe CLI

---

## Fase 11 — Integração frontend ↔ API

- [ ] Substituir `data.json` por RTK Query em todas as páginas
- [ ] Skeletons em todas as páginas durante `isLoading`
- [ ] ErrorMessage com `refetch` em todas as páginas durante `isError`
- [ ] Testar fluxo completo: login → browse → add to cart → checkout → confirmação
- [ ] Testar fluxo não autenticado → login → redirect para checkout
- [ ] Verificar persistência do carrinho entre sessões

---

## Fase 12 — Polimento e deploy

### Revisão visual
- [ ] HomePage pixel-perfect nos três breakpoints
- [ ] CategoryPage pixel-perfect nos três breakpoints
- [ ] ProductPage pixel-perfect nos três breakpoints
- [ ] CheckoutPage pixel-perfect nos três breakpoints
- [ ] Todos os hover states implementados

### Acessibilidade
- [ ] Navegação por teclado em todos os componentes interativos
- [ ] Focus visible em todos os elementos focáveis
- [ ] `aria-label` em elementos sem texto visível
- [ ] Hierarquia de headings correta em todas as páginas

### Deploy
- [ ] Frontend deployed no Vercel
- [ ] Backend deployed no Railway ou Render
- [ ] PostgreSQL configurado em produção
- [ ] Todas as variáveis de ambiente configuradas em produção
- [ ] Cloudinary a funcionar em produção
- [ ] Stripe em modo live (ou test documentado no README)
- [ ] URL de produção testada end-to-end

### Documentação
- [ ] README com screenshot ou GIF do projeto
- [ ] Link para o deploy
- [ ] Stack listada com decisões técnicas
- [ ] Instruções para correr localmente
- [ ] Submissão no Frontend Mentor

---

## Progresso geral

| Fase | Estado |
|---|---|
| Fase 1 — Fundação | ⬜ Não iniciada |
| Fase 2 — Componentes | ⬜ Não iniciada |
| Fase 3 — Páginas | ⬜ Não iniciada |
| Fase 4 — Carrinho e checkout | ⬜ Não iniciada |
| Fase 5 — API base | ⬜ Não iniciada |
| Fase 6 — Autenticação | ⬜ Não iniciada |
| Fase 7 — Pedidos | ⬜ Não iniciada |
| Fase 8 — Carrinho no backend | ⬜ Não iniciada |
| Fase 9 — Cloudinary | ⬜ Não iniciada |
| Fase 10 — Stripe | ⬜ Não iniciada |
| Fase 11 — Integração | ⬜ Não iniciada |
| Fase 12 — Polimento e deploy | ⬜ Não iniciada |

> ⬜ Não iniciada → 🟡 Em progresso → ✅ Concluída
