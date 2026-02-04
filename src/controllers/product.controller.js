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
  async getProducts(req, res) {
    try {
      const productos = await productService.getAllProductsWithStock();
      res.status(200).json({
        message: "consultado correctamente",
        data: productos
      });
    } catch (error) {
      console.error('Error in getProducts controller:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: error.message,
      });
    }
  }

  /**
   * Get top 10 best-selling products
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getTopSoldProducts(req, res) {
    console.log('Received request for top sold products');
    try {
      const productos = await productService.getTopSoldProducts();
      res.status(200).json({
        message: "consultado correctamente",
        data: productos
      });
    } catch (error) {
      console.error('Error in getTopSoldProducts controller:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: error.message,
      });
    }
  }
}

module.exports = new ProductController();
