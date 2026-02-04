/**
 * Promotion Model
 * Represents promotional campaigns
 */
module.exports = (sequelize, DataTypes) => {
  const Promocion = sequelize.define(
    'Promocion',
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
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      imagen: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
      porcentaje: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      dias_semana: {
        type: DataTypes.STRING(21),
        allowNull: true,
      },
    },
    {
      tableName: 'promociones',
      timestamps: false,
      underscored: true,
    }
  );

  Promocion.associate = (models) => {
    // Relación muchos a muchos con tiendas a través de tiendas_promociones
    Promocion.belongsToMany(models.Tienda, {
      through: models.TiendasPromociones,
      foreignKey: 'id_promocion',
      otherKey: 'id_tienda',
      as: 'tiendas',
    });
    // Relación uno a muchos con tiendas_promociones
    Promocion.hasMany(models.TiendasPromociones, {
      foreignKey: 'id_promocion',
      as: 'tiendasPromociones',
    });
    // Relación uno a muchos con pedidos_productos
    Promocion.hasMany(models.PedidosProductos, {
      foreignKey: 'id_promocion',
      as: 'pedidosProductos',
    });
  };

  return Promocion;
};
