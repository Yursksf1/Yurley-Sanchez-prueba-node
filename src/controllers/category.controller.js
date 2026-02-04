const categoryService = require('../services/category.service');
const { asyncHandler } = require('../middleware/errorHandler');
const { InternalServerError } = require('../utils/errors');

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
  getCategoriesWithProducts = asyncHandler(async (req, res) => {
    const categories = await categoryService.getCategoriesWithProducts();
    
    res.status(200).json({
      success: true,
      data: categories,
      count: categories.length,
    });
  });
}

module.exports = new CategoryController();
