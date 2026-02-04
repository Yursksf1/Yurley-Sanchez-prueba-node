const { Promocion, TiendaPromocion, Tienda } = require('../models');
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
            [Op.contains]: [day],
          },
        },
        attributes: ['id_promocion', 'nombre', 'descripcion', 'porcentaje_descuento', 'dias_semana'],
        include: [
          {
            model: TiendaPromocion,
            as: 'tiendasPromocion',
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
                attributes: ['id_tienda', 'nombre', 'direccion'],
              },
            ],
          },
        ],
        order: [['id_promocion', 'ASC']],
      });

      // Transform the data to a cleaner structure
      return promociones.map((promocion) => {
        const plainPromocion = promocion.toJSON();
        return {
          idPromocion: plainPromocion.id_promocion,
          nombre: plainPromocion.nombre,
          tiendas: plainPromocion.tiendasPromocion
            .filter((tp) => tp.tienda)
            .map((tp) => tp.tienda.nombre),
        };
      });
    } catch (error) {
      console.error('Error in getPromotionsByDay service:', error);
      throw error;
    }
  }
}

module.exports = new PromotionService();
