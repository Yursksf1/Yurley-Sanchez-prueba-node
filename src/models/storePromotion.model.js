/**
 * StorePromotion Model
 * Intermediate table for Store-Promotion relationship (Many-to-Many)
 * Links promotions to specific stores
 */
module.exports = (sequelize, DataTypes) => {
  const TiendasPromociones = sequelize.define(
    'TiendasPromociones',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      estado: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      inicio: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      fin: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      id_tienda: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_promocion: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'tiendas_promociones',
      timestamps: false,
      underscored: true,
    }
  );

  TiendasPromociones.associate = (models) => {
    TiendasPromociones.belongsTo(models.Tienda, {
      foreignKey: 'id_tienda',
      as: 'tienda',
    });
    TiendasPromociones.belongsTo(models.Promocion, {
      foreignKey: 'id_promocion',
      as: 'promocion',
    });
  };

  return TiendasPromociones;
};
