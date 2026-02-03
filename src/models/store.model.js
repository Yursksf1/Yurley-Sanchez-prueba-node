/**
 * Store Model
 * Represents physical stores
 */
module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define(
    'Store',
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
            msg: 'Store name cannot be empty',
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'stores',
      timestamps: true,
      underscored: true,
      indexes: [
        {
          fields: ['name'],
        },
      ],
    }
  );

  Store.associate = (models) => {
    // Store belongs to many Products through ProductStock
    Store.belongsToMany(models.Product, {
      through: models.ProductStock,
      foreignKey: 'storeId',
      otherKey: 'productId',
      as: 'products',
    });

    // Store has many ProductStock records
    Store.hasMany(models.ProductStock, {
      foreignKey: 'storeId',
      as: 'productStocks',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // Store has many Orders
    Store.hasMany(models.Order, {
      foreignKey: 'storeId',
      as: 'orders',
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    });

    // Store belongs to many Promotions through StorePromotion
    Store.belongsToMany(models.Promotion, {
      through: models.StorePromotion,
      foreignKey: 'storeId',
      otherKey: 'promotionId',
      as: 'promotions',
    });

    // Store has many StorePromotion records
    Store.hasMany(models.StorePromotion, {
      foreignKey: 'storeId',
      as: 'storePromotions',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Store;
};
