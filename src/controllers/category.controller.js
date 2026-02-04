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
      const categorias = await categoryService.getCategoriesWithProducts();
      res.status(200).json({
        message: "consultado correctamente",
        data: categorias
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
