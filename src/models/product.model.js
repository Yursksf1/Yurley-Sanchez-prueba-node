/**
 * Product Model
 * Represents products in the system
 */
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Product name cannot be empty',
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: {
            msg: 'Price must be a valid decimal number',
          },
          min: {
            args: [0],
            msg: 'Price must be greater than or equal to 0',
          },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'categories',
          key: 'id',
        },
      },
    },
    {
      tableName: 'products',
      timestamps: true,
      underscored: true,
      indexes: [
        {
          fields: ['category_id'],
        },
        {
          fields: ['name'],
        },
      ],
    }
  );

  Product.associate = (models) => {
    // Product belongs to one Category
    Product.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'category',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    // Product belongs to many Stores through ProductStock
    Product.belongsToMany(models.Store, {
      through: models.ProductStock,
      foreignKey: 'productId',
      otherKey: 'storeId',
      as: 'stores',
    });

    // Product has many ProductStock records
    Product.hasMany(models.ProductStock, {
      foreignKey: 'productId',
      as: 'productStocks',
    });

    // Product belongs to many Orders through OrderProduct
    Product.belongsToMany(models.Order, {
      through: models.OrderProduct,
      foreignKey: 'productId',
      otherKey: 'orderId',
      as: 'orders',
    });

    // Product has many OrderProduct records
    Product.hasMany(models.OrderProduct, {
      foreignKey: 'productId',
      as: 'orderProducts',
    });
  };

  return Product;
};
