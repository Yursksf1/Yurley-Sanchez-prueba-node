# Error Handling Documentation

## Overview

This API implements a centralized error handling system that provides consistent error responses and prevents unexpected application behavior.

## Error Response Format

All errors return a standardized JSON response:

```json
{
  "error": true,
  "message": "Clear description of the error"
}
```

## HTTP Status Codes

- **400 Bad Request** - Invalid input or parameters
- **404 Not Found** - Resource or route not found
- **500 Internal Server Error** - Unexpected server errors

## Custom Error Classes

### BadRequestError (400)
Used for invalid input or missing required parameters.

```javascript
const { BadRequestError } = require('./utils/errors');

throw new BadRequestError('Missing required parameter: id');
```

### NotFoundError (404)
Used when a resource is not found.

```javascript
const { NotFoundError } = require('./utils/errors');

throw new NotFoundError('Product not found');
```

### ValidationError (400)
Used for validation failures.

```javascript
const { ValidationError } = require('./utils/errors');

throw new ValidationError('Invalid email format');
```

### InternalServerError (500)
Used for unexpected server errors.

```javascript
const { InternalServerError } = require('./utils/errors');

throw new InternalServerError('Database connection failed');
```

## Using AsyncHandler in Controllers

The `asyncHandler` wrapper automatically catches errors in async functions:

```javascript
const { asyncHandler } = require('../middleware/errorHandler');

class ProductController {
  getProduct = asyncHandler(async (req, res) => {
    const product = await productService.getById(req.params.id);
    
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    
    res.json({ success: true, data: product });
  });
}
```

## Validation Middleware

### validateIntegerParam

Validates that a parameter is an integer within a specified range.

```javascript
const { validateIntegerParam } = require('../middleware/validation');

router.get('/promotions', 
  validateIntegerParam('day', { min: 1, max: 7 }),
  promotionController.getPromotionsByDay
);
```

### validateQueryParams

Validates that required query parameters are present.

```javascript
const { validateQueryParams } = require('../middleware/validation');

router.get('/search', 
  validateQueryParams(['query', 'limit']),
  searchController.search
);
```

### validateRequiredFields

Validates that required fields are present in the request body.

```javascript
const { validateRequiredFields } = require('../middleware/validation');

router.post('/products', 
  validateRequiredFields(['name', 'price', 'categoryId']),
  productController.create
);
```

## Production vs Development

### Development Mode
- Full error details logged to console
- Stack traces included in logs
- Error messages exposed in responses

### Production Mode
- Minimal error logging
- Stack traces not logged
- Internal error details hidden from responses
- Non-operational errors return generic "Internal Server Error" message

## Error Handling Flow

1. **Error occurs** in a route handler or middleware
2. **AsyncHandler** catches the error (if used)
3. **Error passes** to the global error handler
4. **Error handler** determines status code and message
5. **Standardized response** sent to client
6. **Error logged** based on environment

## Example: Complete Controller with Error Handling

```javascript
const { asyncHandler } = require('../middleware/errorHandler');
const { BadRequestError, NotFoundError } = require('../utils/errors');
const productService = require('../services/product.service');

class ProductController {
  getProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    if (!id) {
      throw new BadRequestError('Product ID is required');
    }
    
    const product = await productService.getById(id);
    
    if (!product) {
      throw new NotFoundError(`Product with ID ${id} not found`);
    }
    
    res.status(200).json({
      success: true,
      data: product,
    });
  });
}

module.exports = new ProductController();
```

## Testing Error Responses

### Test 400 Bad Request
```bash
curl http://localhost:3000/promotions
# Response: {"error":true,"message":"Missing required query parameter: day"}
```

### Test 404 Not Found
```bash
curl http://localhost:3000/invalid-route
# Response: {"error":true,"message":"Route GET /invalid-route not found"}
```

### Test 400 Validation Error
```bash
curl http://localhost:3000/promotions?day=invalid
# Response: {"error":true,"message":"Invalid day parameter: must be an integer"}
```

## Best Practices

1. **Always use asyncHandler** for async route handlers
2. **Throw appropriate error types** for different scenarios
3. **Provide clear error messages** that help developers understand the issue
4. **Validate inputs** as early as possible
5. **Don't expose sensitive information** in error messages
6. **Log errors appropriately** for debugging and monitoring

## Acceptance Criteria ✅

- ✅ All errors pass through the global middleware
- ✅ Endpoints respond with correct HTTP codes
- ✅ Error messages are clear and consistent
- ✅ Application doesn't crash on unhandled errors
- ✅ Internal errors are hidden in production
- ✅ Standard error format: `{"error": true, "message": "..."}`
