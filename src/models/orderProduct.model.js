/**
 * OrderProduct Model
 * Intermediate table for Order-Product relationship (Many-to-Many)
 * Tracks products in an order with quantities and prices
 */
module.exports = (sequelize, DataTypes) => {
  const PedidosProductos = sequelize.define(
    'PedidosProductos',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cantidad: {
        type: DataTypes.DECIMAL(9,3).UNSIGNED,
        allowNull: true,
      },
      valor_unitario: {
        type: DataTypes.DECIMAL(11,3).UNSIGNED,
        allowNull: true,
      },
      valor_unitario_promocion: {
        type: DataTypes.DECIMAL(11,3).UNSIGNED,
        allowNull: true,
      },
      total_teorico: {
        type: DataTypes.DECIMAL(12,3).UNSIGNED,
        allowNull: true,
      },
      total_final: {
        type: DataTypes.DECIMAL(12,3).UNSIGNED,
        allowNull: true,
      },
      id_promocion: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_pedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'pedidos_productos',
      timestamps: false,
      underscored: true,
    }
  );

  PedidosProductos.associate = (models) => {
    PedidosProductos.belongsTo(models.Promocion, {
      foreignKey: 'id_promocion',
      as: 'promocion',
    });
    PedidosProductos.belongsTo(models.Producto, {
      foreignKey: 'id_producto',
      as: 'producto',
    });
    PedidosProductos.belongsTo(models.Pedido, {
      foreignKey: 'id_pedido',
      as: 'pedido',
    });
  };

  return PedidosProductos;
};
