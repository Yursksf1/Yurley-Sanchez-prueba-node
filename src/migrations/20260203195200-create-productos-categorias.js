/**
 * Migration for creating the productos_categorias table
 * Table: productos_categorias (join entre productos y categorias)
 * Columns: id (PK), id_categoria (FK), id_producto (FK)
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('productos_categorias', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_categoria: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categorias',
          key: 'id_categoria',
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
    });
  },
  down: async (queryInterface) => {
    // Drop productos_categorias table
    await queryInterface.dropTable('productos_categorias');
  },
};