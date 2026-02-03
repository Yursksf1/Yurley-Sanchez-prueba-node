const { Category, Product } = require('../models');
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
      const categories = await Category.findAll({
        attributes: [
          'id',
          'name',
          'description',
          [Sequelize.fn('COUNT', Sequelize.col('products.id')), 'productCount']
        ],
        include: [
          {
            model: Product,
            as: 'products',
            attributes: [],
          },
        ],
        group: ['Category.id', 'Category.name', 'Category.description'],
        having: Sequelize.where(
          Sequelize.fn('COUNT', Sequelize.col('products.id')),
          '>',
          0
        ),
        order: [[Sequelize.literal('productCount'), 'DESC']],
        subQuery: false,
      });

      // Transform the data to a cleaner structure
      return categories.map((category) => {
        const plainCategory = category.toJSON();
        return {
          id: plainCategory.id,
          name: plainCategory.name,
          description: plainCategory.description,
          productCount: parseInt(plainCategory.productCount, 10) || 0,
        };
      });
    } catch (error) {
      throw new Error(`Error fetching categories with products: ${error.message}`);
    }
  }
}

module.exports = new CategoryService();
