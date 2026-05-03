# Guia de Integração com Cloudinary

---

## Índice

1. [O que é o Cloudinary e porquê usá-lo](#1-o-que-é-o-cloudinary-e-porquê-usá-lo)
2. [Conceitos fundamentais](#2-conceitos-fundamentais)
3. [Setup e configuração](#3-setup-e-configuração)
4. [Upload de imagens no backend](#4-upload-de-imagens-no-backend)
5. [Usar imagens no frontend](#5-usar-imagens-no-frontend)
6. [Adaptar o ResponsiveImage](#6-adaptar-o-responsiveimage)
7. [Migrar as imagens existentes](#7-migrar-as-imagens-existentes)
8. [Fluxo completo](#8-fluxo-completo)

---

## 1. O que é o Cloudinary e porquê usá-lo

O Cloudinary é um serviço de armazenamento e transformação de imagens na cloud. Em vez de guardar imagens no servidor (o que não funciona em serviços como Railway ou Render que têm sistemas de ficheiros efémeros), o Cloudinary guarda-as numa CDN global e serve-as otimizadas.

**Problemas que resolve:**

| Problema | Sem Cloudinary | Com Cloudinary |
|---|---|---|
| Armazenamento | Imagens no servidor — perdidas ao redeploy | CDN persistente |
| Performance | Imagens originais servidas | Redimensionadas e comprimidas automaticamente |
| Responsivo | 3 versões manuais (mobile/tablet/desktop) | Uma imagem, transformações via URL |
| Formato | JPEG/PNG servidos | WebP/AVIF automático para browsers modernos |

**Para o Audiophile especificamente:** as imagens dos produtos (mobile, tablet, desktop) podem ser substituídas por uma única imagem no Cloudinary — o redimensionamento é feito via parâmetros no URL.

---

## 2. Conceitos fundamentais

### Public ID

Cada imagem no Cloudinary tem um `public_id` — o identificador único. O URL de uma imagem é construído a partir dele:

```
https://res.cloudinary.com/{cloud_name}/image/upload/{public_id}
```

### Transformações via URL

O Cloudinary transforma imagens adicionando parâmetros no URL — sem processar a imagem de novo, sem guardar versões separadas:

```
# Imagem original
https://res.cloudinary.com/audiophile/image/upload/products/yx1-earphones

# Redimensionada para 375px de largura
https://res.cloudinary.com/audiophile/image/upload/w_375/products/yx1-earphones

# Redimensionada + formato WebP automático
https://res.cloudinary.com/audiophile/image/upload/w_375,f_auto/products/yx1-earphones

# Redimensionada + formato auto + qualidade auto
https://res.cloudinary.com/audiophile/image/upload/w_375,f_auto,q_auto/products/yx1-earphones
```

`f_auto` — serve WebP para browsers que suportam, JPEG para os outros
`q_auto` — comprime automaticamente sem perda visível de qualidade

---

## 3. Setup e configuração

### Criar conta

1. Criar conta gratuita em [cloudinary.com](https://cloudinary.com)
2. No dashboard, anotar: **Cloud Name**, **API Key**, **API Secret**

O plano gratuito inclui 25GB de armazenamento e 25GB de bandwidth/mês — mais do que suficiente para este projeto.

### Instalar o SDK no backend

```bash
# No servidor — o SDK só é necessário no backend (para upload)
# O frontend usa apenas URLs, não o SDK
cd server
npm install cloudinary
```

### Variáveis de ambiente

```env
# server/.env
CLOUDINARY_CLOUD_NAME=o_teu_cloud_name
CLOUDINARY_API_KEY=a_tua_api_key
CLOUDINARY_API_SECRET=o_teu_api_secret
```

**Porquê apenas no backend?**
O `API_SECRET` não pode estar no frontend — qualquer utilizador poderia inspecionar o código e fazer uploads não autorizados com a tua conta. O frontend nunca vê as credenciais do Cloudinary — apenas recebe URLs de imagens já carregadas.

### Configurar o SDK

```ts
// server/src/libs/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary
```

---

## 4. Upload de imagens no backend

Para fazer upload de imagens (ex: ao criar um produto via painel de admin), usa `multer` para receber o ficheiro e o SDK do Cloudinary para o enviar:

```bash
npm install multer
npm install -D @types/multer
```

```ts
// server/src/middleware/upload.ts
import multer from 'multer'

// Guarda em memória — não em disco
// O ficheiro é enviado diretamente para o Cloudinary sem tocar no disco do servidor
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },  // 5MB máximo
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only images are allowed'))
    }
    cb(null, true)
  },
})
```

```ts
// server/src/libs/upload-to-cloudinary.ts
import cloudinary from './cloudinary'

interface UploadResult {
  publicId: string
  url: string
  width: number
  height: number
}

export async function uploadToCloudinary(
  buffer: Buffer,
  folder: string,
  publicId?: string,
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,               // organiza imagens em pastas no Cloudinary
        public_id: publicId,  // opcional — gera ID automático se não fornecido
        overwrite: true,      // substitui se o public_id já existir
        resource_type: 'image',
      },
      (error, result) => {
        if (error || !result) return reject(error)
        resolve({
          publicId: result.public_id,
          url:      result.secure_url,
          width:    result.width,
          height:   result.height,
        })
      }
    )
    stream.end(buffer)
  })
}
```

### Exemplo de rota com upload

```ts
// server/src/routes/products.ts (admin)
import { upload } from '../middleware/upload'
import { uploadToCloudinary } from '../libs/upload-to-cloudinary'

// POST /api/admin/products
router.post('/', upload.single('image'), async (req, res) => {
  const { name, slug, price, description, category } = req.body

  let imagePublicId = ''

  if (req.file) {
    const result = await uploadToCloudinary(
      req.file.buffer,
      'audiophile/products',
      slug,  // usa o slug como public_id para URLs previsíveis
    )
    imagePublicId = result.publicId
  }

  const [product] = await db.insert(products).values({
    name, slug, price, description, category,
    imagePublicId,  // guarda apenas o public_id, não o URL completo
  }).returning()

  res.status(201).json({ product })
})
```

**Porquê guardar `publicId` em vez do URL completo?**
O URL do Cloudinary pode mudar (versão da API, região, parâmetros). O `public_id` é estável — o URL é sempre reconstruído a partir dele. Também permite aplicar transformações diferentes em momentos diferentes sem atualizar a base de dados.

---

## 5. Usar imagens no frontend

### Construir URLs com transformações

```ts
// src/libs/cloudinary.ts (frontend)
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME

interface ImageOptions {
  width?: number
  quality?: 'auto' | number
  format?: 'auto' | 'webp' | 'jpg'
}

export function getCloudinaryUrl(publicId: string, options: ImageOptions = {}): string {
  const {
    width,
    quality = 'auto',
    format = 'auto',
  } = options

  const transformations = [
    width    ? `w_${width}`    : '',
    quality  ? `q_${quality}`  : '',
    format   ? `f_${format}`   : '',
  ].filter(Boolean).join(',')

  const base = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`

  return transformations
    ? `${base}/${transformations}/${publicId}`
    : `${base}/${publicId}`
}
```

```env
# client/.env
VITE_CLOUDINARY_CLOUD_NAME=o_teu_cloud_name
```

**Porquê `VITE_` no prefixo?**
O Vite só expõe variáveis de ambiente ao cliente se tiverem o prefixo `VITE_`. Variáveis sem o prefixo ficam apenas no servidor de build. Como `CLOUD_NAME` não é um segredo (aparece em URLs públicos), é seguro expô-lo no frontend.

---

## 6. Adaptar o `ResponsiveImage`

Atualmente o `ResponsiveImage` recebe um objeto `{ mobile, tablet, desktop }` com URLs separados. Com o Cloudinary, passas um `publicId` e geras os URLs dinamicamente:

```tsx
// src/components/widgets/responsive-image/responsive-image.tsx
import { getCloudinaryUrl } from '@/libs/cloudinary'

interface ResponsiveImageProps {
  publicId: string
  alt: string
  className?: string
  pictureClassName?: string
  loading?: 'lazy' | 'eager'
  sizes?: string  // hint para o browser sobre o tamanho da imagem
}

const ResponsiveImage = ({
  publicId,
  alt,
  className,
  pictureClassName,
  loading = 'lazy',
  sizes = '100vw',
}: ResponsiveImageProps) => {
  return (
    <picture className={pictureClassName}>
      {/* Desktop — 1440px+ */}
      <source
        media="(min-width: 1440px)"
        srcSet={getCloudinaryUrl(publicId, { width: 1440, format: 'auto', quality: 'auto' })}
      />
      {/* Tablet — 768px+ */}
      <source
        media="(min-width: 768px)"
        srcSet={getCloudinaryUrl(publicId, { width: 768, format: 'auto', quality: 'auto' })}
      />
      {/* Mobile — fallback */}
      <img
        src={getCloudinaryUrl(publicId, { width: 375, format: 'auto', quality: 'auto' })}
        alt={alt}
        loading={loading}
        sizes={sizes}
        className={className}
      />
    </picture>
  )
}
```

---

## 7. Migrar as imagens existentes

As imagens que estão atualmente em `src/assets/` ou `public/assets/` precisam de ser carregadas para o Cloudinary. Faz isso com um script de seed:

```ts
// server/src/db/seed-images.ts
import cloudinary from '../libs/cloudinary'
import { db } from '../db'
import { products } from '../db/schema'
import fs from 'fs'
import path from 'path'

// Para cada produto, carrega a imagem principal para o Cloudinary
// e atualiza o publicId na base de dados
async function seedImages() {
  const allProducts = await db.select().from(products)

  for (const product of allProducts) {
    const imagePath = path.join(__dirname, `../../assets/products/${product.slug}.jpg`)

    if (!fs.existsSync(imagePath)) {
      console.log(`Image not found for ${product.slug}`)
      continue
    }

    const result = await cloudinary.uploader.upload(imagePath, {
      folder: 'audiophile/products',
      public_id: product.slug,
      overwrite: true,
    })

    await db.update(products)
      .set({ imagePublicId: result.public_id })
      .where(eq(products.id, product.id))

    console.log(`Uploaded: ${product.slug} → ${result.public_id}`)
  }
}

seedImages()
```

```bash
npx ts-node src/db/seed-images.ts
```

---

## 8. Fluxo completo

```
Imagem carregada para o Cloudinary (seed ou admin)
  → public_id guardado na base de dados
  → Ex: "audiophile/products/yx1-earphones"

Frontend recebe publicId da API
  → getCloudinaryUrl(publicId, { width: 375 })
  → URL: https://res.cloudinary.com/audiophile/image/upload/w_375,f_auto,q_auto/audiophile/products/yx1-earphones

Browser pede a imagem
  → Cloudinary serve a versão certa (tamanho, formato, qualidade)
  → CDN global — imagem servida do servidor mais próximo do utilizador
  → Resultado cacheado na CDN para pedidos futuros
```
