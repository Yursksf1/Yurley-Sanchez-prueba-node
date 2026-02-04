const { BadRequestError, ValidationError } = require('../utils/errors');

/**
 * Validation Middleware
 * Provides common validation utilities for request parameters
 */

/**
 * Validate required query parameters
 * @param {Array} requiredParams - Array of required parameter names
 * @returns {Function} Express middleware function
 */
const validateQueryParams = (requiredParams) => {
  return (req, res, next) => {
    const missingParams = requiredParams.filter(param => !req.query[param]);
    
    if (missingParams.length > 0) {
      throw new BadRequestError(
        `Missing required query parameter(s): ${missingParams.join(', ')}`
      );
    }
    
    next();
  };
};

/**
 * Validate integer parameter
 * @param {string} paramName - Name of the parameter
 * @param {Object} options - Validation options (min, max)
 * @returns {Function} Express middleware function
 */
const validateIntegerParam = (paramName, options = {}) => {
  return (req, res, next) => {
    const value = req.query[paramName] || req.params[paramName];
    
    if (!value) {
      throw new BadRequestError(`Missing required parameter: ${paramName}`);
    }

    const intValue = parseInt(value, 10);
    
    if (isNaN(intValue)) {
      throw new ValidationError(`Parameter '${paramName}' must be an integer`);
    }

    if (options.min !== undefined && intValue < options.min) {
      throw new ValidationError(
        `Parameter '${paramName}' must be at least ${options.min}`
      );
    }

    if (options.max !== undefined && intValue > options.max) {
      throw new ValidationError(
        `Parameter '${paramName}' must be at most ${options.max}`
      );
    }

    // Store validated value for use in controller
    req.validated = req.validated || {};
    req.validated[paramName] = intValue;
    
    next();
  };
};

/**
 * Validate request body has required fields
 * @param {Array} requiredFields - Array of required field names
 * @returns {Function} Express middleware function
 */
const validateRequiredFields = (requiredFields) => {
  return (req, res, next) => {
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      throw new ValidationError(
        `Missing required field(s): ${missingFields.join(', ')}`
      );
    }
    
    next();
  };
};

module.exports = {
  validateQueryParams,
  validateIntegerParam,
  validateRequiredFields,
};
