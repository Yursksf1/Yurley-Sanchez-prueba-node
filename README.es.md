# Yurley-Sanchez-prueba-node

API backend en Node.js con Express y Sequelize.

[Read in English](README.md)

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js (v14 o superior)
- npm
- PostgreSQL (opcional, para integración con base de datos)

### Instalación

1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
# Editar .env con tu configuración
```

4. Iniciar el servidor:
```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## 📁 Estructura del Proyecto

```
src/
├── app.js          # Configuración de la aplicación Express
├── config/         # Archivos de configuración
├── controllers/    # Manejadores de peticiones
├── services/       # Lógica de negocio
├── models/         # Modelos de Sequelize
└── routes/         # Rutas de la API
```

## 🔧 Variables de Entorno

Ver `.env.example` para las variables de entorno requeridas:

- `PORT`: Puerto del servidor (por defecto: 3000)
- `NODE_ENV`: Entorno (development/production)
- `DB_HOST`: Host de la base de datos
- `DB_PORT`: Puerto de la base de datos
- `DB_NAME`: Nombre de la base de datos
- `DB_USER`: Usuario de la base de datos
- `DB_PASSWORD`: Contraseña de la base de datos

## 📝 Endpoints Disponibles

- `GET /` - Estado de la API
- `GET /health` - Verificación de salud

## 🏗️ Arquitectura

El proyecto sigue una arquitectura en capas:

- **Routes (Rutas)**: Definen los endpoints de la API
- **Controllers (Controladores)**: Manejan peticiones y respuestas
- **Services (Servicios)**: Implementan la lógica de negocio
- **Models (Modelos)**: Definiciones de entidades de base de datos

## 📦 Dependencias

- **express**: Framework web
- **dotenv**: Gestión de variables de entorno
- **sequelize**: ORM para operaciones de base de datos
- **pg**: Driver de PostgreSQL

## 🤝 Contribución

Este es un proyecto de prueba para desarrollo backend con Node.js.
