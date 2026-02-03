/**
 * Category Model
 * Represents product categories
 */
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
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
        unique: {
          msg: 'Category name must be unique',
        },
        validate: {
          notEmpty: {
            msg: 'Category name cannot be empty',
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: 'categories',
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ['name'],
        },
      ],
    }
  );

  Category.associate = (models) => {
    // One Category has many Products
    Category.hasMany(models.Product, {
      foreignKey: 'categoryId',
      as: 'products',
    });
  };

  return Category;
};
