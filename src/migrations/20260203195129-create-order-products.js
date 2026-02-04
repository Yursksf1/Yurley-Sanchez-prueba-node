/**
 * Migration for creating the order_products table
 * Table: order_products (join table for orders and products)
 * Columns: id (PK), order_id (FK), product_id (FK), quantity, unit_price, subtotal, timestamps
 * FKs: order_id references orders(id) CASCADE, product_id references products(id) RESTRICT
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('order_products', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      unit_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      subtotal: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    // Add index for (order_id, product_id)
    await queryInterface.addIndex('order_products', ['order_id', 'product_id'], { name: 'order_product_idx' });
  },
  down: async (queryInterface) => {
    // Drop order_products table
    await queryInterface.dropTable('order_products');
  },
}
