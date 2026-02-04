/**
 * Order Model
 * Represents customer orders
 */
module.exports = (sequelize, DataTypes) => {
  const Pedido = sequelize.define(
    'Pedido',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      instrucciones: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      entrega_fecha: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      valor_productos: {
        type: DataTypes.DECIMAL(12,3).UNSIGNED,
        allowNull: true,
      },
      valor_envio: {
        type: DataTypes.DECIMAL(10,3).UNSIGNED,
        allowNull: true,
      },
      valor_descuento: {
        type: DataTypes.DECIMAL(12,3).UNSIGNED,
        allowNull: true,
      },
      valor_cupon: {
        type: DataTypes.DECIMAL(11,3).UNSIGNED,
        allowNull: true,
      },
      impuestos: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      valor_final: {
        type: DataTypes.DECIMAL(12,3).UNSIGNED,
        allowNull: true,
      },
      calificacion: {
        type: DataTypes.DECIMAL(3,2),
        allowNull: true,
      },
      id_tienda: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      direccion: {
        type: DataTypes.STRING(160),
        allowNull: true,
      },
      valor_comision: {
        type: DataTypes.DECIMAL(11,3),
        allowNull: true,
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'pedidos',
      timestamps: false,
      underscored: true,
    }
  );

  Pedido.associate = (models) => {
    // Relación uno a muchos con pedidos_productos
    Pedido.hasMany(models.PedidosProductos, {
      foreignKey: 'id_pedido',
      as: 'pedidosProductos',
    });
    // Relación muchos a uno con tienda
    Pedido.belongsTo(models.Tienda, {
      foreignKey: 'id_tienda',
      as: 'tienda',
    });
  };

  return Pedido;
};
