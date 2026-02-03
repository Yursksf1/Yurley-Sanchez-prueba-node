# Sequelize Models Documentation

This document describes the database models and their relationships for the application.

## Models Overview

The application consists of 8 Sequelize models representing the following entities:

1. **Category** - Product categories
2. **Product** - Products in the catalog
3. **Store** - Physical store locations
4. **ProductStock** - Inventory tracking (Product ↔ Store)
5. **Order** - Customer orders
6. **OrderProduct** - Order line items (Order ↔ Product)
7. **Promotion** - Marketing promotions
8. **StorePromotion** - Store-specific promotions (Store ↔ Promotion)

---

## Entity Relationship Diagram

```
┌──────────────┐
│   Category   │
│──────────────│
│ id (PK)      │
│ name         │
│ description  │
└──────┬───────┘
       │ 1
       │ hasMany
       │
       │ N
┌──────▼───────┐         ┌───────────────┐
│   Product    │         │     Store     │
│──────────────│         │───────────────│
│ id (PK)      │◄───N────┤ id (PK)       │
│ name         │         │ name          │
│ description  │         │ address       │
│ price        │         │ phone         │
│ categoryId   │         └───────┬───────┘
└──────┬───────┘                 │
       │                         │ 1
       │ N                       │ hasMany
       │                         │
       │                         │ N
       │         ┌───────────────▼────────┐
       └────────►│   ProductStock (Join)  │
                 │────────────────────────│
                 │ id (PK)                │
                 │ productId (FK)         │
                 │ storeId (FK)           │
                 │ quantity               │
                 └────────────────────────┘

┌──────────────┐         ┌─────────────────┐
│    Order     │         │    Product      │
│──────────────│         │─────────────────│
│ id (PK)      │◄───N────┤ id (PK)         │
│ orderNumber  │         └─────────────────┘
│ storeId (FK) │                 │
│ totalAmount  │                 │ N
│ status       │                 │
└──────┬───────┘                 │
       │                         │
       │ 1                       │
       │ hasMany                 │
       │                         │
       │ N                       │
       │         ┌───────────────▼────────┐
       └────────►│   OrderProduct (Join)  │
                 │────────────────────────│
                 │ id (PK)                │
                 │ orderId (FK)           │
                 │ productId (FK)         │
                 │ quantity               │
                 │ unitPrice              │
                 │ subtotal               │
                 └────────────────────────┘

┌──────────────┐         ┌─────────────────┐
│    Store     │         │   Promotion     │
│──────────────│         │─────────────────│
│ id (PK)      │◄───N────┤ id (PK)         │
└──────────────┘         │ name            │
       │                 │ description     │
       │ 1               │ discountPercent │
       │ hasMany         │ startDate       │
       │                 │ endDate         │
       │ N               └─────────────────┘
       │         ┌───────────────▲────────┐
       └────────►│  StorePromotion (Join) │
                 │────────────────────────│
                 │ id (PK)                │
                 │ storeId (FK)           │
                 │ promotionId (FK)       │
                 └────────────────────────┘
```

---

## Model Details

### 1. Category Model
**File:** `src/models/category.model.js`

**Purpose:** Organizes products into hierarchical categories.

**Fields:**
- `id` (INTEGER, PK, Auto-increment) - Unique identifier
- `name` (STRING, NOT NULL, UNIQUE) - Category name
- `description` (TEXT) - Category description
- `createdAt` (DATE) - Creation timestamp
- `updatedAt` (DATE) - Last update timestamp

**Relationships:**
- `hasMany` → Product (as 'products')

**Constraints:**
- Unique category names
- Cannot delete category if products exist (RESTRICT)

---

### 2. Product Model
**File:** `src/models/product.model.js`

**Purpose:** Represents products available in the catalog.

**Fields:**
- `id` (INTEGER, PK, Auto-increment) - Unique identifier
- `name` (STRING, NOT NULL) - Product name
- `description` (TEXT) - Product description
- `price` (DECIMAL(10,2), NOT NULL) - Product price (≥ 0)
- `categoryId` (INTEGER, FK) - Reference to Category
- `createdAt` (DATE) - Creation timestamp
- `updatedAt` (DATE) - Last update timestamp

