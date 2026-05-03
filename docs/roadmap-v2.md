# Audiophile E-Commerce — Roadmap v2

> Versão atualizada do roadmap com as novas features: autenticação, gestão de pedidos, carrinho no backend, Cloudinary e Stripe.

---

## Índice

1. [Stack completa](#1-stack-completa)
2. [Fase 1 — Fundação do projeto](#fase-1--fundação-do-projeto)
3. [Fase 2 — Sistema de componentes base](#fase-2--sistema-de-componentes-base)
4. [Fase 3 — Layout e páginas](#fase-3--layout-e-páginas)
5. [Fase 4 — Carrinho e checkout (cliente)](#fase-4--carrinho-e-checkout-cliente)
6. [Fase 5 — API com Express, Drizzle e PostgreSQL](#fase-5--api-com-express-drizzle-e-postgresql)
7. [Fase 6 — Autenticação e gestão de perfil](#fase-6--autenticação-e-gestão-de-perfil)
8. [Fase 7 — Gestão de pedidos](#fase-7--gestão-de-pedidos)
9. [Fase 8 — Carrinho no backend](#fase-8--carrinho-no-backend)
10. [Fase 9 — Cloudinary](#fase-9--cloudinary)
11. [Fase 10 — Stripe](#fase-10--stripe)
12. [Fase 11 — Integração frontend ↔ API](#fase-11--integração-frontend--api)
13. [Fase 12 — Polimento e deploy](#fase-12--polimento-e-deploy)
14. [Regras para não desistir](#regras-para-não-desistir)

---

## 1. Stack completa

| Camada | Tecnologia |
|---|---|
| Frontend | React, TypeScript, Redux Toolkit, RTK Query, Tailwind CSS |
| Formulários | react-hook-form, Zod |
| Documentação | Storybook |
| Mock API | MSW (Mock Service Worker) |
| Roteamento | React Router |
| Backend | Express, TypeScript |
| ORM | Drizzle ORM |
| Base de dados | PostgreSQL |
| Autenticação | JWT, bcrypt, cookie HTTP-only |
| Imagens | Cloudinary |
| Pagamentos | Stripe |
| Deploy | Vercel (frontend), Railway ou Render (backend + BD) |

---

## Fase 1 — Fundação do projeto

> Objetivo: projeto a correr no browser com as cores e fonte corretas do design.

**Setup inicial**
- Criar repositório no GitHub com estrutura monorepo (`/client`, `/server`)
- Inicializar o frontend com Vite + TypeScript
- Instalar e configurar Tailwind CSS
- Extrair design tokens do Figma e configurar `tailwind.config.ts`
- Instalar e inicializar Storybook
- Configurar ESLint + Prettier

**Entregável:** browser mostra a fonte e cores corretas. Storybook abre em `localhost:6006`.

---

## Fase 2 — Sistema de componentes base

> Objetivo: biblioteca de componentes atómicos documentados no Storybook.

**Componentes `ui` (cada um com story)**
- Button — variantes primary, secondary, outline, link
- Input — com estado de erro
- Label — associado ao Input
- Radio — com estado checked e disabled
- QuantitySelector — controlado, com min/max
- Spinner — com `role="status"`
- Skeleton — componente base reutilizável
- Modal — com Radix UI Dialog
- Card — contentor com bordas e padding

**Entregável:** todos os componentes documentados no Storybook com todos os estados.

---

## Fase 3 — Layout e páginas

> Objetivo: site navegável com dados estáticos do `data.json`, responsivo nos três breakpoints.

**Setup**
- Instalar React Router e definir rotas
- Configurar MSW para mock da API

**Componentes de layout**
- Navbar — com menu mobile e desktop
- Footer
- MainLayout — com ErrorBoundary

**Páginas (com dados do `data.json`)**
- HomePage — hero, categorias, featured products, best gear
- CategoryPage — lista de produtos por categoria
- ProductPage — detalhe do produto, galeria, sugestões
- NotFoundPage
- ErrorPage

**Entregável:** todas as páginas navegáveis e responsivas.

---

## Fase 4 — Carrinho e checkout (cliente)

> Objetivo: carrinho funcional com Redux, checkout com validação, modal de confirmação.

**Redux**
- Configurar store com Redux Toolkit
- Criar `cartSlice` com actions: addItem, removeItem, updateQuantity, clearCart
- Criar selectors: selectSubtotal, selectShipping, selectVAT, selectGrandTotal
- Persistência com localStorage (provisória — substituída na Fase 8)

**Cart**
- CartModal com lista de items e totais
- Sincronização do ícone da Navbar com o número de items

**Checkout**
- Formulário com react-hook-form + Zod
- Validação condicional (campos e-money vs cash)
- `RequireCart` guard — redirect se carrinho vazio
- Modal de confirmação de pedido

**Entregável:** fluxo completo de adicionar produto → checkout → confirmação.

---

## Fase 5 — API com Express, Drizzle e PostgreSQL

> Objetivo: API REST com dados reais na base de dados.

**Setup do servidor**
- Inicializar Express + TypeScript
- Configurar Drizzle ORM + PostgreSQL
- Schema inicial: products, categories

**Rotas de produtos**
- `GET /api/products`
- `GET /api/products/:slug`
- `GET /api/categories`
- `GET /api/categories/:slug/products`

**Seed**
- Script que migra o `data.json` para a base de dados

**Entregável:** API a responder em `localhost:3000/api` com dados reais.

---

## Fase 6 — Autenticação e gestão de perfil

> Guia detalhado: `guides/01-authentication.md`

**Backend**
- Schema: tabela `users`
- Middleware `requireAuth` com JWT
- Rotas: register, login, logout, GET /me, PATCH /me
- Instalar bcrypt, jsonwebtoken, cookie-parser

**Frontend**
- `authSlice` — estado do utilizador autenticado
- Serviço RTK Query para autenticação
- `AppInitializer` — verifica sessão ao carregar a app
- `RequireAuth` guard — redireciona para /login se não autenticado
- Páginas: LoginPage, RegisterPage, ProfilePage
- Redirecionar para a rota de origem após login

**Entregável:** registo, login, logout e perfil funcionais. Rotas protegidas redirecionam para /login.

---

## Fase 7 — Gestão de pedidos

> Guia detalhado: `guides/02-orders.md`

**Backend**
- Schema: tabelas `orders`, `order_items`
- Transação ao criar pedido (order + items numa operação atómica)
- Snapshot de nome e preço dos produtos no momento do pedido
- Rotas: POST /orders, GET /orders, GET /orders/:id
- Verificação de propriedade — utilizador só vê os seus pedidos

**Frontend**
- Serviço RTK Query para pedidos com `tagTypes` para invalidação de cache
- Integração no checkout — `createOrder` antes de confirmar pagamento
- Páginas: OrdersPage (lista), OrderDetailPage
- Rota `/orders` protegida com `RequireAuth`

**Entregável:** pedidos criados no checkout, histórico acessível em /orders.

---

## Fase 8 — Carrinho no backend

> Guia detalhado: `guides/03-cart-backend.md`

**Backend**
- Schema: tabelas `carts`, `cart_items`
- Helper `getOrCreateCart` — cria carrinho na primeira utilização
- Rotas: GET, POST /items, PATCH /items/:id, DELETE /items/:id, DELETE /
- Sincronização no login — funde carrinho local com carrinho do servidor

**Frontend**
- Serviço RTK Query para carrinho com invalidação automática
- Adaptar `cartSlice` — passa a ser calculador de totais, não storage
- Lógica híbrida: localStorage para não autenticados, API para autenticados
- Enviar carrinho local no body do login para sincronização

**Entregável:** carrinho persiste entre sessões e dispositivos para utilizadores autenticados.

---

## Fase 9 — Cloudinary

> Guia detalhado: `guides/04-cloudinary.md`

**Setup**
- Criar conta no Cloudinary
- Instalar SDK no backend (`cloudinary`)
- Configurar variáveis de ambiente

**Backend**
- Middleware de upload com `multer` (memória, não disco)
- Helper `uploadToCloudinary` — envia buffer para a CDN
- Atualizar schema: substituir URLs de imagem por `imagePublicId`
- Script de seed para migrar imagens existentes para o Cloudinary

**Frontend**
- Helper `getCloudinaryUrl` — constrói URLs com transformações
- Adaptar `ResponsiveImage` — recebe `publicId` em vez de `{ mobile, tablet, desktop }`
- Variável `VITE_CLOUDINARY_CLOUD_NAME`

**Entregável:** imagens servidas pelo Cloudinary, redimensionadas automaticamente por breakpoint.

---

## Fase 10 — Stripe

> Guia detalhado: `guides/05-stripe.md`

**Setup**
- Criar conta no Stripe
- Instalar `stripe` no backend, `@stripe/stripe-js` e `@stripe/react-stripe-js` no frontend
- Configurar variáveis de ambiente (publishable key e secret key)

**Backend**
- Helper `stripe` configurado com a secret key e versão fixa da API
- Rota `POST /api/payments/create-intent` — cria PaymentIntent com total calculado no servidor
- Rota de webhook `POST /api/webhooks/stripe` — confirma pagamento e atualiza pedido
- Verificação de assinatura do webhook com `stripe.webhooks.constructEvent`

**Frontend**
- Inicializar `stripePromise` com a publishable key
- Serviço RTK Query para criar Payment Intent
- Integrar `Elements` e `PaymentElement` na página de checkout
- `stripe.confirmPayment` após criar o pedido

**Testes**
- Testar com cartões de teste do Stripe
- Configurar Stripe CLI para testar webhooks localmente

**Entregável:** pagamento com cartão funcional em modo de teste.

---

## Fase 11 — Integração frontend ↔ API

> Objetivo: substituir todos os dados estáticos por chamadas reais à API.

- Substituir `data.json` por RTK Query em todas as páginas
- Loading states com skeletons em todas as páginas
- Error states com `ErrorMessage` e `refetch`
- Integrar checkout com `createOrder` + `stripe.confirmPayment`
- Verificar fluxo completo: login → browse → add to cart → checkout → confirmação

**Entregável:** aplicação completamente funcional end-to-end.

---

## Fase 12 — Polimento e deploy

> Objetivo: projeto finalizado, deployed e pronto para portfólio.

**Revisão visual**
- Comparar cada página com o Figma nos três breakpoints
- Hover states em todos os elementos interativos
- Animações e transições subtis

**Acessibilidade**
- Navegação por teclado em todos os componentes
- `aria-label` em elementos sem texto visível
- Hierarquia de headings correta

**Deploy**
- Frontend: Vercel
- Backend + PostgreSQL: Railway ou Render
- Variáveis de ambiente em produção
- Testar URL de produção

**Documentação**
- README com screenshot, links, stack e como correr localmente
- Storybook deployed (Chromatic ou Vercel)
- Submissão no Frontend Mentor

---

## Regras para não desistir

**Uma fase de cada vez.** O backend começa após o frontend visual estar completo. Stripe e Cloudinary entram apenas após a autenticação e pedidos estarem funcionais.

**Sem features fora do scope.** Não há emails transacionais, notificações push, painel de admin elaborado, ou testes E2E — não fazem parte dos objetivos.

**Commit diário.** Mesmo que pequeno. Ver o histórico a crescer é motivador.

**Se bloqueares, reduz o scope.** Um fluxo completo e funcional vale mais do que dez features pela metade.
