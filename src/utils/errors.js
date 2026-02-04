/**
 * Custom Error Classes
 * Provides standardized error types for better error handling
 */

/**
 * Base AppError class
 * All custom errors extend from this class
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Bad Request Error (400)
 * Used for invalid input or parameters
 */
class BadRequestError extends AppError {
  constructor(message = 'Bad Request') {
    super(message, 400);
  }
}

/**
 * Not Found Error (404)
 * Used when a resource is not found
 */
class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

/**
 * Internal Server Error (500)
 * Used for unexpected server errors
 */
class InternalServerError extends AppError {
  constructor(message = 'Internal Server Error') {
    super(message, 500);
  }
}

/**
 * Validation Error (400)
 * Used for validation failures
 */
class ValidationError extends AppError {
  constructor(message = 'Validation failed') {
    super(message, 400);
  }
}

module.exports = {
  AppError,
  BadRequestError,
  NotFoundError,
  InternalServerError,
  ValidationError,
};
