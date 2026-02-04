/**
 * Store Model
 * Represents physical stores
 */
module.exports = (sequelize, DataTypes) => {
  const Tienda = sequelize.define(
    'Tienda',
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
      nombre: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      telefono: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      direccion: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
      direccion_anexo: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      direccion_barrio: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      calificacion: {
        type: DataTypes.DECIMAL(3,2),
        allowNull: true,
      },
      calificacion_cantidad: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      impuestos: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      dias_trabajados: {
        type: DataTypes.STRING(21),
        allowNull: true,
      },
    },
    {
      tableName: 'tiendas',
      timestamps: true,
      underscored: true,
    }
  );

  Tienda.associate = (models) => {
    // Relación muchos a muchos con productos a través de productos_stocks
    Tienda.belongsToMany(models.Producto, {
      through: models.ProductosStocks,
      foreignKey: 'id_tienda',
      otherKey: 'id_producto',
      as: 'productos',
    });
    // Relación muchos a muchos con promociones a través de tiendas_promociones
    Tienda.belongsToMany(models.Promocion, {
      through: models.TiendasPromociones,
      foreignKey: 'id_tienda',
      otherKey: 'id_promocion',
      as: 'promociones',
    });
    // Relación uno a muchos con productos_stocks
    Tienda.hasMany(models.ProductosStocks, {
      foreignKey: 'id_tienda',
      as: 'productosStocks',
    });
    // Relación uno a muchos con pedidos
    Tienda.hasMany(models.Pedido, {
      foreignKey: 'id_tienda',
      as: 'pedidos',
    });
    // Relación uno a muchos con tiendas_promociones
    Tienda.hasMany(models.TiendasPromociones, {
      foreignKey: 'id_tienda',
      as: 'tiendasPromociones',
    });
  };

  return Tienda;
};
