# Audiophile E-Commerce — Checklist de Progresso

> Marca cada tarefa à medida que concluires. Uma fase de cada vez.

---

## Fase 1 — Fundação do projecto

> Objectivo: projecto a correr no browser com as cores e fonte corretas.

- [x] Criar repositório no GitHub
- [x] Criar estrutura de pastas (`/frontend` e `/backend` na raiz)
- [x] Inicializar o frontend com Vite + TypeScript
- [x] Instalar e configurar Tailwind CSS
- [x] Importar a fonte Manrope via Google Fonts
- [x] Extrair tokens do design no Figma e definir em `src/index.css`
- [x] Instalar e inicializar o Storybook
- [x] Configurar ESLint + Prettier
- [x] Primeiro commit com o projecto base a funcionar

---

## Fase 2 — Sistema de componentes base

> Objectivo: biblioteca de componentes atómicos documentados no Storybook.

### Button

- [x] Variantes `primary`, `outline`, `link`
- [x] Estados `hover` implementado
- [x] Estado `focus` implementado
- [x] Estado `disabled` implementado
- [x] Stories no Storybook com todos os estados

### Input

- [x] Estado `focus` implementado
- [x] Estado `disabled` implementado
- [x] Estado `invalid` implementado
- [x] Stories no Storybook com todos os estados

### Radio

- [x] Estado `checked` implementado
- [x] Estado `focus` implementado
- [x] Estado `disabled` implementado
- [x] Stories no Storybook com todos os estados

### QuantitySelector

- [x] Botões `-` e `+` funcionais
- [x] Estado `focus` implementado
- [x] Estado `disabled` implementado
- [x] Não permite valores abaixo do mínimo (1, por padrão)
- [x] Não permite valores acima do máximo (se fornecido)
- [x] Stories no Storybook

### ProductCard

- [x] Imagem, badge "NEW PRODUCT" (opcional), nome, descrição, preço
- [x] Botão de ação incluído
- [x] Stories no Storybook

### CategoryCard

- [x] Card com imagem, nome da categoria e link
- [x] Funciona para as três categorias (Headphones, Speakers, Earphones)
- [x] Stories no Storybook

---

## Fase 3 — Layout e páginas

> Objectivo: site navegável completo com dados do `data.json`, responsivo nos três breakpoints.

### Setup

- [x] Instalar React Router (`npm install react-router-dom`)
- [x] Definir as quatro rotas (`/`, `/category/:name`, `/product/:slug`, `/checkout`)
- [x] Importar e tipar o `data.json`

### Navbar

- [x] Logo + links de navegação
- [x] Ícone do carrinho (apenas visual por agora)
- [x] Responsiva (hambúrguer no mobile)
- [x] Stories no Storybook

### Footer

- [x] Links de navegação
- [x] Texto de copyright
- [x] Responsivo
- [x] Stories no Storybook

### Página Home

- [x] Secção Hero com CTA
- [x] Grid das três categorias
- [x] Featured product (XX99 Mark II)
- [x] Dois produtos secundários em destaque
- [x] Secção "Best Gear"
- [x] Responsiva (mobile / tablet / desktop)

### Página Category

- [ ] Título da categoria no topo
- [ ] Lista de produtos filtrada por categoria
- [x] Alternância de imagem à esquerda/direita
- [x] Links para as outras categorias no fundo
- [x] Responsiva (mobile / tablet / desktop)

### Página Product Detail

- [ ] Botão "Go Back"
- [x] Imagem principal + nome, descrição, preço
- [x] QuantitySelector + botão "Add to Cart"
- [x] Secção Features
- [x] Secção "In the Box"
- [x] Galeria de três imagens
- [x] Secção "You May Also Like"
- [x] Responsiva (mobile / tablet / desktop)

---

## Fase 4 — Carrinho e checkout com Redux

> Objectivo: carrinho funcional com persistência, checkout com validação, modal de confirmação.

### Redux Store

- [x] Instalar Redux Toolkit e React Redux
- [x] Criar a `store.ts`
- [x] Criar o `cartSlice` com as actions: `addItem`, `removeItem`, `updateQuantity`, `clearCart`
- [x] Criar selectors: `selectSubtotal`, `selectShipping`, `selectVAT`, `selectGrandTotal`
- [x] Envolver a app com o `<Provider>`

### Cart

- [x] Botão "Add to Cart" na página de produto liga ao Redux
- [ ] Cart drawer/modal abre ao clicar no ícone do carrinho na Navbar
- [ ] Lista de items no carrinho com quantidade editável
- [ ] Botão para remover item
- [ ] Totais calculados corretamente (subtotal, envio $50, IVA 20%)
- [ ] Botão "Remove all" limpa o carrinho
- [x] Ícone do carrinho mostra o número de items
- [x] Carrinho fecha ao clicar fora

