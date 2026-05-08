Boa abordagem — definir o visual antes de implementar evita retrabalho. Vou mostrar sugestões visuais para cada caso.A ferramenta de visualização não está a responder. Vou descrever as sugestões de forma detalhada em texto — é mais prático para implementar de qualquer forma.

---

## Navbar — CTAs e Dropdown

### Utilizador não autenticado

A Navbar já tem o ícone do carrinho à direita. Adiciona dois botões antes dele:

```tsx
// Não autenticado — dois CTAs simples
<div className={cn('hidden', 'lg:flex', 'items-center', 'gap-4')}>
  <Button
    variant='link'
    asChild
  >
    <Link to='/login'>Sign in</Link>
  </Button>
  <Button
    variant='primary'
    asChild
  >
    <Link to='/register'>Sign up</Link>
  </Button>
</div>
```

Em mobile, os dois CTAs aparecem dentro do menu hambúrguer, como itens da lista — abaixo dos links de navegação, separados por um `<hr>`.

### Utilizador autenticado — Dropdown

O trigger do dropdown mostra as iniciais do utilizador num círculo — é o padrão mais comum, não requer imagem de avatar, e é imediatamente reconhecível:

```tsx
// Trigger com avatar de iniciais
<DropdownMenu>
  <DropdownMenu.Trigger asChild>
    <button
      aria-label={`Account menu for ${user.name}`}
      className={cn(
        'size-9',
        'rounded-full',
        'bg-primary-400',
        'text-white',
        'text-xs',
        'font-bold',
        'uppercase',
        'flex',
        'items-center',
        'justify-center',
        'cursor-pointer',
      )}
    >
      {/* Iniciais — primeiro e último nome */}
      {user.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')}
    </button>
  </DropdownMenu.Trigger>

  <DropdownMenu.Portal>
    <DropdownMenu.Content align='end'>
      {/* Cabeçalho com nome e email — não clicável */}
      <div className={cn('px-4', 'py-3', 'border-b', 'border-gray-200')}>
        <p className={cn('text-sm', 'font-bold', 'text-black')}>{user.name}</p>
        <p className={cn('text-xs', 'text-black/50', 'truncate')}>
          {user.email}
        </p>
      </div>

      <DropdownMenu.Item onSelect={() => navigate('/profile')}>
        My Profile
      </DropdownMenu.Item>
      <DropdownMenu.Item onSelect={() => navigate('/orders')}>
        My Orders
      </DropdownMenu.Item>

      <DropdownMenu.Separator />

      <DropdownMenu.Item
        onSelect={handleLogout}
        className={cn('text-danger-400')} // vermelho para acção destrutiva
      >
        Sign out
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu>
```

---

## Profile Page

Divide em duas secções numa página simples. Não precisa de ser elaborada — clareza é suficiente:

**Secção 1 — Personal Information**

- Campo Nome (pré-preenchido)
- Campo Email (pré-preenchido)
- Botão "Save changes" — desactivado se nada mudou

**Secção 2 — Change Password** (separada para não misturar com os dados pessoais)

- Campo "Current password"
- Campo "New password"
- Campo "Confirm new password"
- Botão "Update password"

Layout sugerido — usa o `Card` que já tens:

```
┌─────────────────────────────────────────┐
│  ← Back                                 │
│                                         │
│  My Profile                             │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  Personal Information           │    │
│  │                                 │    │
│  │  Name        [John Doe        ] │    │
│  │  Email       [john@example.com] │    │
│  │                                 │    │
│  │              [Save changes    ] │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  Change Password                │    │
│  │                                 │    │
│  │  Current     [••••••••        ] │    │
│  │  New         [••••••••        ] │    │
│  │  Confirm     [••••••••        ] │    │
│  │                                 │    │
│  │              [Update password ] │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

---

## Orders Page

Lista simples de pedidos. Cada item mostra o essencial — o utilizador decide se quer ver o detalhe:

```
┌─────────────────────────────────────────┐
│  My Orders                              │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  Order #1042          23/04/25  │    │
│  │  3 items              $149.00   │    │
│  │  ● Processing                   │    │
│  │                    [View order] │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  Order #1031          10/04/25  │    │
│  │  1 item               $599.00   │    │
│  │  ● Delivered                    │    │
│  │                    [View order] │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

O status usa um círculo colorido — verde para Delivered, laranja para Processing, cinza para Pending. É um detalhe visual simples que comunica bastante.

---

## Order Detail Page

Segue a estrutura do modal de confirmação que já tens — com mais detalhe:

```
┌─────────────────────────────────────────┐
│  ← Back to orders                       │
│                                         │
│  Order #1042                            │
│  Placed on 23 April 2025                │
│  ● Processing                           │
│                                         │
│  ┌──────────────────┐  ┌─────────────┐  │
│  │  Items ordered   │  │  Summary    │  │
│  │                  │  │             │  │
│  │  [img] XX99 Mk2  │  │  Total $xx  │  │
│  │        $2,999 ×1 │  │  Shipping   │  │
│  │                  │  │  VAT        │  │
│  │  [img] YX1       │  │  ───────    │  │
│  │        $599  ×2  │  │  Grand $xx  │  │
│  │                  │  └─────────────┘  │
│  └──────────────────┘                   │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  Shipping address               │    │
│  │  John Doe                       │    │
│  │  1137 Williams Avenue           │    │
│  │  New York, 10001, US            │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

Em mobile, o Summary e o Shipping ficam abaixo da lista de items em vez de ao lado.

---

## Sugestão de ordem de implementação

Começa pela Navbar — é o componente mais visível e desbloqueia o fluxo de autenticação visualmente. Depois o Profile (mais simples). Orders e Order Detail por último — dependem dos pedidos reais do checkout.
