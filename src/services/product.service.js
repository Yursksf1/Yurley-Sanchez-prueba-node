const { Product, ProductStock, Store } = require('../models');

/**
 * Product Service
 * Handles business logic for product operations
 */
class ProductService {
  /**
   * Get all products with their stock per store
   * @returns {Promise<Array>} List of products with stock information
   */
  async getAllProductsWithStock() {
    try {
      const products = await Product.findAll({
        attributes: ['id', 'name', 'description', 'price'],
        include: [
          {
            model: ProductStock,
            as: 'productStocks',
            attributes: ['quantity'],
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
      return products.map((product) => {
        const plainProduct = product.toJSON();
        return {
          id: plainProduct.id,
          name: plainProduct.name,
          description: plainProduct.description,
          price: plainProduct.price,
          stores: plainProduct.productStocks.map((stock) => ({
            storeId: stock.store.id,
            storeName: stock.store.name,
            storeAddress: stock.store.address,
            quantity: stock.quantity,
          })),
        };
      });
    } catch (error) {
      throw new Error(`Error fetching products with stock: ${error.message}`);
    }
  }
}

module.exports = new ProductService();
