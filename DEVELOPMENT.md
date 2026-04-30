# Backend Development Guide

## Overview

This is a NestJS-based microservices architecture for an e-commerce platform. The system is designed to be scalable, maintainable, and independently deployable.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     API Gateway (3000)                      │
│            Entry point for all client requests              │
└────────────┬────────────────────────────────────────────────┘
             │
    ┌────────┼─────────┬──────────┬──────────┬──────────────┐
    │        │         │          │          │              │
┌───▼──┐ ┌──▼──┐ ┌────▼──┐ ┌────▼──┐ ┌────▼───┐ ┌─────▼─┐
│Auth  │ │Cart │ │Orders │ │Payment│ │Catalog │ │Inventory
│(3001)│ │(3003)│ │(3004) │ │(3005) │ │ (3002) │ │ (3006)
└──────┘ └─────┘ └───────┘ └───────┘ └────────┘ └────────┘

              Notification Service (3007)
             (Async via RabbitMQ)
```

## Prerequisites

- Node.js 18.x or higher
- pnpm 10.x or higher
- Docker & Docker Compose
- MySQL 8.0+
- Redis 7+
- RabbitMQ 3.12+

## Quick Start

### 1. Install Dependencies

```bash
# Install all dependencies
pnpm install

# Or install specific service dependencies
cd apps/auth-service
pnpm install
```

### 2. Set Up Environment

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your configuration
```

### 3. Start Infrastructure

```bash
# Start MySQL, Redis, RabbitMQ
docker-compose up -d

# Verify services are running
docker ps

# View logs
docker-compose logs -f
```

### 4. Run Services

**Start all services in development mode:**
```bash
pnpm start:dev
```

**Start individual service:**
```bash
# Auth Service
cd apps/auth-service && pnpm start:dev

# API Gateway
cd apps/api-gateway && pnpm start:dev
```

## Service Details

### API Gateway (Port 3000)
- Entry point for all requests
- Routes requests to appropriate microservices
- Handles request/response transformation
- Authentication middleware

**Health Check:**
```bash
curl http://localhost:3000/api/health
```

### Auth Service (Port 3001)
- User registration and login
- JWT token management
- Password hashing and validation
- User profile management

**Endpoints:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile
- `POST /api/auth/refresh` - Refresh access token

### Catalog Service (Port 3002)
- Product listing and search
- Product details and descriptions
- Category management
- Product ratings and reviews

**Endpoints:**
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Cart Service (Port 3003)
- Shopping cart operations
- Cart item management
- Cart persistence in Redis

**Endpoints:**
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/remove/:itemId` - Remove item
- `PUT /api/cart/update/:itemId` - Update quantity
- `POST /api/cart/checkout` - Checkout

### Order Service (Port 3004)
- Order creation and management
- Order status tracking
- Order history

**Endpoints:**
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/cancel` - Cancel order

### Payment Service (Port 3005)
- Payment processing via Stripe
- Payment status tracking
- Refund handling

**Endpoints:**
- `POST /api/payments` - Process payment
- `GET /api/payments/:id` - Get payment details
- `POST /api/payments/:id/refund` - Refund payment
- `POST /api/payments/webhook` - Stripe webhook

### Inventory Service (Port 3006)
- Stock management
- Inventory updates
- Stock reservations

**Endpoints:**
- `GET /api/inventory` - Get inventory
- `POST /api/inventory/update` - Update stock
- `POST /api/inventory/reserve` - Reserve items
- `POST /api/inventory/release` - Release reservation

### Notification Service (Port 3007)
- Email notifications
- SMS notifications
- Async processing via RabbitMQ

**Events:**
- User registration confirmation
- Order confirmation
- Payment confirmation
- Shipment notifications

## Development Workflow

### Building Services

```bash
# Build all services
pnpm build

# Build specific service
pnpm nx run auth-service:build
```

### Testing

```bash
# Run all tests
pnpm test

# Run specific service tests
pnpm nx run auth-service:test

# Run with coverage
pnpm nx run auth-service:test -- --coverage
```

### Linting

```bash
# Lint all services
pnpm lint

# Fix linting issues
pnpm lint -- --fix
```

### Code Formatting

```bash
# Format code
pnpm format

# Check formatting
pnpm format:check
```

## Database Migrations

Each service manages its own database. Migrations are run automatically on service startup if using TypeORM.

```bash
# Generate migration
cd apps/auth-service
pnpm typeorm migration:generate

# Run migrations
pnpm typeorm migration:run
```

## Debugging

### Enable Debug Mode

```bash
# Start service with debugging
NODE_DEBUG=* pnpm start:dev

# Or in IDE (VS Code)
# Set breakpoints and press F5
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f mysql

# API Gateway
cd apps/api-gateway && pnpm start:dev
```

## Inter-Service Communication

### HTTP/REST
Services communicate synchronously via HTTP for immediate responses.

```typescript
// Example: Order Service calling Cart Service
const cartService = http.post('http://cart-service:3003/api/cart/clear');
```

### RabbitMQ/Message Queue
Asynchronous communication for events.

```typescript
// Example: Order Service publishing event
await amqpChannel.publish('orders', 'order.created', { orderId, userId });

// Notification Service consuming event
await amqpChannel.consume('orders', (msg) => {
  sendNotification(JSON.parse(msg.content));
});
```

## Monitoring

### Health Checks

```bash
# Check all services
for i in {3000..3007}; do
  echo "Port $i:"
  curl -s http://localhost:$i/api/health
done
```

### Performance Metrics

Use tools like:
- New Relic
- DataDog
- Prometheus
- Grafana

## Deployment

### Production Build

```bash
# Build Docker images
docker build -t ecommerce-api-gateway:latest -f apps/api-gateway/Dockerfile .

# Push to registry
docker push ecommerce-api-gateway:latest
```

### Kubernetes Deployment

See `k8s/` directory for Kubernetes manifests.

## Troubleshooting

### Service Won't Start

```bash
# Check logs
docker-compose logs mysql

# Verify environment variables
cat .env.local

# Check port availability
lsof -i :3001
```

### Database Connection Issues

```bash
# Verify MySQL is running
docker-compose ps mysql

# Connect to MySQL
mysql -h localhost -u ecommerce_user -p ecommerce_db

# Check database
SHOW TABLES;
```

### Redis Connection Issues

```bash
# Verify Redis is running
docker-compose ps redis

# Connect to Redis
redis-cli -h localhost -p 6379

# Test
ping
```

### RabbitMQ Issues

```bash
# Management UI
http://localhost:15672
# Username: guest, Password: guest

# Check queues
docker exec ecommerce-rabbitmq rabbitmqctl list_queues
```

## Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Microservices Architecture](https://microservices.io/)
- [RabbitMQ Guide](https://www.rabbitmq.com/getstarted.html)
- [TypeORM Documentation](https://typeorm.io/)
- [Stripe API](https://stripe.com/docs/api)

## Contributing

1. Create a feature branch
2. Make changes
3. Run tests: `pnpm test`
4. Lint: `pnpm lint`
5. Submit PR

## License

MIT