**Relationships:**
- `belongsTo` → Category (as 'category')
- `belongsToMany` → Store through ProductStock (as 'stores')
- `hasMany` → ProductStock (as 'productStocks')
- `belongsToMany` → Order through OrderProduct (as 'orders')
- `hasMany` → OrderProduct (as 'orderProducts')

**Constraints:**
- Price must be ≥ 0
- If category is deleted, categoryId is set to NULL

---

### 3. Store Model
**File:** `src/models/store.model.js`

**Purpose:** Represents physical store locations.

**Fields:**
- `id` (INTEGER, PK, Auto-increment) - Unique identifier
- `name` (STRING, NOT NULL) - Store name
- `address` (STRING) - Store address
- `phone` (STRING) - Store phone number
- `createdAt` (DATE) - Creation timestamp
- `updatedAt` (DATE) - Last update timestamp

**Relationships:**
- `belongsToMany` → Product through ProductStock (as 'products')
- `hasMany` → ProductStock (as 'productStocks')
- `hasMany` → Order (as 'orders')
- `belongsToMany` → Promotion through StorePromotion (as 'promotions')
- `hasMany` → StorePromotion (as 'storePromotions')

**Constraints:**
- Cannot delete store if orders exist (RESTRICT)
- Deleting a store cascades to ProductStock and StorePromotion

---

### 4. ProductStock Model
**File:** `src/models/productStock.model.js`

**Purpose:** Junction table tracking product inventory levels at each store (Many-to-Many: Product ↔ Store).

**Fields:**
- `id` (INTEGER, PK, Auto-increment) - Unique identifier
- `productId` (INTEGER, FK, NOT NULL) - Reference to Product
- `storeId` (INTEGER, FK, NOT NULL) - Reference to Store
- `quantity` (INTEGER, NOT NULL, DEFAULT 0) - Stock quantity (≥ 0)
- `createdAt` (DATE) - Creation timestamp
- `updatedAt` (DATE) - Last update timestamp

**Relationships:**
- `belongsTo` → Product (as 'product')
- `belongsTo` → Store (as 'store')

**Constraints:**
- Unique constraint on (productId, storeId) combination
- Quantity cannot be negative
- Cascade delete when Product or Store is deleted

---

### 5. Order Model
**File:** `src/models/order.model.js`

**Purpose:** Represents customer orders placed at stores.

**Fields:**
- `id` (INTEGER, PK, Auto-increment) - Unique identifier
- `orderNumber` (STRING, NOT NULL, UNIQUE) - Unique order reference
- `storeId` (INTEGER, FK, NOT NULL) - Reference to Store
- `totalAmount` (DECIMAL(10,2), NOT NULL) - Total order amount (≥ 0)
- `status` (ENUM, NOT NULL) - Order status: 'pending', 'processing', 'completed', 'cancelled'
- `createdAt` (DATE) - Creation timestamp
- `updatedAt` (DATE) - Last update timestamp

**Relationships:**
- `belongsTo` → Store (as 'store')
- `belongsToMany` → Product through OrderProduct (as 'products')
- `hasMany` → OrderProduct (as 'orderProducts')

**Constraints:**
- Unique order number
- Cannot delete store if orders exist (RESTRICT)
- Deleting an order cascades to OrderProduct

---

### 6. OrderProduct Model
**File:** `src/models/orderProduct.model.js`

**Purpose:** Junction table representing line items in orders (Many-to-Many: Order ↔ Product).

**Fields:**
- `id` (INTEGER, PK, Auto-increment) - Unique identifier
- `orderId` (INTEGER, FK, NOT NULL) - Reference to Order
- `productId` (INTEGER, FK, NOT NULL) - Reference to Product
- `quantity` (INTEGER, NOT NULL) - Quantity ordered (≥ 1)
- `unitPrice` (DECIMAL(10,2), NOT NULL) - Price per unit at time of order (≥ 0)
- `subtotal` (DECIMAL(10,2), NOT NULL) - Line item total (≥ 0)
- `createdAt` (DATE) - Creation timestamp
- `updatedAt` (DATE) - Last update timestamp

