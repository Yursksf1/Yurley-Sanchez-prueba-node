/**
 * Migration for creating the categories table
 * Table: categories
 * Columns: id (PK), name (unique), description, timestamps
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log('Ejecutando migración: categories');
    await queryInterface.createTable('categories', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
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
  },
  down: async (queryInterface) => {
    // Drop categories table
    await queryInterface.dropTable('categories');
  },
}
