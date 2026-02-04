/**
 * Category Model
 * Represents product categories
 */
module.exports = (sequelize, DataTypes) => {
  const Categoria = sequelize.define(
    'Categoria',
    {
      id_categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      adultos: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'categorias',
      timestamps: true,
      underscored: true,
    }
  );

  Categoria.associate = (models) => {
    // Relación muchos a muchos con productos a través de productos_categorias
    Categoria.belongsToMany(models.Producto, {
      through: models.ProductosCategorias,
      foreignKey: 'id_categoria',
      otherKey: 'id_producto',
      as: 'productos',
    });
  };

  return Categoria;
};
