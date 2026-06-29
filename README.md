<div align="center">

# Audiophile (In Development)

A full-stack e-commerce platform for premium audio equipment featuring authentication, shopping cart management, product catalog, order processing, responsive design, and a REST API built with TypeScript.

[Live Demo](https://audiophile-frontend-v2.vercel.app)
•
[API Docs](https://your-api.onrender.com/api-docs)
•
[Source Code](https://github.com/alberto-rj/audiophile)

</div>

## About The Project

Audiophile is a full-stack e-commerce platform inspired by a real-world online store for high-end audio products.

The project was built to practice production-oriented frontend and backend development, focusing on authentication, shopping cart management, API design, validation, accessibility, and scalable application architecture.

Rather than focusing only on features, the main goal was to build a system with clear separation of concerns, reusable business logic, and maintainable code that could realistically evolve into a larger application.

Audiophile is a full-stack e-commerce application for high-end audio products - headphones, speakers, and earphones. It started as a Frontend Mentor challenge and grew into a production-oriented build covering authentication, cart management, order processing, image storage, and a documented REST API.

The focus throughout was architecture before features: clear separation between HTTP, business logic, and persistence layers; a single source of truth for validation and API documentation; and a frontend built with the same discipline - isolated component documentation, mock-driven development, and clean server state management.

## Demo video (coming soon)

## Live Demo

- **Frontend:** https://audiophile-frontend-v2.vercel.app

- **Backend API:** https://your-api.onrender.com

- **Swagger Documentation:** https://your-api.onrender.com/api-docs

## Architecture Overview

```text
┌───────────────┐
│ React Client  │
└───────┬───────┘
        │ HTTP
        ▼
┌────────────────────┐
│ Express API        │
├────────────────────┤
│ Controllers        │
│ Use Cases          │
│ Repository Layer   │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ PostgreSQL         │
└────────────────────┘
```

### Backend Layers

```text
HTTP Layer
   ↓
Controllers
   ↓
Use Cases
   ↓
Repositories
   ↓
Database
```

The backend is organized in strict layers. Controllers parse HTTP input and return responses. Use cases contain all business logic and are completely independent of Express and the database. Repositories are injected as interfaces - the same use case runs against in-memory implementations in tests and Drizzle/PostgreSQL in production.

## Tech Stack

### Frontend

- React
- TypeScript
- Redux Toolkit
- React Router
- Tailwind CSS
- React Hook Form
- Zod
- Storybook
- MSW
- Vitest

### Backend

- Node.js
- Express.js
- TypeScript
- Zod
- JWT Authentication
- Cloudinary
- OpenAPI / Swagger
- PostgreSQL & Drizzle ORM

### Tooling

- ESLint
- Prettier
- Vite

## Key Features

- **Authentication:** user registration, login, logout, refresh token flow, protected routes.

- **User Management:** view profile, update profile information.

- **Shopping Experience:** product catalog, product details page, responsive gallery, shopping cart, checkout flow.

## Key Technical Decisions

- **Repository pattern with swappable implementations.** The API depends on repository interfaces, not concrete classes. Every use case receives its dependencies via injection - in tests, those are in-memory implementations; in production, they are Drizzle/PostgreSQL implementations. This means business logic is never coupled to a specific database, ORM, or infrastructure detail. Adding a Redis cache layer or switching from PostgreSQL to another DB would require writing a new implementation, not rewriting use cases.

- **`zod-to-openapi` as a single source of truth.** Every request and response schema is a Zod schema registered with `@asteasolutions/zod-to-openapi`. The OpenAPI 3.1 spec and the Swagger UI are generated from those registrations at startup. This means runtime validation and documentation are the same artifact - changing a schema updates both simultaneously, with no risk of the spec drifting from the actual API behaviour.

- **`AsyncLocalStorage` for request context propagation.** Rather than threading `userId` and request metadata through every function signature, the backend uses Node's `AsyncLocalStorage` to store per-request context after authentication. Downstream helpers (logger, use cases, presenters) read from context when they need it. This keeps function signatures clean and makes structured logging with per-request correlation IDs straightforward.

- **Cloudinary `publicId` stored in the database, URLs built at the presenter layer.** Rather than storing full URLs, only the Cloudinary `publicId` is persisted. The presenter constructs responsive image URLs (different sizes, formats, transformations) at response time. This decouples the database from Cloudinary's URL structure - a CDN migration or image transformation change requires updating the presenter, not the database.

- **RTK Query for all server state.** The frontend uses RTK Query instead of manual fetch + `useEffect` patterns. This gives automatic caching, request deduplication, built-in loading/error states, and optimistic updates without custom reducer logic. It also created a clear boundary between server state (RTK Query) and client state (Redux slices), which kept the cart and auth logic simpler than a mixed approach would have been.

- **HTTP-Only Authentication Cookies.** Authentication tokens are stored in HTTP-only cookies rather than localStorage. Benefits: better protection against XSS attacks, improved security for authentication flows, more realistic production setup. The tradeoff is a slightly more complex refresh token implementation.

## Project Structure

### Backend structure

```bash
backend/src/
├── config/          # Environment variables and OpenAPI registry setup
├── db/
│   ├── drizzle/     # Schema definitions and migrations
│   ├── in-memory/   # In-memory database for testing
│   ├── mocks/       # Seed data (JSON)
│   └── seeds/       # Seeding scripts with FK-ordered insertion
├── helpers/         # Factory functions, logger (Pino + AsyncLocalStorage), utilities
├── http/
│   ├── controllers/ # Thin HTTP handlers - parse, call use case, respond
│   ├── middlewares/ # Auth guard, error handler, request logger, context propagation
│   ├── openapi/     # Per-endpoint OpenAPI path definitions (zod-to-openapi)
│   └── routes/      # Route registration
├── repositories/
│   ├── drizzle/     # PostgreSQL implementations via Drizzle ORM
│   ├── in-memory/   # In-memory implementations (auth, users, products, categories)
│   └── types/       # Repository interfaces (contracts)
├── schemas/         # Zod schemas - shared across validation, types, and OpenAPI spec
└── use-cases/       # Business logic - pure TypeScript, no Express or DB dependency
```

### Frontend structure

```bash
frontend/src/
├── app/
│   ├── features/    # Redux slices (auth, cart)
│   ├── services/    # RTK Query API definitions (auth, users, products, categories, orders, cart)
│   └── store/       # Redux store configuration
├── components/
│   ├── ui/          # Primitive components (Button, Input, Modal, Toast, etc.)
│   └── widgets/     # Composite components (Navbar, CartModal, OrderConfirmation, etc.)
├── config/          # API endpoints, app routes, env, Storybook decorators
├── hooks/           # Custom hooks (checkout form, auth credentials, cart state, etc.)
├── libs/            # Utilities, form schemas (Zod), shared types, mock data
├── mocks/           # MSW handlers for all API domains (auth, cart, orders, products)
├── pages/           # Route-level components with co-located Storybook stories
└── layouts/         # Shared page layout
```

## Running Locally

**Prerequisites:** Node.js 20+, PostgreSQL, a Cloudinary account (free tier is sufficient).

```bash
git clone https://github.com/alberto-rj/audiophile.git
cd audiophile
```

### Backend (terminal 1)

```bash
cd backend
npm install
cp .env.example .env
# Fill in the required variables (see Environment Variables below)
npm run dev
```

| URL                              | Description |
| -------------------------------- | ----------- |
| `http://localhost:4224`          | REST API    |
| `http://localhost:4224/api-docs` | Swagger UI  |

**Run migrations and seed the database:**

```bash
npm run db:migrate   # Apply schema migrations
npm run db:seed      # Seed categories and products
```

### Frontend (terminal 2)

Open a second terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

| URL                     | Description       |
| ----------------------- | ----------------- |
| `http://localhost:5173` | React application |

**Run Storybook (optional):**

```bash
npm run storybook    # Component documentation at http://localhost:6006
```

## Environment Variables

`backend/.env.example`:

```env
# Server
NODE_ENV=development
PORT=4224
DEV_API_BASE_URL=http://localhost:4224/api/v1
PROD_API_BASE_URL=https://api.audiophile-domain.com/api/v1

# Database
DATABASE_URL=postgresql://user_example:password_example@localhost:5432/db_example

# Access Token
ACCESS_SECRET=your-super-secret-jwt-key-change-this # to generate run: openssl rand -base64 32
ACCESS_EXPIRES_MS=420000

# Refresh Token
REFRESH_EXPIRES_MS=604800000

# Logger
LOG_REQUEST_BODY=true
LOG_REQUEST_HEADER=true

# CORS
CORS_ORIGINS=https://audiophile-domain.com;https://www.audiophile-domain.com;http://localhost:5173;http://localhost:4224;https://api.audiophile-domain.com
CORS_METHODS=GET;POST;PUT;PATCH;DELETE;OPTIONS
CORS_HEADERS=Content-Type;Authorization

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

`frontend/.env.example`:

```env

VITE_NODE_ENV=development

VITE_API_BASE_URL=/api
```

## What I'd Do Differently

- **Introduce the database layer earlier.** The backend started with in-memory repositories only. That was intentional - it let me focus on use cases and API contracts first - but it meant the Drizzle schema, migrations, and seeding scripts were written later, when the domain model was already established. Writing the schema alongside the use cases would have surfaced FK constraints, nullable columns, and relation design issues much earlier, rather than discovering them during seeding.

- **Define repository interfaces before implementations.** On several entities I wrote the Drizzle implementation first and extracted the interface afterwards. The correct order is the reverse: write the interface as a contract, then write both the in-memory and Drizzle implementations to satisfy it. Working implementation-first led to interfaces that were slightly too specific to Drizzle's return shapes, which the in-memory implementations then had to work around.

- **Register every Zod schema with the OpenAPI registry from the start.** Some early schemas were written without `registry.register(...)`. Going back to register them later - and verifying the generated spec matched the actual behaviour - was tedious and easy to get wrong. The discipline of "every schema gets registered immediately" should be established before writing the first endpoint, not retrofitted.

- **Add end-to-end tests covering the full purchase flow.** Unit and integration tests cover individual use cases and endpoints, but there are no E2E tests that walk the complete user journey: register → browse → add to cart → checkout → confirm order. That path involves coordination between auth, cart, products, and orders in a way that isolated tests cannot fully validate.

## Author

### Alberto José

- GitHub: [https://github.com/alberto-rj](https://github.com/alberto-rj)

- LinkedIn: [https://linkedin.com/in/alberto-rj](https://linkedin.com/in/alberto-rj)

- Frontend Mentor: [https://frontendmentor.io/profile/alberto-rj](https://frontendmentor.io/profile/alberto-rj)
