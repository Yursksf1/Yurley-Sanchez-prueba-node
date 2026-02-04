/**
 * ProductStock Model
 * Intermediate table for Product-Store relationship (Many-to-Many)
 * Tracks inventory levels of products in stores
 */
module.exports = (sequelize, DataTypes) => {
  const ProductosStocks = sequelize.define(
    'ProductosStocks',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_tienda: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cantidad: {
        type: DataTypes.DECIMAL(8,3),
        allowNull: true,
      },
      fecha_ingreso: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'productos_stocks',
      timestamps: false,
      underscored: true,
    }
  );

  ProductosStocks.associate = (models) => {
    ProductosStocks.belongsTo(models.Tienda, {
      foreignKey: 'id_tienda',
      as: 'tienda',
    });
    ProductosStocks.belongsTo(models.Producto, {
      foreignKey: 'id_producto',
      as: 'producto',
    });
  };

  return ProductosStocks;
};
