# Guia — Cloudinary (Armazenamento de Assets)

---

## Índice

1. [O que é e porquê usar](#1-o-que-é-e-porquê-usar)
2. [Como funciona](#2-como-funciona)
3. [Configuração da conta](#3-configuração-da-conta)
4. [Integração no backend](#4-integração-no-backend)
5. [Integração no frontend](#5-integração-no-frontend)
6. [Transformações de imagem](#6-transformações-de-imagem)
7. [Migrar os assets existentes](#7-migrar-os-assets-existentes)
8. [Variáveis de ambiente](#8-variáveis-de-ambiente)

---

## 1. O que é e porquê usar

**Cloudinary** é um serviço de armazenamento e entrega de assets (imagens, vídeos) na cloud.

Sem Cloudinary, as imagens dos produtos estão em `src/assets/` — o Vite processa-as no build, mas em produção precisam de estar algures acessíveis. Opções:

| Opção | Problema |
|---|---|
| Incluir no bundle do Vite | Aumenta o tamanho do deploy; não escala |
| Servir pelo Express | O servidor de API não devia servir assets estáticos em produção |
| Cloudinary | CDN global, transformações automáticas, URL estável |

**O que o Cloudinary oferece que é relevante para este projeto:**

- **CDN global** — as imagens são entregues do servidor mais próximo do utilizador
- **Transformações por URL** — redimensionar, converter formato, otimizar qualidade sem processar no servidor
- **Versões responsivas** — uma imagem no Cloudinary pode ser servida em múltiplos tamanhos via URL
- **Tier gratuito generoso** — 25 créditos/mês, suficiente para desenvolvimento e portfólio

---

## 2. Como funciona

O Cloudinary funciona com URLs. Cada imagem tem um URL base ao qual adicionas parâmetros de transformação:

```
https://res.cloudinary.com/{cloud_name}/image/upload/{transformações}/{public_id}
```

Exemplos de transformações no URL:

```
# Original
https://res.cloudinary.com/audiophile/image/upload/products/yx1-earphones

# Redimensionado para 540px de largura
https://res.cloudinary.com/audiophile/image/upload/w_540/products/yx1-earphones

# Formato WebP automático + qualidade otimizada
https://res.cloudinary.com/audiophile/image/upload/f_auto,q_auto/products/yx1-earphones

# Tudo junto
https://res.cloudinary.com/audiophile/image/upload/w_540,f_auto,q_auto/products/yx1-earphones
```

Para o `ResponsiveImage`, em vez de ter três imagens separadas (mobile, tablet, desktop), podes ter uma imagem no Cloudinary e gerar os três tamanhos por URL.

---

## 3. Configuração da conta

1. Criar conta em [cloudinary.com](https://cloudinary.com) — o tier gratuito é suficiente
2. No dashboard, encontras as credenciais necessárias:
   - **Cloud name** — nome único da tua conta (ex: `audiophile-store`)
   - **API Key** — identificador público
   - **API Secret** — nunca expor no frontend

---

## 4. Integração no backend

O backend usa o SDK oficial do Cloudinary para fazer upload de imagens:

```bash
npm install cloudinary
```

### Configuração

```ts
// server/src/libs/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,  // nunca expor no frontend
  secure: true,  // sempre HTTPS
})

export default cloudinary
```

### Helper para upload

```ts
// server/src/libs/upload.ts
import cloudinary from './cloudinary'

interface UploadResult {
  publicId: string
  url: string
  secureUrl: string
}

export async function uploadImage(
  filePath: string,       // caminho local do ficheiro
  folder: string,         // pasta no Cloudinary (ex: 'products', 'users')
): Promise<UploadResult> {
  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    // Gera automaticamente versões otimizadas
    transformation: [
      { quality: 'auto' },   // qualidade otimizada automaticamente
      { fetch_format: 'auto' },  // formato ideal para o browser (WebP, AVIF)
    ],
  })

  return {
    publicId: result.public_id,
    url: result.url,
    secureUrl: result.secure_url,
  }
}

export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId)
}
```

### Upload via rota (ex: admin a adicionar produto)

```ts
// server/src/routes/products.ts
import multer from 'multer'  // middleware para receber ficheiros
import { uploadImage } from '../libs/upload'

// npm install multer @types/multer
// Guarda o ficheiro temporariamente em memória
const upload = multer({ storage: multer.memoryStorage() })

router.post('/', authenticate, upload.single('image'), async (req: AuthRequest, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Image is required' })
  }

  // Guardar o ficheiro temporariamente em disco para upload
  // (Cloudinary SDK precisa de caminho ou stream)
  const tempPath = `/tmp/${req.file.originalname}`
  await fs.writeFile(tempPath, req.file.buffer)

  const { publicId, secureUrl } = await uploadImage(tempPath, 'products')

  // Guardar o publicId na base de dados — não o URL completo
  // O URL pode mudar (ex: mudar de cloud name) — o publicId é estável
  const [product] = await db.insert(products).values({
    ...req.body,
    imagePublicId: publicId,
  }).returning()

  await fs.unlink(tempPath)  // limpar ficheiro temporário
  res.status(201).json(product)
})
```

**Porquê guardar o `publicId` em vez do URL completo?** O publicId é o identificador estável no Cloudinary. A partir dele, podes gerar qualquer variação do URL com transformações diferentes. Guardar o URL completo limita-te a uma variante específica.

---

## 5. Integração no frontend

### Helper para gerar URLs com transformações

```ts
// src/libs/cloudinary.ts
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME

interface ImageOptions {
  width?: number
  height?: number
  quality?: 'auto' | number
  format?: 'auto' | 'webp' | 'avif' | 'jpg'
  crop?: 'fill' | 'fit' | 'scale' | 'crop'
}

export function getImageUrl(publicId: string, options: ImageOptions = {}): string {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
  } = options

  // Constrói a string de transformações
  const transformations: string[] = [
    `f_${format}`,
    `q_${quality}`,
    crop && `c_${crop}`,
    width && `w_${width}`,
    height && `h_${height}`,
  ].filter(Boolean) as string[]

  const transformStr = transformations.join(',')

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformStr}/${publicId}`
}

// Gera o objeto ProductImage a partir de um publicId
export function getResponsiveImageUrls(publicId: string) {
  return {
    mobile:  getImageUrl(publicId, { width: 654, height: 300, crop: 'fill' }),
    tablet:  getImageUrl(publicId, { width: 689, height: 300, crop: 'fill' }),
    desktop: getImageUrl(publicId, { width: 1080, height: 600, crop: 'fill' }),
  }
}
```

### Usar nos componentes

```tsx
// product-detailed-card.tsx
import { getResponsiveImageUrls } from '@/libs/cloudinary'

// Se o produto tem imagePublicId da base de dados
const image = product.imagePublicId
  ? getResponsiveImageUrls(product.imagePublicId)
  : product.image  // fallback para o objeto image existente

<ResponsiveImage image={image} alt={product.name} />
```

**Porquê `VITE_` no nome da variável?** O Vite só expõe variáveis de ambiente com o prefixo `VITE_` no frontend. O `cloud_name` é público — pode estar no frontend. O `api_key` e `api_secret` **nunca** devem estar no frontend.

---

## 6. Transformações de imagem

O Cloudinary oferece transformações úteis para o Audiophile:

```ts
// Redimensionar mantendo proporção
getImageUrl(publicId, { width: 540, crop: 'fit' })

// Cortar para preencher o espaço (pode cortar bordas)
getImageUrl(publicId, { width: 540, height: 560, crop: 'fill' })

// Thumbnail quadrado
getImageUrl(publicId, { width: 64, height: 64, crop: 'fill' })

// Apenas otimização — sem redimensionamento
getImageUrl(publicId, { quality: 'auto', format: 'auto' })
```

Para o `<picture>` responsivo, podes agora simplificar — uma imagem, três tamanhos:

```tsx
// ResponsiveImage com Cloudinary — uma fonte, três tamanhos via URL
const ResponsiveImage = ({ publicId, alt, className }: { publicId: string; alt: string; className?: string }) => {
  return (
    <picture>
      <source
        media="(min-width: 1440px)"
        srcSet={getImageUrl(publicId, { width: 1080 })}
      />
      <source
        media="(min-width: 768px)"
        srcSet={getImageUrl(publicId, { width: 689 })}
      />
      <img
        src={getImageUrl(publicId, { width: 654 })}
        alt={alt}
        className={className}
      />
    </picture>
  )
}
```

---

## 7. Migrar os assets existentes

Para migrar as imagens atuais de `src/assets/` para o Cloudinary, cria um script de seed:

```ts
// server/src/db/seed-images.ts
import cloudinary from '../libs/cloudinary'
import path from 'path'
import fs from 'fs'

const assetsDir = path.join(__dirname, '../../../client/src/assets')

async function uploadProductImages() {
  const productFolders = fs.readdirSync(path.join(assetsDir, 'products'))

  for (const folder of productFolders) {
    const imagePath = path.join(assetsDir, 'products', folder, 'desktop', 'image-product.jpg')

    if (!fs.existsSync(imagePath)) continue

    const result = await cloudinary.uploader.upload(imagePath, {
      folder: 'audiophile/products',
      public_id: folder,  // usa o nome da pasta como publicId
      overwrite: true,
    })

    console.log(`Uploaded: ${folder} → ${result.public_id}`)
  }
}

uploadProductImages()
```

```bash
npx ts-node server/src/db/seed-images.ts
```

---

## 8. Variáveis de ambiente

```env
# server/.env — credenciais privadas
CLOUDINARY_CLOUD_NAME=audiophile-store
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=segredo_nunca_expor_no_frontend

# client/.env — apenas o cloud name é público
VITE_CLOUDINARY_CLOUD_NAME=audiophile-store
```

**Resumo do que vai onde:**

| Variável | Backend | Frontend |
|---|---|---|
| `CLOUDINARY_CLOUD_NAME` | ✅ | ✅ (prefixo VITE_) |
| `CLOUDINARY_API_KEY` | ✅ | ❌ nunca |
| `CLOUDINARY_API_SECRET` | ✅ | ❌ nunca |
