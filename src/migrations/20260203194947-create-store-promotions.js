/**
 * Migration for creating the store_promotions table
 * Table: store_promotions (join table for stores and promotions)
 * Columns: id (PK), store_id (FK), promotion_id (FK), timestamps
 * Unique: (store_id, promotion_id)
 * FKs: store_id references stores(id), promotion_id references promotions(id), both CASCADE
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tiendas_promociones', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      estado: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      inicio: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      fin: {
        type: Sequelize.DATE,
        allowNull: true,
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
      id_promocion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'promociones',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },
  down: async (queryInterface) => {
    // Drop tiendas_promociones table
    await queryInterface.dropTable('tiendas_promociones');
  },
}
