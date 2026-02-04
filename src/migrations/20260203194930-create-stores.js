/**
 * Migration for creating the stores table
 * Table: stores
 * Columns: id (PK), name, address, phone, timestamps
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tiendas', {
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
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      descripcion: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      telefono: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      direccion: {
        type: Sequelize.STRING(120),
        allowNull: true,
      },
      direccion_anexo: {
        type: Sequelize.STRING(40),
        allowNull: true,
      },
      direccion_barrio: {
        type: Sequelize.STRING(25),
        allowNull: true,
      },
      calificacion: {
        type: Sequelize.DECIMAL(3,2),
        allowNull: true,
      },
      calificacion_cantidad: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      impuestos: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      dias_trabajados: {
        type: Sequelize.STRING(21),
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
    // Drop tiendas table
    await queryInterface.dropTable('tiendas');
  },
}
