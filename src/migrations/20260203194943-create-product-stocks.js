/**
 * Migration for creating the product_stocks table
 * Table: product_stocks (join table for products and stores)
 * Columns: id (PK), product_id (FK), store_id (FK), quantity, timestamps
 * Unique: (product_id, store_id)
 * FKs: product_id references products(id), store_id references stores(id), both CASCADE
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_stocks', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      store_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'stores',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
    // Add unique constraint for (product_id, store_id)
    await queryInterface.addConstraint('product_stocks', {
      fields: ['product_id', 'store_id'],
      type: 'unique',
      name: 'unique_product_store',
    });
  },
  down: async (queryInterface) => {
    // Drop product_stocks table
    await queryInterface.dropTable('product_stocks');
  },
}
