const { Promocion, TiendasPromociones, Tienda } = require('../models');
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
      const promociones = await Promocion.findAll({
        where: {
          dias_semana: {
            [Op.like]: `%${day}%`,
          },
        },
        attributes: ['id', 'nombre', 'porcentaje', 'dias_semana'],
        include: [
          {
            model: TiendasPromociones,
            as: 'tiendasPromociones',
            attributes: ['inicio', 'fin'],
            where: {
              inicio: {
                [Op.lte]: currentDate,
              },
              fin: {
                [Op.gte]: currentDate,
              },
            },
            required: false,
            include: [
              {
                model: Tienda,
                as: 'tienda',
                attributes: ['id', 'nombre', 'direccion'],
              },
            ],
          },
        ],
        order: [['id', 'ASC']],
      });

      // Transform the data to a cleaner structure
      return promociones.map((promocion) => {
        const plainPromocion = promocion.toJSON();
        return {
          idPromocion: plainPromocion.id,
          nombre: plainPromocion.nombre,
          tiendas: Array.isArray(plainPromocion.tiendasPromociones)
            ? plainPromocion.tiendasPromociones
                .filter((tp) => tp.tienda && tp.tienda.nombre)
                .map((tp) => tp.tienda.nombre)
            : [],
        };
      });
    } catch (error) {
      console.error('Error in getPromotionsByDay service:', error);
      throw error;
    }
  }
}

module.exports = new PromotionService();
