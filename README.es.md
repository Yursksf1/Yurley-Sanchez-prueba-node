# Yurley-Sanchez-prueba-node

API backend en Node.js para gestionar productos, categorías, promociones y tiendas usando Express y Sequelize.

[Read in English](README.md)

## 📋 Descripción

API REST construida con Node.js que proporciona endpoints para gestionar:
- Productos con información de stock por tienda
- Categorías con asociaciones de productos
- Promociones aplicables por día de la semana
- Tiendas y gestión de inventario

## 🛠️ Tecnologías

- **Node.js** - Entorno de ejecución de JavaScript
- **Express** (v5.2.1) - Framework web
- **Sequelize** (v6.37.7) - ORM para operaciones de base de datos
- **PostgreSQL** - Base de datos relacional
- **dotenv** - Gestión de variables de entorno

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js (v14 o superior)
- npm (v6 o superior)
- PostgreSQL (v12 o superior)

### Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd Yurley-Sanchez-prueba-node
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```

Edita el archivo `.env` con tu configuración:
```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=yurley_db
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
```

### Configuración de la Base de Datos

#### Opción 1: Usando Docker (Recomendado)

Crear un contenedor de PostgreSQL:
```bash
docker run --name postgres-yurley \
  -e POSTGRES_USER=yurley \
  -e POSTGRES_PASSWORD=yurley123 \
  -e POSTGRES_DB=yurley_db \
  -p 5432:5432 \
  -d postgres:14
```

Actualiza tu archivo `.env` con estas credenciales:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=yurley_db
DB_USER=yurley
DB_PASSWORD=yurley123
```

#### Opción 2: Usando PostgreSQL Local

Crear una base de datos manualmente:
```sql
CREATE DATABASE yurley_db;
```

### Ejecutar Migraciones

Ejecuta las migraciones para crear todas las tablas de la base de datos:
```bash
npx sequelize-cli db:migrate
```

### Cargar Datos de Prueba

Poblar la base de datos con datos de ejemplo:
```bash
npx sequelize-cli db:seed:all
```

### Iniciar el Servidor

```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start
```

La API estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
src/
├── app.js              # Configuración de la aplicación Express
├── config/             # Archivos de configuración
│   └── env.js          # Variables de entorno
├── controllers/        # Manejadores de peticiones
│   ├── product.controller.js
│   ├── category.controller.js
│   └── promotion.controller.js
├── services/           # Lógica de negocio
│   ├── product.service.js
│   ├── category.service.js
│   └── promotion.service.js
├── models/             # Modelos de Sequelize (entidades de BD)
│   ├── product.model.js
│   ├── category.model.js
│   ├── promotion.model.js
│   ├── store.model.js
│   ├── order.model.js
│   ├── productStock.model.js
│   ├── orderProduct.model.js
│   └── productosCategorias.model.js
├── routes/             # Definición de rutas de la API
│   ├── product.routes.js
│   ├── category.routes.js
│   └── promotion.routes.js
├── middleware/         # Middlewares de Express
│   ├── errorHandler.js
│   ├── validation.js
│   └── notFound.js
├── migrations/         # Migraciones de base de datos
└── seeders/            # Seeders de base de datos
```

## 📊 Estructura de la Base de Datos

### Tablas Principales

- **productos** - Información de productos (id, nombre, presentacion, descripcion, barcode, etc.)
- **categorias** - Categorías de productos (id_categoria, nombre, adultos)
- **tiendas** - Ubicaciones de tiendas (id, nombre)
- **promociones** - Promociones (id, nombre, porcentaje, dias_semana)
- **pedidos** - Pedidos (id, fecha, etc.)
- **productos_categorias** - Relación muchos a muchos entre productos y categorías
- **productos_stocks** - Stock de producto por tienda (id_producto, id_tienda, cantidad)
- **tiendas_promociones** - Relación muchos a muchos entre tiendas y promociones
- **pedidos_productos** - Items de pedidos (id_pedido, id_producto, cantidad)

## 📝 Endpoints de la API

### Health Check

#### GET `/health`
Verifica el estado de salud de la API.

**Respuesta:**
```json
{
  "status": "ok",
  "environment": "development",
  "timestamp": "2026-02-05T14:30:00.000Z"
}
```

#### GET `/`
Endpoint raíz de la API.

**Respuesta:**
```json
{
  "message": "API is running",
  "version": "1.0.0"
}
```

### Productos

#### GET `/productos`
Obtiene todos los productos con su información de stock por tienda.

**Respuesta:**
```json
{
  "message": "consultado correctamente",
  "data": [
    {
      "id": 95,
      "nombre": "Gaseosa postobon",
      "presentacion": "355ml",
      "descripcion": null,
      "barcode": null,
      "productosStocks": [
        {
          "id_tienda": 2,
          "cantidad": 100,
          "Tienda": {
            "id": 2,
            "nombre": "Mas x menos"
          }
        },
        {
          "id_tienda": 4,
          "cantidad": 250,
          "Tienda": {
            "id": 4,
            "nombre": "Exito"
          }
        }
      ]
    }
  ]
}
```

#### GET `/productos/mas-vendidos`
Obtiene los 10 productos más vendidos basado en el historial de pedidos.

**Respuesta:**
```json
{
  "message": "consultado correctamente",
  "data": [
    {
      "id": 95,
      "nombre": "Gaseosa postobon",
      "presentacion": "355ml",
      "total_vendido": 150
    }
  ]
}
```

### Categorías

#### GET `/categorias`
Obtiene todas las categorías que tienen al menos un producto, ordenadas por número de productos.

**Respuesta:**
```json
{
  "message": "consultado correctamente",
  "data": [
    {
      "id_categoria": 18,
      "nombre": "Bebidas",
      "adultos": 0,
      "producto_count": 5
    },
    {
      "id_categoria": 12,
      "nombre": "Frutas y verduras",
      "adultos": 0,
      "producto_count": 3
    }
  ]
}
```

### Promociones

#### GET `/promociones?dia={day}`
Obtiene las promociones aplicables para un día específico de la semana.

**Parámetros de Query:**
- `dia` o `day` (requerido): Día de la semana como entero (1=Lunes, 2=Martes, 3=Miércoles, 4=Jueves, 5=Viernes, 6=Sábado, 7=Domingo)

**Ejemplo:** `GET /promociones?dia=3` (promociones del miércoles)

**Respuesta:**
```json
{
  "message": "consultado correctamente",
  "data": [
    {
      "id": 1,
      "nombre": "Miercoles Felices",
      "porcentaje": 10,
      "dias_semana": "3",
      "TiendasPromociones": [
        {
          "id_tienda": 2,
          "Tienda": {
            "id": 2,
            "nombre": "Mas x menos"
          }
        },
        {
          "id_tienda": 4,
          "Tienda": {
            "id": 4,
            "nombre": "Exito"
          }
        }
      ]
    }
  ]
}
```

**Respuesta de Error (400):**
```json
{
  "success": false,
  "error": "Bad Request",
  "message": "Missing required query parameter: dia"
}
```

## 🔧 Variables de Entorno

Crea un archivo `.env` en el directorio raíz con las siguientes variables:

```env
# Configuración del Servidor
PORT=3000
NODE_ENV=development

