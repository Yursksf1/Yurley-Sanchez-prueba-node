const { NotFoundError } = require('../utils/errors');

/**
 * 404 Not Found Middleware
 * Handles requests to undefined routes
 */
const notFoundHandler = (req, res, next) => {
  throw new NotFoundError(`Route ${req.method} ${req.originalUrl} not found`);
};

module.exports = notFoundHandler;
