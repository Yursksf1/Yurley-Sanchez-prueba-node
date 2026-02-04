/**
 * Migration for creating the promotions table
 * Table: promotions
 * Columns: id (PK), name, description, discount_percent, start_date, end_date, timestamps
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('promociones', {
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
      nombre: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      imagen: {
        type: Sequelize.STRING(120),
        allowNull: true,
      },
      porcentaje: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      dias_semana: {
        type: Sequelize.STRING(21),
        allowNull: true,
      },
    });
  },
  down: async (queryInterface) => {
    // Drop promociones table
    await queryInterface.dropTable('promociones');
  },
}
