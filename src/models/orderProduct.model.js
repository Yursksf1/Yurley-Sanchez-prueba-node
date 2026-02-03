/**
 * OrderProduct Model
 * Intermediate table for Order-Product relationship (Many-to-Many)
 * Tracks products in an order with quantities and prices
 */
module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define(
    'OrderProduct',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'id',
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id',
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Quantity must be an integer',
          },
          min: {
            args: [1],
            msg: 'Quantity must be at least 1',
          },
        },
      },
      unitPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: {
            msg: 'Unit price must be a valid decimal number',
          },
          min: {
            args: [0],
            msg: 'Unit price must be greater than or equal to 0',
          },
        },
      },
      subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: {
            msg: 'Subtotal must be a valid decimal number',
          },
          min: {
            args: [0],
            msg: 'Subtotal must be greater than or equal to 0',
          },
        },
      },
    },
    {
      tableName: 'order_products',
      timestamps: true,
      underscored: true,
      indexes: [
        {
          fields: ['order_id', 'product_id'],
          name: 'order_product_idx',
        },
        {
          fields: ['order_id'],
        },
        {
          fields: ['product_id'],
        },
      ],
    }
  );

  OrderProduct.associate = (models) => {
    // OrderProduct belongs to Order
    OrderProduct.belongsTo(models.Order, {
      foreignKey: 'orderId',
      as: 'order',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // OrderProduct belongs to Product
    OrderProduct.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'product',
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    });
  };

  return OrderProduct;
};
