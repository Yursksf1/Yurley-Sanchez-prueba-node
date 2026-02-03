const categoryService = require('../services/category.service');

/**
 * Category Controller
 * Handles HTTP requests for category endpoints
 */
class CategoryController {
  /**
   * Get categories with at least one product
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getCategoriesWithProducts(req, res) {
    try {
      const categories = await categoryService.getCategoriesWithProducts();
      
      res.status(200).json({
        success: true,
        data: categories,
        count: categories.length,
      });
    } catch (error) {
      console.error('Error in getCategoriesWithProducts controller:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: error.message,
      });
    }
  }
}

module.exports = new CategoryController();