### Persistência

- [ ] Estado do carrinho persiste após atualizar o browser (localStorage)

### Página Checkout

- [ ] Instalar `react-hook-form`, `zod` e `@hookform/resolvers`
- [ ] Schema Zod com todos os campos validados
- [x] Campos de billing details (nome, email, telefone)
- [x] Campos de shipping info (endereço, CEP, cidade, país)
- [x] Opção de pagamento: e-money ou cash
- [x] Campos de e-money (número + PIN) visíveis apenas quando selecionado
- [ ] Mensagens de erro por campo
- [x] Resumo do pedido visível na sidebar
- [x] Totais corretos no resumo (subtotal, envio, IVA, grand total)

### Modal de confirmação

- [ ] Modal abre após submissão bem-sucedida
- [ ] Mostra resumo do pedido (primeiro item + "and X other items")
- [ ] Mostra o grand total
- [ ] Botão "Back to Home" redireciona e limpa o carrinho

---

## Fase 5 — API com Express, Drizzle e PostgreSQL

> Objectivo: API REST funcional com dados reais na base de dados.

### Setup do servidor

- [ ] Inicializar projecto Node na pasta `/server`
- [ ] Instalar Express + TypeScript + ts-node-dev
- [ ] Instalar Drizzle ORM + `pg`
- [ ] Ficheiro `.env` com a string de ligação à base de dados
- [ ] Servidor a responder em `localhost:3000`

### Base de dados

- [ ] Schema Drizzle criado (tabelas: `products`, `categories`, `orders`, `order_items`)
- [ ] Primeira migração gerada e aplicada
- [ ] Script de seed criado (migra o `data.json` para a BD)
- [ ] Seed executado com sucesso — dados na base de dados

### Rotas

- [ ] `GET /api/products` — lista todos os produtos
- [ ] `GET /api/products/:slug` — produto por slug
- [ ] `GET /api/categories/:name` — produtos por categoria
- [ ] `POST /api/orders` — cria novo pedido e salva os items
- [ ] Tratamento de erros (404, 500) com respostas JSON

---

## Fase 6 — Integração frontend ↔ API

> Objectivo: frontend a consumir dados reais da API.

- [ ] Configurar proxy no Vite para `/api` apontar para `localhost:3000`
- [ ] Substituir import do `data.json` por chamadas à API (React Query ou fetch)
- [ ] Página Home carrega dados da API
- [ ] Página Category carrega dados da API
- [ ] Página Product Detail carrega dados da API
- [ ] Loading states visíveis durante os fetches (skeleton ou spinner)
- [ ] Estado de erro com mensagem ao utilizador
- [ ] Checkout submete pedido via `POST /api/orders`
- [ ] Modal de confirmação aparece após resposta 200 da API

---

## Fase 7 — Polimento e deploy

> Objectivo: projecto finalizado, deployed e pronto para portfólio.

### Revisão visual

- [ ] Comparar Home com o Figma nos três breakpoints
- [ ] Comparar Category com o Figma nos três breakpoints
- [ ] Comparar Product Detail com o Figma nos três breakpoints
- [ ] Comparar Checkout com o Figma nos três breakpoints
- [ ] Todos os hover states implementados
- [ ] Imagens corretas para cada breakpoint (mobile/tablet/desktop)

### Animações

- [ ] Transição de abertura/fecho do carrinho
- [ ] Fade in do modal de confirmação
- [ ] Transições de hover nos botões e links

### Storybook

- [ ] Todas as stories actualizadas e sem erros
- [ ] Storybook faz build sem erros (`npm run build-storybook`)

### Deploy

- [ ] Frontend deployed no Vercel
- [ ] Backend deployed no Railway ou Render
- [ ] Variáveis de ambiente configuradas em produção
- [ ] URL de produção testada — tudo funciona

### README final

- [ ] Screenshot ou GIF do projecto
- [ ] Link para o deploy
- [ ] Link para o Storybook
- [ ] Stack tecnológica listada com justificação das escolhas
- [ ] Instruções para correr localmente
- [ ] Submissão no Frontend Mentor

---

## Progresso geral

| Fase                         | Estado          |
| ---------------------------- | --------------- |
| Fase 1 — Fundação            | ✅ Concluída    |
| Fase 2 — Componentes         | ✅ Concluída    |
| Fase 3 — Páginas             | 🟡 Em progresso |
| Fase 4 — Carrinho e checkout | ⬜ Não iniciada |
| Fase 5 — API                 | ⬜ Não iniciada |
| Fase 6 — Integração          | ⬜ Não iniciada |
| Fase 7 — Polimento e deploy  | ⬜ Não iniciada |

> Actualiza esta tabela manualmente à medida que concluíres cada fase:
> ⬜ Não iniciada → 🟡 Em progresso → ✅ Concluída
