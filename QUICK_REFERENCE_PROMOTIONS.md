# Quick Reference: Promotions Endpoint

## Endpoint
```
GET /promotions?day={day}
```

## Parameters
| Parameter | Type    | Required | Valid Values | Description |
|-----------|---------|----------|--------------|-------------|
| day       | Integer | Yes      | 1-7          | Day of week (1=Mon, 7=Sun) |

## Success Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Weekend Sale",
      "description": "20% off on weekends",
      "discountPercent": 20.00,
      "dias_semana": [6, 7],
      "stores": [
        {
          "id": 1,
          "name": "Downtown Store",
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

## Error Responses

### 400 - Missing Parameter
```json
{
  "success": false,
  "error": "Bad Request",
  "message": "Missing required query parameter: day"
}
```

### 400 - Invalid Type
```json
{
  "success": false,
  "error": "Bad Request",
  "message": "Invalid day parameter: must be an integer"
}
```

### 400 - Out of Range
```json
{
  "success": false,
  "error": "Bad Request",
  "message": "Invalid day parameter: must be between 1 (Monday) and 7 (Sunday)"
}
```

### 500 - Server Error
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "Error description"
}
```

## cURL Examples

### Valid Requests
```bash
# Get Monday promotions
curl "http://localhost:3000/promotions?day=1"

# Get Friday promotions
curl "http://localhost:3000/promotions?day=5"

# Get Sunday promotions
curl "http://localhost:3000/promotions?day=7"
```

### Invalid Requests
```bash
# Missing parameter
curl "http://localhost:3000/promotions"

# Invalid type
curl "http://localhost:3000/promotions?day=abc"

# Out of range
curl "http://localhost:3000/promotions?day=8"
```

## Day Values
| Value | Day       |
|-------|-----------|
| 1     | Monday    |
| 2     | Tuesday   |
| 3     | Wednesday |
| 4     | Thursday  |
| 5     | Friday    |
| 6     | Saturday  |
| 7     | Sunday    |

## Business Rules
1. Only promotions where `dias_semana` contains the requested day are returned
2. Only stores where current date is between `inicio` and `fin` are included
3. Promotions without active stores are still returned (with empty stores array)
4. Current date comparison is done at midnight (00:00:00)

## Implementation Files
- **Service**: `src/services/promotion.service.js`
- **Controller**: `src/controllers/promotion.controller.js`
- **Routes**: `src/routes/promotion.routes.js`

## Full Documentation
See `PROMOTION_ENDPOINT_IMPLEMENTATION.md` for complete details.
