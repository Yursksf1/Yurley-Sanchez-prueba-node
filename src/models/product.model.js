/**
 * Product Model
 * Represents products in the system
 */
module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define(
    'Producto',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      estado: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      kit: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      barcode: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      nombre: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      presentacion: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      descripcion: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      foto: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
      peso: {
        type: DataTypes.DECIMAL(6,2),
        allowNull: true,
      },
    },
    {
      tableName: 'productos',
      timestamps: true,
      underscored: true,
    }
  );

  Producto.associate = (models) => {
    // Relación muchos a muchos con categorias a través de productos_categorias
    Producto.belongsToMany(models.Categoria, {
      through: models.ProductosCategorias,
      foreignKey: 'id_producto',
      otherKey: 'id_categoria',
      as: 'categorias',
    });
    // Relación muchos a muchos con tiendas a través de productos_stocks
    Producto.belongsToMany(models.Tienda, {
      through: models.ProductosStocks,
      foreignKey: 'id_producto',
      otherKey: 'id_tienda',
      as: 'tiendas',
    });
    // Relación uno a muchos con productos_stocks
    Producto.hasMany(models.ProductosStocks, {
      foreignKey: 'id_producto',
      as: 'productosStocks',
    });
    // Relación uno a muchos con pedidos_productos
    Producto.hasMany(models.PedidosProductos, {
      foreignKey: 'id_producto',
      as: 'pedidosProductos',
    });
  };

  return Producto;
};
