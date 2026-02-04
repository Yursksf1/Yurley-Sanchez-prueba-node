/**
 * Migration for creating the pedidos table
 * Table: pedidos
 * Campos según el diagrama
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pedidos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      instrucciones: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      entrega_fecha: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      valor_productos: {
        type: Sequelize.DECIMAL(12,3).UNSIGNED,
        allowNull: true,
      },
      valor_envio: {
        type: Sequelize.DECIMAL(10,3).UNSIGNED,
        allowNull: true,
      },
      valor_descuento: {
        type: Sequelize.DECIMAL(12,3).UNSIGNED,
        allowNull: true,
      },
      valor_cupon: {
        type: Sequelize.DECIMAL(11,3).UNSIGNED,
        allowNull: true,
      },
      impuestos: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      valor_final: {
        type: Sequelize.DECIMAL(12,3).UNSIGNED,
        allowNull: true,
      },
      calificacion: {
        type: Sequelize.DECIMAL(3,2),
        allowNull: true,
      },
      id_tienda: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'tiendas',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      direccion: {
        type: Sequelize.STRING(160),
        allowNull: true,
      },
      valor_comision: {
        type: Sequelize.DECIMAL(11,3),
        allowNull: true,
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    // Drop pedidos table
    await queryInterface.dropTable('pedidos');
  },
};