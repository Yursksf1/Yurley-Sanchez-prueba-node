/**
 * Migration for creating the product_stocks table
 * Table: product_stocks (join table for products and stores)
 * Columns: id (PK), product_id (FK), store_id (FK), quantity, timestamps
 * Unique: (product_id, store_id)
 * FKs: product_id references products(id), store_id references stores(id), both CASCADE
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('productos_stocks', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_tienda: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tiendas',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_producto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'productos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      cantidad: {
        type: Sequelize.DECIMAL(8,3),
        allowNull: true,
      },
      fecha_ingreso: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  down: async (queryInterface) => {
    // Drop productos_stocks table
    await queryInterface.dropTable('productos_stocks');
  },
}
