/**
 * Migration for creating the products table
 * Table: products
 * Columns: id (PK), name, description, price, category_id (FK), timestamps
 * FK: category_id references categories(id), onDelete: SET NULL, onUpdate: CASCADE
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('productos', {
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
      kit: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      barcode: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      nombre: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      presentacion: {
        type: Sequelize.STRING(25),
        allowNull: true,
      },
      descripcion: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      foto: {
        type: Sequelize.STRING(120),
        allowNull: true,
      },
      peso: {
        type: Sequelize.DECIMAL(6,2),
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
    // Drop productos table
    await queryInterface.dropTable('productos');
  },
}
