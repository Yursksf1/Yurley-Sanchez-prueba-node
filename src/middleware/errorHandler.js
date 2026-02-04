const config = require('../config/env');

/**
 * Global Error Handler Middleware
 * Centralizes error handling and provides consistent error responses
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Log error for debugging (in development) or monitoring (in production)
  if (config.nodeEnv === 'development') {
    console.error('Error details:', {
      message: err.message,
      stack: err.stack,
      statusCode,
    });
  } else {
    // In production, log minimal information
    console.error('Error:', {
      message: err.message,
      statusCode,
      timestamp: new Date().toISOString(),
    });
  }

  // Don't expose internal error details in production
  if (!err.isOperational && config.nodeEnv === 'production') {
    message = 'Internal Server Error';
  }

  // Send standardized error response
  res.status(statusCode).json({
    error: true,
    message,
  });
};

/**
 * Async Handler Wrapper
 * Wraps async route handlers to catch errors and pass them to error handler
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = {
  errorHandler,
  asyncHandler,
};
