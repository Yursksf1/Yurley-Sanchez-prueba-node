/**
 * ProductosCategorias Model
 * Tabla intermedia para la relación muchos a muchos entre Categoria y Producto
 */
module.exports = (sequelize, DataTypes) => {
  const ProductosCategorias = sequelize.define(
    'ProductosCategorias',
    {
      id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'categorias',
          key: 'id_categoria',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'productos',
          key: 'id_producto',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    },
    {
      tableName: 'productos_categorias',
      timestamps: false,
      underscored: true,
    }
  );

  return ProductosCategorias;
};
