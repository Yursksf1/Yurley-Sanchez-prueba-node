# Sequelize Models - Quick Start Guide

## ✅ What Has Been Implemented

All 8 Sequelize models have been created in `src/models/`:

1. ✅ `category.model.js` - Product categories
2. ✅ `product.model.js` - Products with pricing
3. ✅ `store.model.js` - Physical store locations
4. ✅ `productStock.model.js` - Product inventory per store
5. ✅ `order.model.js` - Customer orders
6. ✅ `orderProduct.model.js` - Order line items
7. ✅ `promotion.model.js` - Marketing promotions
8. ✅ `storePromotion.model.js` - Store-specific promotions

## 📂 Files Created

```
src/models/
├── index.js (existing - auto-loads all models)
├── category.model.js ✅
├── product.model.js ✅
├── store.model.js ✅
├── productStock.model.js ✅
├── order.model.js ✅
├── orderProduct.model.js ✅
├── promotion.model.js ✅
└── storePromotion.model.js ✅

Documentation:
├── MODELS_DOCUMENTATION.md (18KB comprehensive guide)
├── MODEL_RELATIONSHIPS.txt (relationship summary)
└── QUICK_START.md (this file)
```

## 🚀 Quick Start

### 1. Install Dependencies (if not done)
```bash
npm install
```

### 2. Set Up Environment Variables
Create `.env` file with database credentials:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database
DB_USER=your_user
DB_PASSWORD=your_password
```

### 3. Load Models in Your Code
```javascript
const { 
  Category, 
  Product, 
  Store, 
  ProductStock,
  Order, 
  OrderProduct,
  Promotion,
  StorePromotion,
  sequelize 
} = require('./src/models');
```

### 4. Sync Database (Development Only)
```javascript
// WARNING: Use migrations in production!
await sequelize.sync({ alter: true });
```

### 5. Create Sample Data
```javascript
// Create a category
const category = await Category.create({
  name: 'Electronics',
  description: 'Electronic products'
});

// Create a product
const product = await Product.create({
  name: 'Laptop',
  description: 'High-performance laptop',
  price: 999.99,
  categoryId: category.id
});

// Create a store
const store = await Store.create({
  name: 'Main Street Store',
  address: '123 Main St',
  phone: '555-0100'
});

// Add stock
await ProductStock.create({
  productId: product.id,
  storeId: store.id,
  quantity: 50
});

// Create an order
const order = await Order.create({
  orderNumber: 'ORD-001',
  storeId: store.id,
  totalAmount: 999.99,
  status: 'pending'
});

// Add product to order
await OrderProduct.create({
  orderId: order.id,
  productId: product.id,
  quantity: 1,
  unitPrice: 999.99,
  subtotal: 999.99
});

// Create and apply promotion
const promotion = await Promotion.create({
  name: 'Summer Sale',
  description: '20% off all electronics',
  discountPercent: 20.00,
  startDate: new Date('2024-06-01'),
  endDate: new Date('2024-08-31')
});

await StorePromotion.create({
  storeId: store.id,
  promotionId: promotion.id
});
```

## 🔍 Common Queries

### Get Products with Categories
```javascript
const products = await Product.findAll({
  include: [{ 
    model: Category, 
    as: 'category' 
  }]
});
```

### Get Store Inventory
```javascript
const inventory = await Store.findByPk(storeId, {
  include: [{
    model: Product,
    as: 'products',
    through: { 
      attributes: ['quantity'],
      as: 'stock' 
    }
  }]
});
```

### Get Order Details
```javascript
const orderDetails = await Order.findOne({
  where: { orderNumber: 'ORD-001' },
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

### Get Active Promotions for a Store
```javascript
const activePromotions = await Store.findByPk(storeId, {
  include: [{
    model: Promotion,
    as: 'promotions',
    where: {
      startDate: { [Op.lte]: new Date() },
      endDate: { [Op.gte]: new Date() }
    }
  }]
});
```

## 📊 Key Features

### ✅ Proper Associations
- All Many-to-Many relationships use explicit junction tables
- Foreign keys properly defined with references
- Cascade behaviors configured (CASCADE, RESTRICT, SET NULL)

### ✅ Data Validation
- Required fields marked as NOT NULL
- Numeric fields validated (min/max ranges)
- ENUM types for status fields
- Custom validation rules (e.g., endDate > startDate)

### ✅ Performance Optimizations
- Indexes on foreign keys
- Indexes on frequently queried fields
- Composite unique indexes on junction tables
- Support for eager loading and aggregations

### ✅ Database Best Practices
- snake_case column names (underscored: true)
- Timestamps on all tables
- Proper data types (DECIMAL for money, TEXT for long strings)
- Unique constraints where needed

## 📚 Documentation Files

- **MODELS_DOCUMENTATION.md** - Comprehensive documentation with:
  - Entity Relationship Diagrams
  - Detailed model specifications
  - Query examples
  - Aggregation patterns
  - Migration strategies

- **MODEL_RELATIONSHIPS.txt** - Quick reference for:
  - Relationship overview
  - Table structures
  - Cascade behaviors
  - Index definitions
  - Validation rules

## 🔄 Next Steps

### 1. Create Migrations
```bash
npx sequelize-cli migration:generate --name create-all-tables
```

### 2. Add Seeders (Optional)
```bash
npx sequelize-cli seed:generate --name demo-data
```

### 3. Create Services/Controllers
- Implement business logic in service layer
- Create RESTful API endpoints
- Add authentication/authorization

### 4. Test the Models
```javascript
// Test database connection
const { sequelize } = require('./src/models');

async function test() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection successful');
    
    // List loaded models
    const models = Object.keys(sequelize.models);
    console.log('📦 Models:', models.join(', '));
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

test();
```

## 🎯 Usage Pattern

All models follow Sequelize 6.x pattern:
```javascript
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('ModelName', {
    // Fields definition
  }, {
    // Options
    tableName: 'table_name',
    timestamps: true,
    underscored: true
  });

  Model.associate = (models) => {
    // Associations definition
  };

  return Model;
};
```

## ⚠️ Important Notes

1. **No Business Logic** - Models contain only structure and relationships
2. **Use Migrations** - Don't use `sync()` in production
3. **Environment Variables** - Configure database via `.env` file
4. **Cascade Deletes** - Be aware of cascade behaviors
5. **Validation** - Models have built-in validation rules

## 🆘 Troubleshooting

### Models not loading?
```bash
# Check syntax
node -e "require('./src/models')"
```

### Database connection issues?
```bash
# Verify .env configuration
# Check PostgreSQL is running
# Verify credentials
```

### Association errors?
- Ensure all models are loaded before associations run
- Check that foreign keys match model names
- Verify the `index.js` loads models correctly

## 📞 Support

For detailed information, see:
- `MODELS_DOCUMENTATION.md` - Full documentation
- `MODEL_RELATIONSHIPS.txt` - Relationship reference
- Sequelize docs: https://sequelize.org/docs/v6/

---

**Status:** ✅ All 8 models implemented and ready to use!
