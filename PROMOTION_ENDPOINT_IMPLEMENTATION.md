# Promotion Endpoint Implementation

## Overview
A new REST API endpoint has been implemented to list promotions applicable by day of the week.

## Endpoint Details

### Route
```
GET /promotions?day={day}
```

### Query Parameters
- **day** (required): Integer from 1-7 where:
  - 1 = Monday
  - 2 = Tuesday
  - 3 = Wednesday
  - 4 = Thursday
  - 5 = Friday
  - 6 = Saturday
  - 7 = Sunday

### Request Examples

**Valid Request:**
```bash
GET /promotions?day=1
```

**Invalid Requests:**
```bash
GET /promotions          # Missing day parameter
GET /promotions?day=abc  # Invalid day format
GET /promotions?day=8    # Day out of range
```

## Response Format

### Success Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Weekend Discount",
      "description": "20% off on weekends",
      "discountPercent": 20.00,
      "dias_semana": [6, 7],
      "stores": [
        {
          "id": 1,
          "name": "Store Downtown",
          "address": "123 Main St",
          "inicio": "2024-01-01T00:00:00.000Z",
          "fin": "2024-12-31T23:59:59.999Z"
        }
      ]
    }
  ],
  "count": 1
}
```

### Error Responses

**400 Bad Request - Missing Parameter:**
```json
{
  "success": false,
  "error": "Bad Request",
  "message": "Missing required query parameter: day"
}
```

**400 Bad Request - Invalid Format:**
```json
{
  "success": false,
  "error": "Bad Request",
  "message": "Invalid day parameter: must be an integer"
}
```

**400 Bad Request - Out of Range:**
```json
{
  "success": false,
  "error": "Bad Request",
  "message": "Invalid day parameter: must be between 1 (Monday) and 7 (Sunday)"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "Error description"
}
```

## Business Logic

### Filtering Criteria
1. **Day Filter**: Promotions must have the requested day in their `dias_semana` array
2. **Date Filter**: Only stores where the current date falls between `inicio` and `fin` are included
3. **Active Stores**: Only stores with active promotion periods are returned

### Date Comparison
- Current date is normalized to midnight (00:00:00) for comparison
- `inicio` must be <= current date
- `fin` must be >= current date

## Implementation Files

### 1. Service Layer
**File:** `src/services/promotion.service.js`
- Class: `PromotionService`
- Method: `getPromotionsByDay(day)`
- Handles database queries using Sequelize ORM
- Uses PostgreSQL array contains operator for day filtering
- Implements LEFT JOIN to include promotions even if no stores are currently active
- Transforms data to clean, consumer-friendly structure

### 2. Controller Layer
**File:** `src/controllers/promotion.controller.js`
- Class: `PromotionController`
- Method: `getPromotionsByDay(req, res)`
- Validates query parameters (presence, type, range)
- Returns appropriate HTTP status codes
- Handles errors with consistent response format

### 3. Routes Layer
**File:** `src/routes/promotion.routes.js`
- Defines the `/promotions` endpoint
- Binds controller method to route
- Includes JSDoc documentation

### 4. Application Integration
**File:** `src/app.js`
- Added promotion routes to Express app
- Routes are registered alongside existing product and category routes

## Database Models Used

### Promotion Model
- `id`: Promotion identifier
- `name`: Promotion name
- `description`: Promotion description
- `discountPercent`: Discount percentage (0-100)
- `dias_semana`: Array of integers (1-7) indicating applicable days

### StorePromotion Model (Junction Table)
- `id`: Record identifier
- `storeId`: Foreign key to Store
- `promotionId`: Foreign key to Promotion
- `inicio`: Promotion start date at store
- `fin`: Promotion end date at store

### Store Model
- `id`: Store identifier
- `name`: Store name
- `address`: Store address

## Sequelize Query Features Used

1. **Array Contains Operator** (`Op.contains`): Filter promotions by day in array
2. **Date Comparison Operators** (`Op.lte`, `Op.gte`): Filter active store promotions
3. **Nested Includes**: Join Promotion → StorePromotion → Store
4. **LEFT JOIN** (`required: false`): Include promotions even without active stores
5. **Attribute Selection**: Only fetch needed fields
6. **Ordering**: Sort results by promotion ID

## Code Quality Features

- ✅ Class-based architecture
- ✅ Separation of concerns (Service/Controller/Routes)
- ✅ JSDoc comments
- ✅ Comprehensive error handling
- ✅ Input validation
- ✅ Consistent response format
- ✅ RESTful design
- ✅ Follows existing code patterns
- ✅ No raw SQL queries
- ✅ Proper HTTP status codes

## Testing Recommendations

### Unit Tests
- Test `PromotionService.getPromotionsByDay()` with various days
- Test date filtering logic
- Test array contains filtering

### Integration Tests
- Test full endpoint with valid day parameters (1-7)
- Test missing day parameter
- Test invalid day formats (string, float, null)
- Test out of range values (0, 8, -1, 100)
- Test with database containing:
  - Promotions with active stores
  - Promotions with expired stores
  - Promotions with future stores
  - Promotions with no stores

### Example Test Cases
```javascript
// Valid requests
GET /promotions?day=1  // Monday
GET /promotions?day=7  // Sunday

// Invalid requests
GET /promotions        // Missing parameter
GET /promotions?day=abc
GET /promotions?day=0
GET /promotions?day=8
GET /promotions?day=-1
GET /promotions?day=1.5
```

## Future Enhancements

1. Add pagination support for large result sets
2. Add filtering by store location or ID
3. Add sorting options (by discount, name, etc.)
4. Add caching for frequently requested days
5. Add date range filter to see future/past promotions
6. Add response localization
7. Add rate limiting
8. Add authentication/authorization if needed

## API Design Principles Applied

1. **RESTful Naming**: Uses noun (`/promotions`) instead of verb
2. **Query Parameters**: Uses query string for filtering (not path)
3. **Consistent Response**: All responses follow same structure
4. **Semantic Status Codes**: Proper use of 200, 400, 500
5. **Consumer-Friendly**: Clean, predictable JSON structure
6. **Error Messages**: Clear, actionable error messages
7. **Documentation**: Well-documented with JSDoc and this guide
