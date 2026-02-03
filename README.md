# Yurley-Sanchez-prueba-node

Node.js backend API with Express and Sequelize.

[Leer en Español](README.es.md)

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm
- PostgreSQL (optional, for database integration)

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## 📁 Project Structure

```
src/
├── app.js          # Express application configuration
├── config/         # Configuration files
├── controllers/    # Request handlers
├── services/       # Business logic
├── models/         # Sequelize models
└── routes/         # API routes
```

## 🔧 Environment Variables

See `.env.example` for required environment variables:

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)
- `DB_HOST`: Database host
- `DB_PORT`: Database port
- `DB_NAME`: Database name
- `DB_USER`: Database user
- `DB_PASSWORD`: Database password

## 📝 Available Endpoints

- `GET /` - API status
- `GET /health` - Health check

## 🏗️ Architecture

The project follows a layered architecture:

- **Routes**: Define API endpoints
- **Controllers**: Handle requests and responses
- **Services**: Implement business logic
- **Models**: Database entity definitions

## 📦 Dependencies

- **express**: Web framework
- **dotenv**: Environment variable management
- **sequelize**: ORM for database operations
- **pg**: PostgreSQL driver

## 🤝 Contributing

This is a test project for Node.js backend development.
