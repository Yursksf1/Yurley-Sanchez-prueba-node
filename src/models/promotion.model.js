/**
 * Promotion Model
 * Represents promotional campaigns
 */
module.exports = (sequelize, DataTypes) => {
  const Promotion = sequelize.define(
    'Promotion',
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
            msg: 'Promotion name cannot be empty',
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      discountPercent: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate: {
          isDecimal: {
            msg: 'Discount percent must be a valid decimal number',
          },
          min: {
            args: [0],
            msg: 'Discount percent must be greater than or equal to 0',
          },
          max: {
            args: [100],
            msg: 'Discount percent must be less than or equal to 100',
          },
        },
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: 'Start date must be a valid date',
          },
        },
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: 'End date must be a valid date',
          },
          isAfterStartDate(value) {
            if (this.startDate && value <= this.startDate) {
              throw new Error('End date must be after start date');
            }
          },
        },
      },
      dias_semana: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: [],
        validate: {
          isValidDayArray(value) {
            if (!Array.isArray(value)) {
              throw new Error('dias_semana must be an array');
            }
            for (const day of value) {
              if (!Number.isInteger(day) || day < 1 || day > 7) {
                throw new Error('dias_semana must contain integers between 1 and 7 (1=Monday, 7=Sunday)');
              }
            }
          },
        },
      },
    },
    {
      tableName: 'promotions',
      timestamps: true,
      underscored: true,
      indexes: [
        {
          fields: ['start_date', 'end_date'],
        },
        {
          fields: ['name'],
        },
      ],
    }
  );

  Promotion.associate = (models) => {
    // Promotion belongs to many Stores through StorePromotion
    Promotion.belongsToMany(models.Store, {
      through: models.StorePromotion,
      foreignKey: 'promotionId',
      otherKey: 'storeId',
      as: 'stores',
    });

    // Promotion has many StorePromotion records
    Promotion.hasMany(models.StorePromotion, {
      foreignKey: 'promotionId',
      as: 'storePromotions',
    });
  };

  return Promotion;
};
