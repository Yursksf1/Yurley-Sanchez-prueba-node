const productService = require('../services/product.service');
const { asyncHandler } = require('../middleware/errorHandler');
const { InternalServerError } = require('../utils/errors');

/**
 * Product Controller
 * Handles HTTP requests for product endpoints
 */
class ProductController {
  /**
   * Get all products with stock per store
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  getProducts = asyncHandler(async (req, res) => {
    const products = await productService.getAllProductsWithStock();
    
    res.status(200).json({
      success: true,
      data: products,
      count: products.length,
    });
  });

  /**
   * Get top 10 best-selling products
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  getTopSoldProducts = asyncHandler(async (req, res) => {
    const products = await productService.getTopSoldProducts();
    
    res.status(200).json({
      success: true,
      data: products,
      count: products.length,
    });
  });
}

module.exports = new ProductController();
