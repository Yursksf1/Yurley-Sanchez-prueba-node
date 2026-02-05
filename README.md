# Yurley-Sanchez-prueba-node

Node.js backend API for managing products, categories, promotions, and stores using Express and Sequelize.

[Leer en Español](README.es.md)

## 📋 Description

REST API built with Node.js that provides endpoints for managing:
- Products with stock information per store
- Categories with product associations
- Promotions applicable by day of the week
- Stores and inventory management

## 🛠️ Technologies

- **Node.js** - JavaScript runtime environment
- **Express** (v5.2.1) - Web framework
- **Sequelize** (v6.37.7) - ORM for database operations
- **PostgreSQL** - Relational database
- **dotenv** - Environment variable management

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- PostgreSQL (v12 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Yurley-Sanchez-prueba-node
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:
```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=yurley_db
DB_USER=your_user
DB_PASSWORD=your_password
```

### Database Setup

#### Option 1: Using Docker (Recommended)

Create a PostgreSQL container:
```bash
docker run --name postgres-yurley \
  -e POSTGRES_USER=yurley \
  -e POSTGRES_PASSWORD=yurley123 \
  -e POSTGRES_DB=yurley_db \
  -p 5432:5432 \
  -d postgres:14
```

Update your `.env` file with these credentials:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=yurley_db
DB_USER=yurley
DB_PASSWORD=yurley123
```

#### Option 2: Using Local PostgreSQL

Create a database manually:
```sql
CREATE DATABASE yurley_db;
```

### Run Migrations

Execute migrations to create all database tables:
```bash
npx sequelize-cli db:migrate
```

### Load Test Data

Populate the database with sample data:
```bash
npx sequelize-cli db:seed:all
```

### Start the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── app.js              # Express application configuration
├── config/             # Configuration files
│   └── env.js          # Environment variables
├── controllers/        # Request handlers
│   ├── product.controller.js
│   ├── category.controller.js
│   └── promotion.controller.js
├── services/           # Business logic
│   ├── product.service.js
│   ├── category.service.js
│   └── promotion.service.js
├── models/             # Sequelize models (database entities)
│   ├── product.model.js
│   ├── category.model.js
│   ├── promotion.model.js
│   ├── store.model.js
│   ├── order.model.js
│   ├── productStock.model.js
│   ├── orderProduct.model.js
│   └── productosCategorias.model.js
├── routes/             # API route definitions
│   ├── product.routes.js
│   ├── category.routes.js
│   └── promotion.routes.js
├── middleware/         # Express middlewares
│   ├── errorHandler.js
│   ├── validation.js
│   └── notFound.js
├── migrations/         # Database migrations
└── seeders/            # Database seeders
```

## 📊 Database Structure

### Main Tables

- **productos** - Products information (id, nombre, presentacion, descripcion, barcode, etc.)
- **categorias** - Product categories (id_categoria, nombre, adultos)
- **tiendas** - Store locations (id, nombre)
- **promociones** - Promotions (id, nombre, porcentaje, dias_semana)
- **pedidos** - Orders (id, fecha, etc.)
- **productos_categorias** - Many-to-many relationship between products and categories
- **productos_stocks** - Product stock per store (id_producto, id_tienda, cantidad)
- **tiendas_promociones** - Many-to-many relationship between stores and promotions
- **pedidos_productos** - Order items (id_pedido, id_producto, cantidad)

## 📝 API Endpoints

### Health Check

#### GET `/health`
Check API health status.

**Response:**
```json
{
  "status": "ok",
  "environment": "development",
  "timestamp": "2026-02-05T14:30:00.000Z"
}
```

#### GET `/`
API root endpoint.

**Response:**
```json
{
  "message": "API is running",
  "version": "1.0.0"
}
```

### Products

#### GET `/productos`
Get all products with their stock information per store.

**Response:**
```json
{
  "message": "consultado correctamente",
  "data": [
    {
      "idProducto": 95,
      "nombre": "Gaseosa postobon",
      "presentacion": "355ml",
      "tiendas": [
        {
          "idTienda": 2,
          "nombre": "Mas x menos",
          "stock": 100
        },
        {
          "idTienda": 4,
          "nombre": "Exito",
          "stock": 250
        }
      ]
    }
  ]
}
```

#### GET `/productos/mas-vendidos`
Get the top 10 best-selling products based on order history.

**Response:**
```json
{
  "message": "consultado correctamente",
  "data": [
    {
      "idProducto": 95,
      "nombre": "Gaseosa postobon",
      "presentacion": "355ml",
      "unidadesVendidas": 150
    }
  ]
}
```

### Categories

#### GET `/categorias`
Get all categories that have at least one product, ordered by number of products (descending).

**Response:**
```json
{
  "message": "consultado correctamente",
  "data": [
    {
      "idCategoria": 18,
      "nombre": "Bebidas",
      "cantProductos": 5
    },
    {
      "idCategoria": 12,
      "nombre": "Frutas y verduras",
      "cantProductos": 3
    }
  ]
}
```

### Promotions

#### GET `/promociones?dia={day}`
Get promotions applicable for a specific day of the week and currently active in stores.

**Query Parameters:**
- `dia` or `day` (required): Day of the week as integer (1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday, 7=Sunday)

**Example:** `GET /promociones?dia=3` (Wednesday promotions)

**Response:**
```json
{
  "message": "consultado correctamente",
  "data": [
    {
      "idPromocion": 1,
      "nombre": "Miercoles Felices",
      "tiendas": [
        "Mas x menos",
        "Exito",
        "D1"
      ]
    },
    {
      "idPromocion": 5,
      "nombre": "Miercoles de 2x1",
      "tiendas": [
        "Dolar city",
        "D1"
      ]
    }
  ]
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Bad Request",
  "message": "Missing required query parameter: dia"
}
```

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=yurley_db
DB_USER=your_database_user
DB_PASSWORD=your_database_password
```

## 🏗️ Architecture

The project follows a layered architecture pattern:

- **Routes Layer**: Defines API endpoints and maps them to controllers
- **Controllers Layer**: Handles HTTP requests and responses
- **Services Layer**: Contains business logic and data processing
- **Models Layer**: Defines database entities and relationships (Sequelize ORM)
- **Middleware Layer**: Error handling, validation, and request processing

## 📦 Available Scripts

```bash
# Start the server in production mode
npm start

# Start the server in development mode
npm run dev

# Run database migrations
npx sequelize-cli db:migrate

# Run database seeders
npx sequelize-cli db:seed:all

# Undo last migration
npx sequelize-cli db:migrate:undo

# Undo all seeders
npx sequelize-cli db:seed:undo:all
```

## 📮 Testing the API

A Postman collection is included in the repository: `Yurley-API.postman_collection.json`

Import it into Postman to test all endpoints easily.

## 🔍 Technical Decisions

- **Express v5**: Latest version for better performance and modern features
- **Sequelize ORM**: Simplifies database operations and provides migrations
- **Layered Architecture**: Separation of concerns for maintainability
- **PostgreSQL**: Reliable relational database for complex queries
- **Error Handling**: Centralized error handling with custom error classes

## 📝 Notes

- All endpoints return responses with the format: `{ message: string, data: any }`
- The API uses Spanish field names in the database (productos, categorias, tiendas, promociones)
- Day of week in promotions: 1=Monday through 7=Sunday
- Stock information is stored per store in the `productos_stocks` table
- The seeder provides sample data for testing

## 🤝 Contributing

This is a test project for Node.js backend development demonstrating best practices for building REST APIs.
