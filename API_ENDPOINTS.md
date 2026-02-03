# API Endpoints

## Products

### List Products with Stock per Store

Retrieves all products with their basic information and stock availability per store.

**Endpoint:** `GET /products`

**Response Status:** `200 OK`

**Response Format:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Product Name",
      "description": "Product description",
      "price": "99.99",
      "stores": [
        {
          "storeId": 1,
          "storeName": "Store Name",
          "storeAddress": "Store Address",
          "quantity": 50
        }
      ]
    }
  ],
  "count": 1
}
```

**Features:**
- Returns all products with their stock information
- Includes store details where each product is available
- Optimized query to avoid N+1 problems
- Clean, predictable JSON structure
- Products are ordered by ID

**Error Response:**
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "Error description"
}
```

### Get Top 10 Best-Selling Products

Retrieves the top 10 best-selling products ordered by total units sold in descending order.

**Endpoint:** `GET /products/top-sold`

**Response Status:** `200 OK`

**Response Format:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Product Name",
      "description": "Product description",
      "price": "99.99",
      "totalQuantitySold": 1500
    }
  ],
  "count": 10
}
```

**Features:**
- Returns maximum of 10 products
- Products are ordered by total quantity sold (descending)
- Uses Sequelize aggregation (SUM function)
- Groups results by product
- Does not use raw SQL
- Calculated from OrderProduct relationship

**Error Response:**
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "Error description"
}
```
