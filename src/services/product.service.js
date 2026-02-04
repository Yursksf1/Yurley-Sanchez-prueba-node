const { Producto, ProductosStocks, Tienda, PedidosProductos } = require('../models');
const { Sequelize } = require('sequelize');

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
      const productos = await Producto.findAll({
        attributes: ['id', 'nombre', 'presentacion'],
        include: [
          {
            model: ProductosStocks,
            as: 'productosStocks',
            attributes: ['cantidad'],
            include: [
              {
                model: Tienda,
                as: 'tienda',
                attributes: ['id', 'nombre'],
              },
            ],
          },
        ],
        order: [['id', 'ASC']],
      });

      return productos.map((producto) => {
        const plainProducto = producto.toJSON();
        return {
          idProducto: plainProducto.id,
          nombre: plainProducto.nombre,
          presentacion: plainProducto.presentacion,
          tiendas: plainProducto.productosStocks.map((stock) => ({
            idTienda: stock.tienda.id,
            nombre: stock.tienda.nombre,
            stock: stock.cantidad,
          })),
        };
      });
    } catch (error) {
      throw new Error(`Error fetching products with stock: ${error.message}`);
    }
  }

  /**
   * Get top 10 best-selling products
   * @returns {Promise<Array>} List of top 10 products by total units sold
   */
  async getTopSoldProducts() {
    try {
      const topProductos = await Producto.findAll({
        attributes: [
          'id',
          'nombre',
          'presentacion',
          [Sequelize.fn('SUM', Sequelize.col('pedidosProductos.cantidad')), 'unidades_vendidas']
        ],
        include: [
          {
            model: PedidosProductos,
            as: 'pedidosProductos',
            attributes: [],
          },
        ],
        group: ['Producto.id', 'Producto.nombre', 'Producto.presentacion'],
        order: [[Sequelize.literal('unidades_vendidas'), 'DESC']],
        limit: 10,
        subQuery: false,
      });

      return topProductos.map((producto) => {
        const plainProducto = producto.toJSON();
        return {
          idProducto: plainProducto.id,
          nombre: plainProducto.nombre,
          presentacion: plainProducto.presentacion,
          unidadesVendidas: parseInt(plainProducto.unidades_vendidas, 10) || 0,
        };
      });
    } catch (error) {
      throw new Error(`Error fetching top sold products: ${error.message}`);
    }
  }
}

module.exports = new ProductService();
