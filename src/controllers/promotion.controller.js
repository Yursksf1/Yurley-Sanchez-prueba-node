const promotionService = require('../services/promotion.service');
const { asyncHandler } = require('../middleware/errorHandler');
const { BadRequestError, ValidationError } = require('../utils/errors');

/**
 * Promotion Controller
 * Handles HTTP requests for promotion endpoints
 */
class PromotionController {
  /**
   * Get promotions applicable for a specific day of the week
   * @param {Object} req - Express request object
   * @param {Object} req.query.day - Day of the week (1-7)
   * @param {Object} res - Express response object
   */
  getPromotionsByDay = asyncHandler(async (req, res) => {
    const { day } = req.query;

    // Validate that day parameter is provided
    if (!day) {
      throw new BadRequestError('Missing required query parameter: day');
    }

    // Parse and validate day parameter
    const dayNumber = parseInt(day, 10);
    
    if (isNaN(dayNumber)) {
      throw new ValidationError('Invalid day parameter: must be an integer');
    }

    if (dayNumber < 1 || dayNumber > 7) {
      throw new ValidationError(
        'Invalid day parameter: must be between 1 (Monday) and 7 (Sunday)'
      );
    }

    // Fetch promotions from service
    const promotions = await promotionService.getPromotionsByDay(dayNumber);

    res.status(200).json({
      success: true,
      data: promotions,
      count: promotions.length,
    });
  });
}

module.exports = new PromotionController();