# Configuración de Base de Datos
DB_HOST=localhost
DB_PORT=5432
DB_NAME=yurley_db
DB_USER=tu_usuario_de_base_de_datos
DB_PASSWORD=tu_contraseña_de_base_de_datos
```

## 🏗️ Arquitectura

El proyecto sigue un patrón de arquitectura en capas:

- **Capa de Rutas**: Define los endpoints de la API y los mapea a controladores
- **Capa de Controladores**: Maneja las peticiones y respuestas HTTP
- **Capa de Servicios**: Contiene la lógica de negocio y procesamiento de datos
- **Capa de Modelos**: Define las entidades de base de datos y relaciones (ORM Sequelize)
- **Capa de Middleware**: Manejo de errores, validación y procesamiento de peticiones

## 📦 Scripts Disponibles

```bash
# Iniciar el servidor en modo producción
npm start

# Iniciar el servidor en modo desarrollo
npm run dev

# Ejecutar migraciones de base de datos
npx sequelize-cli db:migrate

# Ejecutar seeders de base de datos
npx sequelize-cli db:seed:all

# Deshacer última migración
npx sequelize-cli db:migrate:undo

# Deshacer todos los seeders
npx sequelize-cli db:seed:undo:all
```

## 📮 Pruebas de la API

Se incluye una colección de Postman en el repositorio: `Yurley-API.postman_collection.json`

Impórtala en Postman para probar todos los endpoints fácilmente.

## 🔍 Decisiones Técnicas

- **Express v5**: Última versión para mejor rendimiento y características modernas
- **Sequelize ORM**: Simplifica operaciones de base de datos y proporciona migraciones
- **Arquitectura en Capas**: Separación de responsabilidades para mantenibilidad
- **PostgreSQL**: Base de datos relacional confiable para consultas complejas
- **Manejo de Errores**: Manejo centralizado de errores con clases de error personalizadas

## 📝 Notas

- Todos los endpoints retornan respuestas con el formato: `{ message: string, data: any }`
- La API usa nombres de campos en español en la base de datos (productos, categorias, tiendas, promociones)
- Día de la semana en promociones: 1=Lunes hasta 7=Domingo
- La información de stock se almacena por tienda en la tabla `productos_stocks`
- El seeder proporciona datos de ejemplo para pruebas

## 🤝 Contribución

Este es un proyecto de prueba para desarrollo backend con Node.js que demuestra las mejores prácticas para construir APIs REST.
