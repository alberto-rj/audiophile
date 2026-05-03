# Guia de Integração com Stripe

---

## Índice

1. [O que é o Stripe e porquê usá-lo](#1-o-que-é-o-stripe-e-porquê-usá-lo)
2. [Conceitos fundamentais](#2-conceitos-fundamentais)
3. [Setup e configuração](#3-setup-e-configuração)
4. [Fluxo de pagamento — Payment Intent](#4-fluxo-de-pagamento--payment-intent)
5. [Implementação backend](#5-implementação-backend)
6. [Implementação frontend](#6-implementação-frontend)
7. [Testar pagamentos](#7-testar-pagamentos)
8. [Webhooks — confirmar pagamento no servidor](#8-webhooks--confirmar-pagamento-no-servidor)
9. [Fluxo completo](#9-fluxo-completo)

---

## 1. O que é o Stripe e porquê usá-lo

O Stripe é uma plataforma de pagamentos que permite aceitar cartões de crédito e outros métodos de pagamento numa aplicação web. É o standard da indústria para projetos de e-commerce.

**Porquê o Stripe e não implementar diretamente?**

Processar pagamentos diretamente implica lidar com dados de cartões de crédito — o que requer certificação PCI DSS (norma de segurança da indústria de pagamentos), muito complexa e cara. O Stripe elimina este problema: os dados do cartão nunca passam pelo teu servidor — são enviados diretamente para os servidores do Stripe pelo browser do utilizador.

**Para o portfólio:**
Integrar o Stripe mostra capacidade de trabalhar com APIs de terceiros complexas e lidar com fluxos assíncronos (o pagamento pode ser confirmado segundos depois da submissão). É uma competência muito valorizada.

---

## 2. Conceitos fundamentais

### Payment Intent

Um `PaymentIntent` é o objeto central do Stripe. Representa uma intenção de pagamento — é criado no servidor, enviado ao cliente, e o cliente usa-o para confirmar o pagamento.

**Porquê criar no servidor?**
O valor do pagamento é definido no servidor — se fosse no cliente, um utilizador poderia manipular o valor. O servidor cria o `PaymentIntent` com o valor correto calculado a partir do carrinho.

### Client Secret

Quando o servidor cria um `PaymentIntent`, o Stripe devolve um `client_secret` — uma chave temporária que o frontend usa para confirmar o pagamento. Não é um segredo permanente — expira após o pagamento ou após um período.

### Publishable Key vs Secret Key

| Chave | Onde usar | Porquê |
|---|---|---|
| `STRIPE_PUBLISHABLE_KEY` | Frontend | Identifica a tua conta no Stripe — pode ser pública |
| `STRIPE_SECRET_KEY` | Backend apenas | Permite criar pagamentos — nunca expor no frontend |

---

## 3. Setup e configuração

### Criar conta

1. Criar conta em [stripe.com](https://stripe.com)
2. No dashboard, ir a **Developers → API Keys**
3. Anotar a **Publishable key** e a **Secret key** (usar as chaves de **test** durante o desenvolvimento)

### Instalar dependências

```bash
# Backend
cd server
npm install stripe

# Frontend
cd client
npm install @stripe/stripe-js @stripe/react-stripe-js
```

### Variáveis de ambiente

```env
# server/.env
STRIPE_SECRET_KEY=sk_test_...

# client/.env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## 4. Fluxo de pagamento — Payment Intent

O Stripe recomenda o padrão **Payment Intent** para pagamentos simples com cartão:

```
1. Utilizador confirma o carrinho e clica "Continue & Pay"
2. Frontend pede ao backend para criar um PaymentIntent
3. Backend calcula o total, cria o PaymentIntent no Stripe, devolve o client_secret
4. Frontend usa o client_secret para mostrar o formulário de cartão (Stripe Elements)
5. Utilizador preenche os dados do cartão e confirma
6. Stripe processa o pagamento e notifica o servidor via webhook
7. Servidor recebe o webhook, confirma o pedido, e atualiza o status
```

Este fluxo garante que:
- O valor é sempre calculado no servidor (não manipulável)
- Os dados do cartão nunca passam pelo servidor (segurança PCI)
- O pagamento é confirmado de forma assíncrona (fiável)

---

## 5. Implementação backend

### Configurar Stripe

```ts
// server/src/libs/stripe.ts
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',  // usar sempre uma versão fixa
})
```

### Rota para criar Payment Intent

```ts
// server/src/routes/payments.ts
import { Router } from 'express'
import { stripe } from '../libs/stripe'
import { requireAuth } from '../middleware/auth'
import { db } from '../db'
import { carts, cartItems, products } from '../db/schema'
import { eq } from 'drizzle-orm'

const router = Router()
router.use(requireAuth)

// POST /api/payments/create-intent
// Cria um PaymentIntent com o valor do carrinho atual
router.post('/create-intent', async (req, res) => {
  // Calcular o total a partir do carrinho no servidor
  // NUNCA aceitar o total do frontend — pode ser manipulado
  const cart = await getOrCreateCart(req.user!.id)

  const items = await db
    .select({ price: products.price, quantity: cartItems.quantity })
    .from(cartItems)
    .innerJoin(products, eq(cartItems.productId, products.id))
    .where(eq(cartItems.cartId, cart.id))

  if (items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' })
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 50
  const vat = Math.round(subtotal * 0.2)
  const total = subtotal + shipping + vat

  // Stripe trabalha em centavos (inteiros) — multiplicar por 100
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total * 100,  // ex: $54.46 → 5446 centavos
    currency: 'usd',
    metadata: {
      userId: req.user!.id.toString(),
      cartId: cart.id.toString(),
    },
  })

  res.json({
    clientSecret: paymentIntent.client_secret,
    total,
  })
})

export default router
```

```ts
// server/src/index.ts
import paymentsRouter from './routes/payments'
app.use('/api/payments', paymentsRouter)
```

---

## 6. Implementação frontend

### Inicializar o Stripe

```ts
// src/libs/stripe.ts
import { loadStripe } from '@stripe/stripe-js'

// loadStripe é assíncrono — carrega o SDK do Stripe de forma lazy
// O SDK do Stripe é pesado — não deve ser carregado antes de ser necessário
export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
```

### Serviço RTK Query para pagamentos

```ts
// src/app/services/payments.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface CreateIntentResponse {
  clientSecret: string
  total: number
}

export const paymentsApi = createApi({
  reducerPath: 'paymentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/payments',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    createIntent: builder.mutation<CreateIntentResponse, void>({
      query: () => ({ url: '/create-intent', method: 'POST' }),
    }),
  }),
})

export const { useCreateIntentMutation } = paymentsApi
```

### Página de checkout com Stripe Elements

O Stripe Elements é um conjunto de componentes de formulário pré-construídos que gerem os dados do cartão de forma segura:

```tsx
// src/pages/checkout/checkout-page.tsx
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from '@/libs/stripe'
import { useCreateIntentMutation } from '@/app/services/payments'
import { useState, useEffect } from 'react'

const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [createIntent] = useCreateIntentMutation()

  // Criar o PaymentIntent quando a página carrega
  useEffect(() => {
    createIntent()
      .unwrap()
      .then(({ clientSecret }) => setClientSecret(clientSecret))
      .catch(console.error)
  }, [])

  if (!clientSecret) return <Spinner label="Preparing payment..." />

  return (
    // Elements fornece contexto do Stripe a todos os componentes filhos
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  )
}
```

### Formulário de checkout com confirmação de pagamento

```tsx
// src/pages/checkout/checkout-form.tsx
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { useCreateOrderMutation } from '@/app/services/orders'
import { useDispatch } from 'react-redux'
import { clearCart } from '@/app/features/cart'

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [createOrder] = useCreateOrderMutation()
  const dispatch = useDispatch()

  const onSubmit = async (formData: CheckoutFormData) => {
    if (!stripe || !elements) return

    // 1. Criar o pedido na base de dados (status: pending)
    const orderResult = await createOrder({
      ...formData,
      items: cartItems,
      subtotal, shipping, vat, total,
    }).unwrap()

    // 2. Confirmar o pagamento com o Stripe
    // O Stripe envia os dados do cartão diretamente para os seus servidores
    // O teu servidor nunca vê os dados do cartão
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/orders/${orderResult.order.id}`,
        // return_url é para onde o Stripe redireciona após o pagamento
        // necessário para métodos que redirecionam (ex: iDEAL, Bancontact)
      },
      redirect: 'if_required',
      // 'if_required' — só redireciona se o método de pagamento precisar
      // Para cartões normais, fica na mesma página
    })

    if (error) {
      // Erro de pagamento — mostrar ao utilizador
      // Ex: "Your card was declined", "Insufficient funds"
      console.error(error.message)
      return
    }

    // Pagamento bem-sucedido (para cartões sem redirect)
    dispatch(clearCart())
    // O webhook confirma o pedido no servidor — ver secção 8
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Campos de morada e faturação — react-hook-form */}
      {/* ... */}

      {/* Formulário de cartão — Stripe Elements */}
      {/* Os dados do cartão são geridos pelo Stripe, não pelo teu código */}
      <PaymentElement />

      <button type="submit" disabled={!stripe}>
        Pay now
      </button>
    </form>
  )
}
```

**Porquê `PaymentElement` em vez de campos manuais?**
O `PaymentElement` é um componente do Stripe que renderiza o formulário de cartão dentro de um iframe — os dados do cartão são enviados diretamente para os servidores do Stripe sem nunca passarem pelo teu servidor ou código JavaScript. É o que garante a conformidade PCI.

---

## 7. Testar pagamentos

O Stripe fornece cartões de teste para simular diferentes cenários:

| Número do cartão | Resultado |
|---|---|
| `4242 4242 4242 4242` | Pagamento bem-sucedido |
| `4000 0000 0000 0002` | Cartão recusado |
| `4000 0025 0000 3155` | Requer autenticação 3D Secure |
| `4000 0000 0000 9995` | Fundos insuficientes |

Para todos os cartões de teste:
- **Data de validade:** qualquer data futura (ex: `12/34`)
- **CVC:** qualquer 3 dígitos (ex: `123`)
- **ZIP:** qualquer 5 dígitos (ex: `12345`)

---

## 8. Webhooks — confirmar pagamento no servidor

O `stripe.confirmPayment` no frontend não é suficiente para confirmar o pagamento no servidor — pode falhar a conexão depois de o pagamento ser processado. Os webhooks resolvem isso: o Stripe notifica o servidor diretamente quando um pagamento é confirmado.

```ts
// server/src/routes/webhooks.ts
import { Router } from 'express'
import { stripe } from '../libs/stripe'
import { db } from '../db'
import { orders } from '../db/schema'
import { eq } from 'drizzle-orm'

const router = Router()

// O webhook precisa do body em formato raw (Buffer), não JSON
// Por isso é registado ANTES do express.json() middleware
router.post(
  '/stripe',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const signature = req.headers['stripe-signature'] as string

    let event

    try {
      // Verificar que o webhook vem mesmo do Stripe
      // Sem esta verificação, qualquer um poderia enviar webhooks falsos
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!,
      )
    } catch (err) {
      return res.status(400).json({ error: 'Invalid webhook signature' })
    }

    // Processar o evento
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object

      // O metadata que definiste ao criar o PaymentIntent
      const { userId, cartId } = paymentIntent.metadata

      // Atualizar o status do pedido para 'processing'
      // O pedido foi criado com status 'pending' no onSubmit
      await db
        .update(orders)
        .set({ status: 'processing' })
        .where(eq(orders.userId, parseInt(userId)))
        // Em produção: associar pelo paymentIntentId guardado no pedido

      // Limpar o carrinho no servidor
      await db.delete(cartItems).where(eq(cartItems.cartId, parseInt(cartId)))
    }

    // Responder 200 imediatamente — o Stripe retenta se não receber resposta
    res.json({ received: true })
  }
)

export default router
```

```ts
// server/src/index.ts — ANTES do express.json()
import webhooksRouter from './routes/webhooks'
app.use('/api/webhooks', webhooksRouter)

// Depois o json middleware para as outras rotas
app.use(express.json())
```

### Testar webhooks localmente

O Stripe CLI permite reencaminhar webhooks do Stripe para o teu servidor local:

```bash
# Instalar Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Reencaminhar webhooks para o servidor local
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# O comando imprime o STRIPE_WEBHOOK_SECRET para usar no .env
```

```env
# server/.env
STRIPE_WEBHOOK_SECRET=whsec_...  # copiado do output do stripe listen
```

---

## 9. Fluxo completo

```
Utilizador acede ao checkout
  → POST /api/payments/create-intent
  → Servidor calcula total a partir do carrinho (nunca do frontend)
  → Stripe cria PaymentIntent → devolve client_secret
  → Frontend inicializa Elements com client_secret

Utilizador preenche formulário e clica "Pay now"
  → createOrder → pedido criado com status 'pending'
  → stripe.confirmPayment → Stripe processa o cartão
  → Dados do cartão nunca passam pelo servidor

Stripe confirma o pagamento
  → Webhook POST /api/webhooks/stripe
  → stripe.webhooks.constructEvent verifica assinatura
  → event.type === 'payment_intent.succeeded'
  → Pedido atualizado para status 'processing'
  → Carrinho limpo no servidor

Frontend (para cartões sem redirect)
  → clearCart no Redux
  → Navega para /orders/:id
```
