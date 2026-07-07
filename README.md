<div align="center">

# Audiophile (In Development)

A full-stack e-commerce platform built with React, Node.js, TypeScript, and PostgreSQL, focusing on scalable architecture, API design, accessibility, and modern software engineering practices.

[Live Demo](https://audiophile-frontend-v2.vercel.app)
•
[API Docs](https://audiophile-qoxm.onrender.com/api-docs)
•
[Source Code](https://github.com/alberto-rj/audiophile)

</div>

## About the Project

Audiophile is a full-stack e-commerce platform for premium audio products, originally created as a Frontend Mentor challenge and expanded into a complete application.

The project focuses on production-oriented software engineering practices, including layered architecture, reusable components, API design, accessibility, and maintainable code organization.

It includes authentication, product management, cart functionality, checkout flow, order processing, and a documented REST API.

## Design Goals

The project focuses on:

- Clean separation between business logic and infrastructure
- Reusable and accessible frontend components
- Type-safe validation and API contracts
- Maintainable architecture and developer experience

## Architecture Overview

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

The backend follows a layered architecture separating HTTP concerns, business logic, and data access.

Use cases are framework-independent and rely on repository interfaces, allowing different implementations for production and testing environments.

## Tech Stack

### Frontend

- React
- TypeScript
- Redux Toolkit
- React Router
- Tailwind CSS
- React Hook Form
- Zod (Forms & Shared Schemas)
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

## Key Technical Decisions

- **Repository pattern with swappable implementations:** The API depends on repository interfaces, not concrete classes. Every use case receives its dependencies via injection - in tests, those are in-memory implementations; in production, they are Drizzle/PostgreSQL implementations. This means business logic is never coupled to a specific database, ORM, or infrastructure detail.

- **Dual-token authentication:** Authentication uses a short-lived JWT access token together with a long-lived refresh token. The access token is returned to the client and attached to authenticated API requests. The refresh token is generated as an opaque UUID, persisted in the database, and stored in an HTTP-only cookie. Because refresh tokens are server-managed, they can be revoked independently of JWT expiration while remaining inaccessible to client-side JavaScript. This provides a balance between security, user experience, and session management.

- **`zod-to-openapi` as a single source of truth:** Every request and response schema is a Zod schema registered with `@asteasolutions/zod-to-openapi`. The OpenAPI 3.1 spec and the Swagger UI are generated from those registrations at startup. This means runtime validation and documentation are the same artifact - changing a schema updates both simultaneously, with no risk of the spec drifting from the actual API behavior.

- **`AsyncLocalStorage` for request context propagation:** Rather than threading `userId` and request metadata through every function signature, the backend uses Node's `AsyncLocalStorage` to store per-request context after authentication. Downstream helpers (logger, use cases, presenters) read from context when they need it. This keeps function signatures clean and makes structured logging with per-request correlation IDs straightforward.

- **Cloudinary `publicId` stored in the database, URLs built at the presenter layer:** Rather than storing full URLs, only the Cloudinary `publicId` is persisted. The presenter constructs responsive image URLs (different sizes, formats, transformations) at response time. This decouples the database from Cloudinary's URL structure - a CDN migration or image transformation change requires updating the presenter, not the database.

- **RTK Query for all server state:** The frontend uses RTK Query instead of manual fetch + `useEffect` patterns. This gives automatic caching, request deduplication, built-in loading/error states, and optimistic updates without custom reducer logic. It also created a clear boundary between server state (RTK Query) and client state (Redux slices), which kept the cart and auth logic simpler than a mixed approach would have been.

- **Radix UI as the accessibility foundation:** Rather than building complex interactive components from scratch, the frontend is built on top of Radix UI primitives. This provides accessible behaviors such as focus management, keyboard navigation, and ARIA support out of the box, while allowing the application to expose its own reusable component API and consistent visual design. This approach reduces implementation complexity without sacrificing accessibility or maintainability.

## Frontend Architecture

The frontend was designed with the same engineering principles applied to the backend, prioritizing maintainability, accessibility, consistency, and developer experience over simply implementing features.

- **Component Architecture:** The application is built around reusable UI primitives and composite widgets. Complex components are implemented on top of Radix UI primitives, providing a consistent API while preserving accessible behaviors such as keyboard navigation, focus management, and screen reader support. Reusable components are documented and developed in isolation using Storybook, making them easier to validate, maintain, and reuse across the application.

- **State Management:** Server state is managed exclusively with RTK Query, providing automatic caching, request deduplication, optimistic updates, and consistent loading and error handling. Client state (authentication, shopping cart, UI preferences) is managed separately with Redux Toolkit, creating a clear boundary between server and client concerns.

- **User Experience:** The application provides consistent asynchronous experiences by handling loading, validation, empty, error, and success states across data fetching and user actions such as authentication, checkout, cart management, and profile updates. Routes are lazy-loaded to improve perceived performance.

- **Accessibility:** Rather than implementing accessibility features from scratch, the project builds upon Radix UI's accessible primitives, extending them into reusable application-specific components. Additional accessibility practices include semantic HTML, descriptive labels, screen-reader-only content where appropriate, and accessible navigation patterns throughout the interface.

- **Development Experience:** Mock Service Worker (MSW) is used to simulate backend APIs, allowing frontend development, Storybook stories, and component testing to run independently of backend availability. This enables faster iteration while keeping API interactions realistic.

## Running Locally

**Prerequisites:**

- Node.js 20+
- PostgreSQL
- Cloudinary account (free tier is sufficient)

```bash
git clone https://github.com/alberto-rj/audiophile.git
cd audiophile
```

### Backend Server Setup

```bash
cd backend
npm install
cp .env.example .env   # Fill in the required variables (see Environment Variables below)
npm run dev            # API runs at http://localhost:4224 | Documentation at /api-docs
```

| URL                              | Description |
| -------------------------------- | ----------- |
| `http://localhost:4224`          | REST API    |
| `http://localhost:4224/api-docs` | Swagger UI  |

**Uploading images (first time only):** requires local images in `public/assets/`. This is only necessary if you are using your own Cloudinary account - the public IDs in `@/db/mocks/categories.mock.json`, `@/db/mocks/products.mock.json`, and `@/db/mocks/galleries.mock.json` are deterministic and derived from the filenames, so they do not need to be updated.

```bash
npm run upload
```

**Run migrations and seed the database:**

```bash
npm run db:migrate   # Apply schema migrations
npm run db:seed      # Seed categories and products
```

### Frontend Application Setup

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

- **Add end-to-end tests covering the full purchase flow:** Unit and integration tests cover individual use cases and endpoints, but there are no E2E tests that walk the complete user journey: register → browse → add to cart → checkout → confirm order. That path involves coordination between auth, cart, products, and orders in a way that isolated tests cannot fully validate.

## Author

### Alberto José

- GitHub: [github.com/alberto-rj](https://github.com/alberto-rj)
- LinkedIn: [linkedin.com/in/alberto-rj](https://linkedin.com/in/alberto-rj)
- Frontend Mentor: [frontendmentor.io/profile/alberto-rj](https://frontendmentor.io/profile/alberto-rj)