**Relationships:**
- `belongsTo` → Order (as 'order')
- `belongsTo` → Product (as 'product')

**Constraints:**
- Quantity must be ≥ 1
- Cannot delete product if it exists in orders (RESTRICT)
- Cascade delete when Order is deleted

---

### 7. Promotion Model
**File:** `src/models/promotion.model.js`

**Purpose:** Represents marketing promotions with discount percentages.

**Fields:**
- `id` (INTEGER, PK, Auto-increment) - Unique identifier
- `name` (STRING, NOT NULL) - Promotion name
- `description` (TEXT) - Promotion description
- `discountPercent` (DECIMAL(5,2), NOT NULL) - Discount percentage (0-100)
- `startDate` (DATE, NOT NULL) - Promotion start date
- `endDate` (DATE, NOT NULL) - Promotion end date (must be after startDate)
- `createdAt` (DATE) - Creation timestamp
- `updatedAt` (DATE) - Last update timestamp

**Relationships:**
- `belongsToMany` → Store through StorePromotion (as 'stores')
- `hasMany` → StorePromotion (as 'storePromotions')

**Constraints:**
- discountPercent must be between 0 and 100
- endDate must be after startDate
- Deleting a promotion cascades to StorePromotion

---

### 8. StorePromotion Model
**File:** `src/models/storePromotion.model.js`

**Purpose:** Junction table linking promotions to specific stores (Many-to-Many: Store ↔ Promotion).

**Fields:**
- `id` (INTEGER, PK, Auto-increment) - Unique identifier
- `storeId` (INTEGER, FK, NOT NULL) - Reference to Store
- `promotionId` (INTEGER, FK, NOT NULL) - Reference to Promotion
- `createdAt` (DATE) - Creation timestamp
- `updatedAt` (DATE) - Last update timestamp

**Relationships:**
- `belongsTo` → Store (as 'store')
- `belongsTo` → Promotion (as 'promotion')

**Constraints:**
- Unique constraint on (storeId, promotionId) combination
- Cascade delete when Store or Promotion is deleted

---

## Naming Conventions

### Tables
- All table names use lowercase snake_case (e.g., `product_stocks`, `order_products`)
- Plural form for entity tables (e.g., `categories`, `products`)
- Join tables use composite names (e.g., `product_stocks`, `store_promotions`)

### Columns
- All column names use snake_case (configured with `underscored: true`)
- Foreign keys follow pattern: `{model}_id` (e.g., `category_id`, `store_id`)
- Timestamps: `created_at`, `updated_at`

### Associations
- Meaningful alias names (e.g., 'products', 'stores', 'orders')
- Consistent naming for junction table data (e.g., 'productStocks', 'orderProducts')

---

## Querying Examples

### Basic Queries

```javascript
const { Category, Product, Store, Order } = require('./src/models');

// Find all products with their category
const products = await Product.findAll({
  include: [{ model: Category, as: 'category' }]
});

// Find all stores with their products and stock levels
const stores = await Store.findAll({
  include: [{
    model: Product,
    as: 'products',
    through: { attributes: ['quantity'] }
  }]
});

// Find orders with their products
const orders = await Order.findAll({
  include: [
    { model: Store, as: 'store' },
    {
      model: Product,
      as: 'products',
      through: { attributes: ['quantity', 'unitPrice', 'subtotal'] }
    }
  ]
});
```

### Aggregation Queries

