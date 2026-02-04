const { Categoria, Producto } = require('../models');
const { Sequelize } = require('sequelize');

/**
 * Category Service
 * Handles business logic for category operations
 */
class CategoryService {
  /**
   * Get categories with at least one product, ordered by product count (descending)
   * @returns {Promise<Array>} List of categories with product count
   */
  async getCategoriesWithProducts() {
    try {
      const categorias = await Categoria.findAll({
        attributes: [
          'id_categoria',
          'nombre',
          'adultos',
          [Sequelize.fn('COUNT', Sequelize.col('productos.id')), 'productosCount']
        ],
        include: [
          {
            model: Producto,
            as: 'productos',
            attributes: [],
          },
        ],
        group: ['Categoria.id_categoria', 'Categoria.nombre', 'Categoria.adultos'],
        having: Sequelize.where(
          Sequelize.fn('COUNT', Sequelize.col('productos.id')),
          '>',
          0
        ),
        order: [[Sequelize.literal('productosCount'), 'DESC']],
        subQuery: false,
      });

      // Transform the data to a cleaner structure
      return categorias.map((categoria) => {
        const plainCategoria = categoria.toJSON();
        return {
          idCategoria: plainCategoria.id_categoria,
          nombre: plainCategoria.nombre,
          cantProductos: parseInt(plainCategoria.productosCount, 10) || 0,
        };
      });
    } catch (error) {
      throw new Error(`Error fetching categories with products: ${error.message}`);
    }
  }
}

module.exports = new CategoryService();
