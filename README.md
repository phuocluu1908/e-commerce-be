# E-Commerce Backend Microservices

A NestJS-based microservices architecture for an e-commerce platform.

## Architecture

The backend consists of 8 microservices:

1. **API Gateway** (Port 3000) - Entry point, routes requests to appropriate services
2. **Auth Service** (Port 3001) - User authentication and JWT token management
3. **Catalog Service** (Port 3002) - Product catalog and management
4. **Cart Service** (Port 3003) - Shopping cart operations
5. **Order Service** (Port 3004) - Order creation and management
6. **Payment Service** (Port 3005) - Payment processing
7. **Inventory Service** (Port 3006) - Stock and inventory management
8. **Notification Service** (Port 3007) - Email and notifications

## Prerequisites

- Node.js 18+
- pnpm 10+
- MySQL 8+
- Redis 6+
- RabbitMQ 3+

## Installation

```bash
# Install dependencies
pnpm install

# Set up environment
cp .env.example .env.local
```

## Development

```bash
# Start all services in development mode
pnpm start:dev

# Start specific service
pnpm nx run auth-service:start:dev

# Build all services
pnpm build

# Run tests
pnpm test

# Lint
pnpm lint
```

## Services

Each service is located in `apps/[service-name]` and contains:
- `src/main.ts` - Service entry point
- `src/app.module.ts` - NestJS module configuration
- `src/app.controller.ts` - Route handlers
- `project.json` - Nx configuration

## Communication

- **HTTP/REST** - Between API Gateway and client
- **gRPC** - Inter-service communication (optional)
- **RabbitMQ** - Asynchronous message queues
- **Redis** - Caching and session management

## Database

Each service manages its own database schema. Primary tables:
- Users (Auth Service)
- Products (Catalog Service)
- Orders (Order Service)
- Payments (Payment Service)
- Inventory (Inventory Service)

## API Documentation

API Gateway exposes all service endpoints at `http://localhost:3000`

Endpoints:
- `GET /health` - Health check
- `POST /auth/*` - Authentication endpoints
- `GET /products` - Product listing
- `POST /cart/*` - Cart operations
- `POST /orders` - Order management
- `POST /payments` - Payment processing
- `GET /inventory` - Stock information

## License

MIT
