<div align="center">

# Audiophile (In Development)

A full-stack e-commerce platform for premium audio equipment featuring authentication, shopping cart management, product catalog, order processing, responsive design, and a REST API built with TypeScript.

[Live Demo (coming soon)](#)
•
[API Docs](#api-documentation)
•
[Source Code](https://github.com/alberto-rj/audiophile)

</div>

## About The Project

Audiophile is a full-stack e-commerce platform inspired by a real-world online store for high-end audio products.

The project was built to practice production-oriented frontend and backend development, focusing on authentication, shopping cart management, API design, validation, accessibility, and scalable application architecture.

Rather than focusing only on features, the main goal was to build a system with clear separation of concerns, reusable business logic, and maintainable code that could realistically evolve into a larger application.

## Screenshots

### Home Page

![Image](./screenshots/desktop-home-page.png)

### Product Details

![Image](./screenshots/desktop-product-details-page.png)

### Shopping Cart

![Image](./screenshots/desktop-shopping-cart.png)

### Checkout Flow

![Image](./screenshots/desktop-checkout-page.png)

### Mobile Experience

![Image](./screenshots/mobile-categories-page.png)

## Live Demo

- **Frontend:** https://your-demo.vercel.app

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
│ Validation (Zod)   │
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

The business rules live entirely inside use cases, allowing repositories, databases, and HTTP implementations to be swapped without affecting application logic.

## Tech Stack

### Frontend

- React 19
- Tailwind
- TypeScript
- Redux Toolkit
- RTK Query
- React Router
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
- OpenAPI / Swagger

### Database

- PostgreSQL
- Repository Pattern
- In-Memory Repositories (Testing)

### Tooling

- ESLint
- Prettier
- GitHub
- Vite

## Key Features

### Authentication

- User registration
- Login
- Logout
- Refresh token flow
- Protected routes

### User Management

- View profile
- Update profile information

### Shopping Experience

- Product catalog
- Product details page
- Responsive gallery
- Shopping cart
- Checkout flow

### Developer Experience

- Auto-generated OpenAPI documentation
- Shared validation schemas
- In-memory repositories
- Mock Service Worker integration
- Storybook component documentation

## Technical Decisions

### Repository Pattern

The API depends on repository interfaces rather than concrete implementations.

This allows business logic to remain independent from the persistence layer and makes testing significantly easier.

Current implementations include:

- In-memory repositories
- Database repositories (planned)

This approach makes replacing PostgreSQL, Prisma, or any other persistence solution straightforward.

### Zod as a Single Source of Truth

All request and response contracts are defined with Zod schemas.

Benefits:

- Runtime validation
- Strong TypeScript inference
- Consistent API contracts
- OpenAPI documentation generation

This avoids duplicated validation logic and reduces maintenance overhead.

### Use Cases Over Fat Controllers

Controllers are intentionally thin.

Their responsibilities are limited to:

- Parsing requests
- Calling use cases
- Returning responses

Business rules live inside dedicated use cases, making them easier to test and reuse.

### RTK Query for Server State

The frontend uses RTK Query instead of manually managing loading and caching logic.

Benefits include:

- Automatic caching
- Request deduplication
- Optimistic updates
- Built-in loading and error states

This reduced boilerplate significantly compared to traditional Redux approaches.

### HTTP-Only Authentication Cookies

Authentication tokens are stored in HTTP-only cookies rather than localStorage.

Benefits:

- Better protection against XSS attacks
- Improved security for authentication flows
- More realistic production setup

The tradeoff is a slightly more complex refresh token implementation.

## Project Structure

### Frontend

```bash
src/
├── app/
├── components/
├── hooks/
├── pages/
├── layouts/
├── mocks/
├── libs/
└── assets/
```

### Backend

```bash
src/
├── config/
├── helpers/
├── http/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   └── openapi/
├── repositories/
├── schemas/
└── use-cases/
```

## Running Locally

```bash
git clone https://github.com/alberto-rj/audiophile.git

cd audiophile
```

### Backend

Terminal 1

```bash
cd backend

npm install

cp .env.example .env

npm run dev
```

Backend:
http://localhost:4224

### Frontend

Terminal 2

```bash
cd frontend

npm install

cp .env.example .env

npm run dev
```

Frontend:
http://localhost:5173

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
POSTGRES_USER=user_example
POSTGRES_PASSWORD=password_example

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

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

`frontend/.env.example`:

```env

VITE_NODE_ENV=development

VITE_API_BASE_URL=/api
```

## API Documentation

Swagger UI is automatically generated from the OpenAPI registry.

After starting the backend:

```bash
http://localhost:4224/api-docs
```

This keeps validation rules and documentation synchronized.

## Engineering Highlights

This project was intentionally designed with software engineering practices commonly found in production applications rather than focusing exclusively on features.

Highlights include:

- Layered backend architecture (Controllers → Use Cases → Repositories)
- Repository Pattern with swappable implementations
- JWT authentication with refresh token rotation
- HTTP-only cookie authentication
- OpenAPI documentation generated from source schemas
- Shared validation through Zod
- RTK Query for server-state management
- Storybook for component development
- Mock Service Worker for frontend isolation and testing
- In-memory repositories for fast and deterministic tests

## What I Learned

Building Audiophile taught me that application architecture becomes increasingly important as a project grows.

The most valuable lessons were:

- Designing backend systems around use cases rather than framework code
- Keeping business logic independent from Express and database implementations
- Managing authentication securely using HTTP-only cookies and refresh tokens
- Treating validation schemas as a single source of truth
- Building reusable UI systems with Storybook
- Separating client state from server state using RTK Query

If I started the project again today, I would introduce the PostgreSQL layer earlier and add end-to-end testing from the beginning to validate the complete purchase flow.

## Future Improvements

- PostgreSQL persistence layer
- Drizzle ORM integration
- Order management system
- Payment gateway integration
- Product reviews
- Admin dashboard
- CI/CD pipeline
- Docker support
- End-to-end testing

## Author

### Alberto José

- GitHub: [https://github.com/alberto-rj](https://github.com/alberto-rj)

- LinkedIn: [https://linkedin.com/in/alberto-rj](https://linkedin.com/in/alberto-rj)

- Frontend Mentor: [https://frontendmentor.io/profile/alberto-rj](https://frontendmentor.io/profile/alberto-rj)
