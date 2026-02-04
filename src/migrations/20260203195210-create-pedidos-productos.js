/**
 * Migration for creating the pedidos_productos table
 * Table: pedidos_productos (join entre pedidos y productos)
 * Columns: id (PK), cantidad, valor_unitario, valor_unitario_promocion, total_teorico, total_final, id_promocion, id_producto, id_pedido
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pedidos_productos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cantidad: {
        type: Sequelize.DECIMAL(9,3).UNSIGNED,
        allowNull: true,
      },
      valor_unitario: {
        type: Sequelize.DECIMAL(11,3).UNSIGNED,
        allowNull: true,
      },
      valor_unitario_promocion: {
        type: Sequelize.DECIMAL(11,3).UNSIGNED,
        allowNull: true,
      },
      total_teorico: {
        type: Sequelize.DECIMAL(12,3).UNSIGNED,
        allowNull: true,
      },
      total_final: {
        type: Sequelize.DECIMAL(12,3).UNSIGNED,
        allowNull: true,
      },
      id_promocion: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'promociones',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
      id_pedido: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pedidos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },
  down: async (queryInterface) => {
    // Drop pedidos_productos table
    await queryInterface.dropTable('pedidos_productos');
  },
};