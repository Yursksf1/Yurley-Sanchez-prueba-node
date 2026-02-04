/**
 * StorePromotion Model
 * Intermediate table for Store-Promotion relationship (Many-to-Many)
 * Links promotions to specific stores
 */
module.exports = (sequelize, DataTypes) => {
  const StorePromotion = sequelize.define(
    'StorePromotion',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      storeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'stores',
          key: 'id',
        },
      },
      promotionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'promotions',
          key: 'id',
        },
      },
      inicio: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: 'inicio must be a valid date',
          },
        },
      },
      fin: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: 'fin must be a valid date',
          },
          isAfterInicio(value) {
            if (this.inicio && value <= this.inicio) {
              throw new Error('fin must be after inicio');
            }
          },
        },
      },
    },
    {
      tableName: 'store_promotions',
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ['store_id', 'promotion_id'],
          name: 'unique_store_promotion',
        },
        {
          fields: ['store_id'],
        },
        {
          fields: ['promotion_id'],
        },
      ],
    }
  );

  StorePromotion.associate = (models) => {
    // StorePromotion belongs to Store
    StorePromotion.belongsTo(models.Store, {
      foreignKey: 'storeId',
      as: 'store',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // StorePromotion belongs to Promotion
    StorePromotion.belongsTo(models.Promotion, {
      foreignKey: 'promotionId',
      as: 'promotion',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return StorePromotion;
};
