# Guia de Skeleton Loading

> Referência prática para construir skeletons no projeto Audiophile. Sem over-engineering.

---

## Índice

1. [O que é um skeleton e quando usar](#1-o-que-é-um-skeleton-e-quando-usar)
2. [Acessibilidade — o que considerar](#2-acessibilidade--o-que-considerar)
3. [Componente base](#3-componente-base)
4. [Skeletons por página](#4-skeletons-por-página)
5. [Organização de ficheiros](#5-organização-de-ficheiros)
6. [O que não fazer](#6-o-que-não-fazer)

---

## 1. O que é um skeleton e quando usar

Um skeleton é um placeholder visual que imita a forma do conteúdo enquanto os dados ainda não estão disponíveis. É preferível ao spinner em páginas completas porque:

- Reduz a perceção de tempo de espera — o utilizador vê estrutura imediatamente
- Evita layout shift — quando os dados chegam, ocupam exatamente o espaço do skeleton
- Comunica o tipo de conteúdo que vai aparecer

**Quando usar skeleton vs spinner:**

| Situação | Solução |
|---|---|
| Página inteira a carregar | Skeleton |
| Secção de dados a carregar | Skeleton |
| Ação rápida (submit, adicionar ao carrinho) | Spinner ou `disabled` no botão |
| Fetch esperado < 300ms | Nenhum — evita flash desnecessário |

---

## 2. Acessibilidade — o que considerar

### O problema

Um skeleton é puramente visual — não tem conteúdo semântico. Sem atenção à acessibilidade, um leitor de ecrã ou não anuncia nada (o utilizador não sabe o que está a acontecer) ou anuncia os elementos visuais do skeleton (confuso e sem sentido).

### A solução — três regras

**Regra 1 — `aria-hidden` em todos os elementos visuais do skeleton**

Os blocos cinzentos animados não têm significado — esconde-os de leitores de ecrã:

```tsx
<div aria-hidden="true" className={cn('skeleton-block')} />
```

**Regra 2 — `role="status"` com `aria-label` no contentor**

O contentor do skeleton deve anunciar que o conteúdo está a carregar:

```tsx
<div
  role="status"
  aria-label="Loading products..."
  aria-live="polite"
>
  {/* blocos visuais com aria-hidden */}
</div>
```

- `role="status"` — anuncia de forma não intrusiva, sem interromper o leitor de ecrã
- `aria-label` — descreve o que está a carregar, não apenas "Loading"
- `aria-live="polite"` — reforça que o anúncio não é urgente

**Regra 3 — Quando o conteúdo real carrega, o skeleton desaparece**

O React gere isto automaticamente com renderização condicional — quando `isLoading` passa a `false`, o skeleton desmonta e o conteúdo real monta. O leitor de ecrã anuncia o novo conteúdo naturalmente.

```tsx
if (isLoading) return <ProductPageSkeleton />;
return <ProductPage product={data} />;
```

---

## 3. Componente base

Todas as formas do skeleton (blocos, círculos, linhas de texto) derivam de um componente base com a animação de pulse:

```tsx
// src/components/ui/skeleton/skeleton.tsx
import { cn } from '@/libs/cn';

interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      aria-hidden="true"    // sempre oculto de leitores de ecrã
      className={cn(
        'animate-pulse',    // animação Tailwind — fade in/out suave
        'rounded-lg',
        'bg-gray-300',      // usa a tua cor de skeleton do design system
        className,          // forma e tamanho definidos pelo componente pai
      )}
    />
  );
};

export default Skeleton;
```

O componente base não define forma nem tamanho — isso é responsabilidade de quem o usa. O `className` permite passar `w-full h-6`, `size-16`, `aspect-square`, etc.

---

## 4. Skeletons por página

### Padrão de cada skeleton de página

Cada skeleton de página segue a mesma estrutura:

```tsx
const NomePaginaSkeleton = () => {
  return (
    // role="status" e aria-label no contentor raiz
    // aria-hidden em todos os elementos visuais
    <div role="status" aria-label="Loading [nome da página]...">
      <Skeleton aria-hidden="true" className="..." />
    </div>
  );
};
```

---

### Category Page Skeleton

Imita o layout da `CategoryPage`: header escuro no topo, lista de produtos com imagem e texto alternados.

```tsx
// src/components/widgets/category-page-skeleton/category-page-skeleton.tsx
import { Skeleton } from '@/components/ui';
import { cn } from '@/libs/cn';

// Skeleton de um produto individual na lista
const ProductCardSkeleton = ({ isReversed }: { isReversed: boolean }) => {
  return (
    <div
      className={cn(
        'flex',
        'flex-col',
        'items-center',
        'gap-8',

        'lg:flex-row',
        'lg:justify-between',
        'lg:items-center',
        isReversed && 'lg:flex-row-reverse',
      )}
    >
      {/* Imagem do produto */}
      <Skeleton
        className={cn(
          'w-full',
          'aspect-square',
          'rounded-lg',

          'lg:max-w-[540px]',
        )}
      />

      {/* Texto do produto */}
      <div className={cn('w-full', 'max-w-[445px]', 'flex', 'flex-col', 'gap-4')}>
        {/* Badge "New Product" */}
        <Skeleton className={cn('h-4', 'w-24')} />
        {/* Título */}
        <Skeleton className={cn('h-8', 'w-3/4')} />
        <Skeleton className={cn('h-8', 'w-1/2')} />
        {/* Descrição — 3 linhas */}
        <div className={cn('flex', 'flex-col', 'gap-2', 'mt-2')}>
          <Skeleton className={cn('h-4', 'w-full')} />
          <Skeleton className={cn('h-4', 'w-full')} />
          <Skeleton className={cn('h-4', 'w-2/3')} />
        </div>
        {/* Botão */}
        <Skeleton className={cn('h-12', 'w-40', 'mt-4')} />
      </div>
    </div>
  );
};

const CategoryPageSkeleton = () => {
  return (
    <div role="status" aria-label="Loading category...">
      {/* Header da categoria */}
      <div className={cn('bg-gray-900', 'py-16')}>
        <div className={cn('wrapper', 'flex', 'justify-center')}>
          <Skeleton className={cn('h-8', 'w-48', 'bg-gray-700')} />
        </div>
      </div>

      {/* Lista de produtos */}
      <div className={cn('bg-white')}>
        <div className={cn('wrapper', 'flow', 'flow-spacing')}>
          {/* 3 produtos — alterna isReversed */}
          {[0, 1, 2].map((i) => (
            <ProductCardSkeleton key={i} isReversed={i % 2 !== 0} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPageSkeleton;
```

Uso na página:

```tsx
// category-page.tsx
const { data, isLoading, isError, refetch } = useGetProductsByCategorySlugQuery(
  slug!,
  { skip: !slug }
);

if (isLoading) return <CategoryPageSkeleton />;
if (isError) return <ErrorMessage onRetry={refetch} />;
```

---

### Product Page Skeleton

Imita o layout da `ProductPage`: card de detalhe no topo, secções de features e in-the-box, galeria, sugestões.

```tsx
// src/components/widgets/product-page-skeleton/product-page-skeleton.tsx
import { Skeleton } from '@/components/ui';
import { cn } from '@/libs/cn';

const ProductPageSkeleton = () => {
  return (
    <div role="status" aria-label="Loading product...">
      <div className={cn('bg-white')}>
        <div className={cn('wrapper', 'flow')}>

          {/* ProductDetailedCard skeleton */}
          <div
            className={cn(
              'flex',
              'flex-col',
              'gap-10',

              'md:flex-row',
              'md:items-center',
              'md:gap-16',
            )}
          >
            {/* Imagem principal */}
            <Skeleton
              className={cn(
                'w-full',
                'aspect-square',
                'rounded-lg',

                'md:aspect-[280/560]',
                'lg:aspect-[540/560]',
              )}
            />
            {/* Info do produto */}
            <div className={cn('flex', 'flex-col', 'gap-6', 'w-full', 'max-w-[445px]')}>
              <Skeleton className={cn('h-4', 'w-24')} />
              <Skeleton className={cn('h-8', 'w-3/4')} />
              <Skeleton className={cn('h-8', 'w-1/2')} />
              <div className={cn('flex', 'flex-col', 'gap-2')}>
                <Skeleton className={cn('h-4', 'w-full')} />
                <Skeleton className={cn('h-4', 'w-full')} />
                <Skeleton className={cn('h-4', 'w-2/3')} />
              </div>
              <Skeleton className={cn('h-6', 'w-32')} />
              <div className={cn('flex', 'gap-4')}>
                <Skeleton className={cn('h-12', 'w-32')} />
                <Skeleton className={cn('h-12', 'w-40')} />
              </div>
            </div>
          </div>

          {/* Features + In the Box */}
          <div
            className={cn(
              'flex',
              'flex-col',
              'gap-22',

              'lg:flex-row',
              'lg:justify-between',
            )}
          >
            {/* Features — bloco de texto longo */}
            <div className={cn('flex', 'flex-col', 'gap-4', 'lg:max-w-[635px]')}>
              <Skeleton className={cn('h-6', 'w-32')} />
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className={cn('h-4', i % 7 === 6 ? 'w-2/3' : 'w-full')} />
              ))}
            </div>

            {/* In the Box */}
            <div className={cn('flex', 'flex-col', 'gap-4', 'lg:w-[350px]')}>
              <Skeleton className={cn('h-6', 'w-32')} />
              {[...Array(5)].map((_, i) => (
                <div key={i} className={cn('flex', 'gap-4')}>
                  <Skeleton className={cn('h-4', 'w-8')} />
                  <Skeleton className={cn('h-4', 'w-40')} />
                </div>
              ))}
            </div>
          </div>

          {/* Gallery — duas imagens pequenas + uma grande */}
          <div
            className={cn(
              'grid',
              'gap-5',
              'grid-cols-1',

              'md:grid-cols-2',
              'md:grid-rows-2',
            )}
          >
            <Skeleton className={cn('w-full', 'aspect-[445/280]', 'rounded-lg')} />
            <Skeleton className={cn('w-full', 'aspect-[445/280]', 'rounded-lg', 'md:row-span-2')} />
            <Skeleton className={cn('w-full', 'aspect-[445/280]', 'rounded-lg')} />
          </div>

          {/* Suggestion Section — 3 cards */}
          <div className={cn('flex', 'flex-col', 'items-center', 'gap-10')}>
            <Skeleton className={cn('h-6', 'w-48')} />
            <div
              className={cn(
                'grid',
                'w-full',
                'gap-6',
                'grid-cols-1',

                'md:grid-cols-3',
              )}
            >
              {[0, 1, 2].map((i) => (
                <div key={i} className={cn('flex', 'flex-col', 'items-center', 'gap-6')}>
                  <Skeleton className={cn('w-full', 'aspect-square', 'rounded-lg')} />
                  <Skeleton className={cn('h-6', 'w-32')} />
                  <Skeleton className={cn('h-10', 'w-36')} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductPageSkeleton;
```

---

### Cart Modal Skeleton

Para quando o modal abre e os dados do carrinho ainda não estão disponíveis — improvável com Redux, mas útil se os dados vierem de fetch:

```tsx
// src/components/widgets/cart-modal-skeleton/cart-modal-skeleton.tsx
import { Skeleton } from '@/components/ui';
import { cn } from '@/libs/cn';

const CartItemSkeleton = () => (
  <div className={cn('flex', 'justify-between', 'items-center', 'gap-4')}>
    <div className={cn('flex', 'items-center', 'gap-4')}>
      <Skeleton className={cn('size-16', 'rounded-lg')} />
      <div className={cn('flex', 'flex-col', 'gap-2')}>
        <Skeleton className={cn('h-4', 'w-24')} />
        <Skeleton className={cn('h-3', 'w-16')} />
      </div>
    </div>
    <Skeleton className={cn('h-8', 'w-24')} />
  </div>
);

const CartModalSkeleton = () => {
  return (
    <div role="status" aria-label="Loading cart...">
      {/* Header */}
      <div className={cn('flex', 'justify-between', 'items-center', 'gap-8')}>
        <Skeleton className={cn('h-5', 'w-24')} />
        <Skeleton className={cn('h-4', 'w-20')} />
      </div>

      {/* Items */}
      <div className={cn('flex', 'flex-col', 'gap-6', 'my-8')}>
        {[0, 1, 2].map((i) => (
          <CartItemSkeleton key={i} />
        ))}
      </div>

      {/* Total */}
      <div className={cn('flex', 'justify-between', 'items-center', 'gap-8', 'mbe-6')}>
        <Skeleton className={cn('h-4', 'w-16')} />
        <Skeleton className={cn('h-5', 'w-24')} />
      </div>

      {/* Botão checkout */}
      <Skeleton className={cn('h-12', 'w-full')} />
    </div>
  );
};

export default CartModalSkeleton;
```

---

## 5. Organização de ficheiros

```
src/
  components/
    ui/
      skeleton/
        skeleton.tsx          ← componente base reutilizável
        index.ts

    widgets/
      category-page-skeleton/
        category-page-skeleton.tsx
        index.ts
      product-page-skeleton/
        product-page-skeleton.tsx
        index.ts
      cart-modal-skeleton/
        cart-modal-skeleton.tsx
        index.ts
```

Os skeletons de página vivem em `widgets` — são composições do componente base `Skeleton`, tal como outros widgets são composições de componentes `ui`.

---

## 6. O que não fazer

**Não uses `role="alert"` no skeleton**

`role="alert"` interrompe o leitor de ecrã imediatamente — é para erros. Para loading usa `role="status"` que é não intrusivo.

**Não animes com `animate-bounce` ou `animate-ping`**

Animações agressivas causam distração e podem ser problemáticas para utilizadores com sensibilidade a movimento. `animate-pulse` é suave e amplamente aceite. Se quiseres respeitar a preferência do sistema operativo:

```css
/* No teu CSS global */
@media (prefers-reduced-motion: reduce) {
  .animate-pulse {
    animation: none;
  }
}
```

Ou com Tailwind:

```tsx
<div className={cn('animate-pulse', 'motion-reduce:animate-none')} />
```

**Não cries skeletons pixel-perfect**

O skeleton não precisa de corresponder exatamente ao layout final — precisa de comunicar a estrutura geral. Gastar tempo a alinhar cada pixel do skeleton é over-engineering.

**Não uses `aria-busy` no skeleton**

`aria-busy="true"` num contentor diz ao leitor de ecrã para ignorar as alterações dentro dele enquanto está a carregar. Pode parecer útil, mas na prática causa comportamentos inconsistentes entre leitores de ecrã. `role="status"` + `aria-label` é mais fiável.

**Não repitas o mesmo número de items do skeleton que os dados reais**

Se uma categoria pode ter 3 ou 6 produtos, o skeleton com sempre 3 items é suficiente — o objetivo é comunicar estrutura, não quantidade exata.
