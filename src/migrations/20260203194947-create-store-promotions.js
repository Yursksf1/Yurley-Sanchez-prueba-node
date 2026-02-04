/**
 * Migration for creating the store_promotions table
 * Table: store_promotions (join table for stores and promotions)
 * Columns: id (PK), store_id (FK), promotion_id (FK), timestamps
 * Unique: (store_id, promotion_id)
 * FKs: store_id references stores(id), promotion_id references promotions(id), both CASCADE
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('store_promotions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
      promotion_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'promotions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    // Add unique constraint for (store_id, promotion_id)
    await queryInterface.addConstraint('store_promotions', {
      fields: ['store_id', 'promotion_id'],
      type: 'unique',
      name: 'unique_store_promotion',
    });
  },
  down: async (queryInterface) => {
    // Drop store_promotions table
    await queryInterface.dropTable('store_promotions');
  },
}
