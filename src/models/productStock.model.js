/**
 * ProductStock Model
 * Intermediate table for Product-Store relationship (Many-to-Many)
 * Tracks inventory levels of products in stores
 */
module.exports = (sequelize, DataTypes) => {
  const ProductStock = sequelize.define(
    'ProductStock',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id',
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
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: 'Quantity must be an integer',
          },
          min: {
            args: [0],
            msg: 'Quantity cannot be negative',
          },
        },
      },
    },
    {
      tableName: 'product_stocks',
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ['product_id', 'store_id'],
          name: 'unique_product_store',
        },
        {
          fields: ['product_id'],
        },
        {
          fields: ['store_id'],
        },
      ],
    }
  );

  ProductStock.associate = (models) => {
    // ProductStock belongs to Product
    ProductStock.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'product',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // ProductStock belongs to Store
    ProductStock.belongsTo(models.Store, {
      foreignKey: 'storeId',
      as: 'store',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return ProductStock;
};
