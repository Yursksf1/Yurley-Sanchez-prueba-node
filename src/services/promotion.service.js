const { Promotion, StorePromotion, Store } = require('../models');
const { Sequelize, Op } = require('sequelize');

/**
 * Promotion Service
 * Handles business logic for promotion operations
 */
class PromotionService {
  /**
   * Get promotions applicable for a specific day of the week
   * @param {number} day - Day of the week (1=Monday, 2=Tuesday, ..., 7=Sunday)
   * @returns {Promise<Array>} List of promotions with their applicable stores
   */
  async getPromotionsByDay(day) {
    try {
      // Get current date for filtering store promotions
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Reset time to midnight for date comparison

      // Find promotions where dias_semana array contains the specified day
      const promotions = await Promotion.findAll({
        where: {
          dias_semana: {
            [Op.contains]: [day], // PostgreSQL array contains operator
          },
        },
        attributes: ['id', 'name', 'description', 'discountPercent', 'dias_semana'],
        include: [
          {
            model: StorePromotion,
            as: 'storePromotions',
            attributes: ['inicio', 'fin'],
            where: {
              inicio: {
                [Op.lte]: currentDate, // inicio <= current date
              },
              fin: {
                [Op.gte]: currentDate, // fin >= current date
              },
            },
            required: false, // LEFT JOIN to include promotions even without active stores
            include: [
              {
                model: Store,
                as: 'store',
                attributes: ['id', 'name', 'address'],
              },
            ],
          },
        ],
        order: [['id', 'ASC']],
      });

      // Transform the data to a cleaner structure
      return promotions.map((promotion) => {
        const plainPromotion = promotion.toJSON();
        return {
          id: plainPromotion.id,
          name: plainPromotion.name,
          description: plainPromotion.description,
          discountPercent: parseFloat(plainPromotion.discountPercent),
          dias_semana: plainPromotion.dias_semana,
          stores: plainPromotion.storePromotions
            .filter((sp) => sp.store) // Filter out any null stores
            .map((sp) => ({
              id: sp.store.id,
              name: sp.store.name,
              address: sp.store.address,
              inicio: sp.inicio,
              fin: sp.fin,
            })),
        };
      });
    } catch (error) {
      throw new Error(`Error fetching promotions by day: ${error.message}`);
    }
  }
}

module.exports = new PromotionService();