```javascript
// Total stock quantity per product across all stores
const productStocks = await Product.findAll({
  include: [{
    model: ProductStock,
    as: 'productStocks',
    attributes: []
  }],
  attributes: [
    'id',
    'name',
    [sequelize.fn('SUM', sequelize.col('productStocks.quantity')), 'totalStock']
  ],
  group: ['Product.id'],
  raw: true
});

// Total revenue per store
const storeRevenue = await Store.findAll({
  include: [{
    model: Order,
    as: 'orders',
    attributes: []
  }],
  attributes: [
    'id',
    'name',
    [sequelize.fn('SUM', sequelize.col('orders.total_amount')), 'totalRevenue']
  ],
  group: ['Store.id'],
  raw: true
});

// Most popular products by order count
const popularProducts = await Product.findAll({
  include: [{
    model: OrderProduct,
    as: 'orderProducts',
    attributes: []
  }],
  attributes: [
    'id',
    'name',
    [sequelize.fn('COUNT', sequelize.col('orderProducts.id')), 'orderCount'],
    [sequelize.fn('SUM', sequelize.col('orderProducts.quantity')), 'totalSold']
  ],
  group: ['Product.id'],
  order: [[sequelize.fn('COUNT', sequelize.col('orderProducts.id')), 'DESC']],
  limit: 10
});
```

### Complex Queries with Multiple Includes

```javascript
// Complete order details with all relationships
const orderDetails = await Order.findOne({
  where: { orderNumber: 'ORD-123' },
  include: [
    {
      model: Store,
      as: 'store',
      include: [{
        model: Promotion,
        as: 'promotions',
        through: { attributes: [] },
        where: {
          startDate: { [Op.lte]: new Date() },
          endDate: { [Op.gte]: new Date() }
        },
        required: false
      }]
    },
    {
      model: Product,
      as: 'products',
      through: {
        as: 'orderDetails',
        attributes: ['quantity', 'unitPrice', 'subtotal']
      },
      include: [{ model: Category, as: 'category' }]
    }
  ]
});

// Store inventory report with low stock alerts
const inventoryReport = await Store.findAll({
  include: [{
    model: Product,
    as: 'products',
    through: {
      as: 'stock',
      attributes: ['quantity'],
      where: { quantity: { [Op.lt]: 10 } }
    },
    include: [{ model: Category, as: 'category' }]
  }]
});
```

---

## Migration Strategy

To sync these models with the database, you can:

### Option 1: Auto-sync (Development Only)
```javascript
const { sequelize } = require('./src/models');
await sequelize.sync({ force: true }); // WARNING: Drops all tables
```

### Option 2: Migrations (Recommended)
Create Sequelize migrations for each model using sequelize-cli:

```bash
npx sequelize-cli migration:generate --name create-categories
npx sequelize-cli migration:generate --name create-products
npx sequelize-cli migration:generate --name create-stores
npx sequelize-cli migration:generate --name create-product-stocks
npx sequelize-cli migration:generate --name create-orders
npx sequelize-cli migration:generate --name create-order-products
npx sequelize-cli migration:generate --name create-promotions
npx sequelize-cli migration:generate --name create-store-promotions
```

Then run migrations:
```bash
npx sequelize-cli db:migrate
```

---

## Best Practices Implemented

1. ✅ **Explicit Relationships** - All associations are clearly defined with aliases
2. ✅ **Cascade Rules** - Proper onDelete and onUpdate behaviors
3. ✅ **Indexes** - Foreign keys and frequently queried fields are indexed
4. ✅ **Validations** - Data integrity enforced at model level
5. ✅ **Timestamps** - Automatic createdAt/updatedAt tracking
6. ✅ **Snake Case** - Database columns use snake_case convention
7. ✅ **Type Safety** - Proper Sequelize data types for all fields
8. ✅ **Constraints** - NOT NULL, UNIQUE, and DEFAULT values defined
9. ✅ **Junction Tables** - Explicit models for Many-to-Many relationships
10. ✅ **No Business Logic** - Models contain only structure and relationships

---

## Testing the Models

```javascript
// Test database connection and model loading
const { sequelize } = require('./src/models');

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✓ Database connection established');
    
    // Test model loading
    const models = Object.keys(sequelize.models);
    console.log('✓ Loaded models:', models.join(', '));
    
    return true;
  } catch (error) {
    console.error('✗ Unable to connect:', error);
    return false;
  }
}

testConnection();
```

---

## Notes

- All models use `underscored: true` for snake_case database columns
- Foreign keys follow the pattern: `{model}_id`
- Junction tables have explicit IDs for easier querying and modification
- The models support complex queries with multiple levels of includes
- Proper cascade behaviors prevent orphaned records
- Validations ensure data integrity before database operations
