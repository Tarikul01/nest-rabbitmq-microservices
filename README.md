# NestJS RabbitMQ Microservices

A robust microservices architecture built with NestJS and RabbitMQ, managed within an Nx monorepo. This project demonstrates event-driven communication, reliable messaging, and advanced error handling patterns.

## 🚀 Tech Stack

- **Framework:** [NestJS](https://nestjs.com/)
- **Monorepo Tooling:** [Nx](https://nx.dev/)
- **Language:** TypeScript
- **Message Broker:** RabbitMQ
- **Containerization:** Docker & Docker Compose
- **Key Libraries:** 
  - `@nestjs/microservices`
  - `amqplib`
  - `amqp-connection-manager`
  - `rxjs`

## 🏗 Architecture Overview

The system consists of the following services:

1.  **API Gateway:** The entry point for client requests, routing them to the appropriate backend services via RabbitMQ.
2.  **Order Service:** Manages order lifecycle and emits events when orders are created.
3.  **Payment Service:** Processes payments for orders.
4.  **Notification Service:** Handles sending notifications based on system events.

## 🐇 RabbitMQ Features

This project utilizes advanced RabbitMQ features to ensure reliable message delivery and processing:

- **Direct Exchange:** Routes messages to queues based on a specific routing key. Used for point-to-point communication.
- **Fanout Exchange:** Broadcasts messages to all bound queues. Ideal for event-driven updates where multiple services need to react to a single event (e.g., `order_created`).
- **Dead Letter Queue (DLQ):** 
  - Integrated to handle message processing failures.
  - Queues are configured with `x-dead-letter-exchange` and `x-dead-letter-routing-key`.
  - Failed or rejected messages are automatically moved to the `dead_letter_queue` for later inspection or retries.
- **Message Durability:** All queues are marked as `durable: true` to survive broker restarts.

## 🛠 Getting Started

### Prerequisites

- Node.js (v18+)
- Docker and Docker Compose
- npm or yarn

### 1. Setup Infrastructure

Start the RabbitMQ container using Docker Compose:

```bash
docker-compose up -d
```

RabbitMQ will be available at:
- **Broker:** `amqp://localhost:5672`
- **Management UI:** `http://localhost:15672` (User: `admin`, Pass: `admin`)

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Services

You can run the services individually using Nx:

```bash
# Start API Gateway
npx nx serve api-gateway

# Start Order Service
npx nx serve order-service

# Start Payment Service
npx nx serve payment-service

# Start Notification Service
npx nx serve notification-service
```

## 🐳 Docker Command Process

The `docker-compose.yml` file defines the environment for RabbitMQ. The lifecycle management includes:

- **Start:** `docker-compose up -d` (runs in detached mode).
- **Stop:** `docker-compose stop`.
- **Remove:** `docker-compose down` (stops and removes containers/networks).
- **Logs:** `docker-compose logs -f rabbitmq`.

## 🧪 Testing

Run tests for all projects:

```bash
npx nx run-many -t test
```
