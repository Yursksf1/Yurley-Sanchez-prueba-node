/**
 * Order Model
 * Represents customer orders
 */
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      orderNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Order number must be unique',
        },
        validate: {
          notEmpty: {
            msg: 'Order number cannot be empty',
          },
        },
      },
      storeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'stores',
          key: 'id',
        },
      },
      totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: {
            msg: 'Total amount must be a valid decimal number',
          },
          min: {
            args: [0],
            msg: 'Total amount must be greater than or equal to 0',
          },
        },
      },
      status: {
        type: DataTypes.ENUM('pending', 'processing', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending',
        validate: {
          isIn: {
            args: [['pending', 'processing', 'completed', 'cancelled']],
            msg: 'Status must be one of: pending, processing, completed, cancelled',
          },
        },
      },
    },
    {
      tableName: 'orders',
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ['order_number'],
        },
        {
          fields: ['store_id'],
        },
        {
          fields: ['status'],
        },
        {
          fields: ['created_at'],
        },
      ],
    }
  );

  Order.associate = (models) => {
    // Order belongs to Store
    Order.belongsTo(models.Store, {
      foreignKey: 'storeId',
      as: 'store',
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    });

    // Order belongs to many Products through OrderProduct
    Order.belongsToMany(models.Product, {
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId',
      as: 'products',
    });

    // Order has many OrderProduct records
    Order.hasMany(models.OrderProduct, {
      foreignKey: 'orderId',
      as: 'orderProducts',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Order;
};
