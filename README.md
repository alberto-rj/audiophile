<div align="center">

# Audiophile (In Development)

A full-stack e-commerce platform built with React, Node.js, TypeScript, and PostgreSQL.

[Live Demo](https://audiophile-frontend-v2.vercel.app)
•
[UI Docs](https://6a5a9bf0a697b58da824c52f-kkxizcouyr.chromatic.com)
•
[API Docs](https://audiophile-qoxm.onrender.com/api-docs)
•
[Source Code](https://github.com/alberto-rj/audiophile)

</div>

## About the Project

Audiophile is a full-stack e-commerce platform for premium audio products, originally created as a Frontend Mentor challenge and expanded into a complete application with authentication, product management, cart functionality, checkout flow, order processing, and a documented REST API.

The backend follows a layered architecture separating HTTP concerns, business logic, and data access, with type-safe validation shared between API contracts and documentation. The frontend is built around reusable, accessible components with a clear separation between server state and client state.

## Architecture Overview

```text
┌─────────────────────────────────┐
│         React Client            │
│  Redux Toolkit · RTK Query      │
└────────────────┬────────────────┘
                 │ HTTP / REST
                 ▼
┌─────────────────────────────────┐
│          Express API            │
│                                 │
│  Controllers                    │
│       ↓                         │
│  Use Cases                      │
│       ↓                         │
│  Repository Interfaces          │
└──────┬──────────────────┬───────┘
       │                  │
       ▼                  ▼
┌─────────────┐    ┌─────────────┐
│  PostgreSQL │    │  Cloudinary │
│ Drizzle ORM │    │ Image Store │
└─────────────┘    └─────────────┘
```

## Tech Stack

### Frontend

- React
- TypeScript
- Redux Toolkit
- React Router
- Tailwind CSS
- Radix UI
- React Hook Form
- Zod (Forms & Shared Schemas)
- Storybook
- MSW

### Backend

- Node.js
- Express.js
- TypeScript
- Zod
- JWT Authentication
- Cloudinary
- OpenAPI/Swagger
- PostgreSQL & Drizzle ORM

### Tooling

- ESLint
- Prettier
- Vite

## Key Technical Decisions

- **Repository pattern with swappable implementations:** The API depends on repository interfaces, not concrete classes. Every use case receives its dependencies via injection - in tests and early development, those are in-memory implementations; in production, they are Drizzle/PostgreSQL implementations.

- **Dual-token authentication:** Authentication uses a short-lived JWT access token together with a long-lived refresh token. The access token is returned to the client and attached to authenticated requests. The refresh token is an opaque UUID, persisted in the database and stored in an HTTP-only cookie - server-managed, revocable, and inaccessible to client-side JavaScript.

- **`zod-to-openapi` as a single source of truth:** Every request and response schema is a Zod schema registered with `@asteasolutions/zod-to-openapi`. The OpenAPI 3.1 spec and Swagger UI are generated from those registrations at startup - runtime validation and documentation are the same artifact.

- **`AsyncLocalStorage` for request context propagation:** Per-request context (user ID, correlation ID) is stored in Node's `AsyncLocalStorage` after the auth middleware runs. Downstream helpers - the logger, use cases, and presenters - read from context without needing it threaded through every function signature.

- **Cloudinary `publicId` stored in the database, URLs built at the presenter layer:** Only the `publicId` is persisted. Presenters construct responsive image URLs (size variants, format conversions, transformations) at response time, keeping the database decoupled from Cloudinary's URL structure.

- **RTK Query for all server state:** The frontend uses RTK Query instead of manual fetch + useEffect patterns - automatic caching, request deduplication, and built-in loading and error states. Server state (RTK Query) and client state (Redux slices) are kept strictly separate.

- **Radix UI as the accessibility foundation:** Interactive components are built on Radix UI primitives, which provide keyboard navigation, focus management, and ARIA attributes out of the box. The application exposes its own component API on top, with a consistent visual design.

- **MSW for mock-driven frontend development:** Mock Service Worker intercepts requests at the network level. The frontend and all Storybook stories run without a backend — MSW handlers mirror real API contracts, so switching to live responses requires no changes to components or hooks.

- **Lazy-loaded routes and consistent async states:** Routes are lazy-loaded to reduce initial bundle size. Loading, validation, empty, error, and success states are handled consistently across the main async flows (authentication, cart, checkout, profile updates).

## Running Locally

**Prerequisites:**

- Node.js 20+
- PostgreSQL instance
- Cloudinary account (free tier is sufficient)

```bash
git clone https://github.com/alberto-rj/audiophile.git
cd audiophile
```

### Backend (Setup)

```bash
cd backend
npm install
cp .env.example .env   # Fill in the required variables (see Environment Variables below)
npm run dev            # API runs at http://localhost:4224 | Documentation at /api-docs
```

**Uploading images (first time only):** requires local images in `public/assets/`. This is only necessary if you are using your own Cloudinary account - the public IDs in `@/db/mocks/categories.mock.json`, `@/db/mocks/products.mock.json`, and `@/db/mocks/galleries.mock.json` are deterministic and derived from the filenames, so they do not need to be updated.

```bash
npm run upload
```

**Run migrations and seed the database:**

```bash
npm run db:migrate   # Apply schema migrations
npm run db:seed      # Seed categories and products
```

### Frontend (Setup)

Open a second terminal:

```bash
cd frontend
npm install
cp .env.example .env       # Fill in the required variables (see Environment Variables below)
npm run dev                # Vite server runs at http://localhost:5173
npm run storybook          # Optional: Visual component testing workspace at http://localhost:6006
```

## Environment Variables

### Backend (`backend/.env`)

| Variable                | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| `NODE_ENV`              | Application environment (`development`, `production`, etc.). |
| `PORT`                  | Backend server port.                                         |
| `DEV_API_BASE_URL`      | API base URL used during local development.                  |
| `PROD_API_BASE_URL`     | API base URL used in production.                             |
| `DATABASE_URL`          | PostgreSQL connection string.                                |
| `ACCESS_SECRET`         | Secret key used to sign JWT access tokens.                   |
| `ACCESS_EXPIRES_MS`     | Access token expiration time in milliseconds.                |
| `REFRESH_EXPIRES_MS`    | Refresh token expiration time in milliseconds.               |
| `LOG_REQUEST_BODY`      | Enables or disables request body logging.                    |
| `LOG_REQUEST_HEADER`    | Enables or disables request header logging.                  |
| `CORS_ORIGINS`          | Allowed origins for cross-origin requests.                   |
| `CORS_METHODS`          | Allowed HTTP methods for CORS requests.                      |
| `CORS_HEADERS`          | Allowed HTTP headers for CORS requests.                      |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud identifier.                                 |
| `CLOUDINARY_API_KEY`    | Cloudinary API key.                                          |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret.                                       |

### Frontend (`frontend/.env`)

| Variable            | Description                                 |
| ------------------- | ------------------------------------------- |
| `VITE_NODE_ENV`     | Frontend application environment.           |
| `VITE_API_BASE_URL` | Backend API base path used by the frontend. |

## Lessons Learned

- **Introduce the database layer earlier:** I intentionally started with in-memory repositories to focus on business logic before persistence. In hindsight, designing the database schema alongside the domain model would have exposed relationships and migration issues much earlier.

- **Define repository interfaces before implementations:** On several entities I wrote the Drizzle implementation first and extracted the interface afterwards. The correct order is the reverse: write the interface as a contract, then write both the in-memory and Drizzle implementations to satisfy it. Working implementation-first led to interfaces that were slightly too specific to Drizzle's return shapes, which the in-memory implementations then had to work around.

- **Register every Zod schema with the OpenAPI registry from the start:** Some early schemas were written without `registry.register(...)`. Going back to register them later - and verifying the generated spec matched the actual behavior - was tedious and easy to get wrong. The discipline of "every schema gets registered immediately" should be established before writing the first endpoint, not retrofitted.

- **Add automated tests beyond Storybook/MSW:** Storybook + MSW currently cover component interaction and visual testing, but there are no unit tests for use cases, no integration tests for endpoints (Supertest), and no end-to-end tests covering the full purchase flow (register → browse → add to cart → checkout → confirm order). This is the main gap left to close.

## Author

### Alberto José

- GitHub: [github.com/alberto-rj](https://github.com/alberto-rj)
- LinkedIn: [linkedin.com/in/alberto-rj](https://linkedin.com/in/alberto-rj)
- Frontend Mentor: [frontendmentor.io/profile/alberto-rj](https://frontendmentor.io/profile/alberto-rj)
