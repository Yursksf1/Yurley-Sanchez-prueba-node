const promotionService = require('../services/promotion.service');

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
  async getPromotionsByDay(req, res) {
    try {
      // Permitir 'dia' o 'day' como parámetro
      const dayParam = req.query.dia || req.query.day;

      if (!dayParam) {
        return res.status(400).json({
          success: false,
          error: 'Bad Request',
          message: 'Missing required query parameter: dia',
        });
      }

      const dayNumber = parseInt(dayParam, 10);
      if (isNaN(dayNumber)) {
        return res.status(400).json({
          success: false,
          error: 'Bad Request',
          message: 'Invalid dia parameter: must be an integer',
        });
      }
      if (dayNumber < 1 || dayNumber > 7) {
        return res.status(400).json({
          success: false,
          error: 'Bad Request',
          message: 'Invalid dia parameter: must be between 1 (Monday) and 7 (Sunday)',
        });
      }

      // Fetch promotions from service
      const promociones = await promotionService.getPromotionsByDay(dayNumber);
      res.status(200).json({
        message: "consultado correctamente",
        data: promociones
      });
    } catch (error) {
      console.error('Error in getPromotionsByDay controller:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: error.message,
      });
    }
  }
}

module.exports = new PromotionController();
