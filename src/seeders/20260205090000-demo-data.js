'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    // Categorías
    await queryInterface.bulkInsert('categorias', [
      { id_categoria: 12, nombre: 'Frutas y verduras', adultos: 0, created_at: now, updated_at: now },
      { id_categoria: 18, nombre: 'Bebidas', adultos: 0, created_at: now, updated_at: now }
    ]);
    // Productos
    await queryInterface.bulkInsert('productos', [
      { id: 95, nombre: 'Gaseosa postobon', presentacion: '355ml', created_at: now, updated_at: now },
      { id: 12, nombre: 'Cerveza aguila', presentacion: '1litro', created_at: now, updated_at: now }
    ]);
    // Tiendas
    await queryInterface.bulkInsert('tiendas', [
      { id: 2, nombre: 'Mas x menos', created_at: now, updated_at: now },
      { id: 4, nombre: 'Exito', created_at: now, updated_at: now },
      { id: 5, nombre: 'Dolar city', created_at: now, updated_at: now },
      { id: 6, nombre: 'D1', created_at: now, updated_at: now }
    ]);
    // Promociones
    await queryInterface.bulkInsert('promociones', [
      { id: 1, nombre: 'Miercoles Felices', porcentaje: 10, dias_semana: '3' },
      { id: 5, nombre: 'Miercoles de 2x1', porcentaje: 20, dias_semana: '3' },
      { id: 8, nombre: 'Promocion solo los miercoles', porcentaje: 15, dias_semana: '3' }
    ]);
    // ProductosCategorias (relación muchos a muchos)
    await queryInterface.bulkInsert('productos_categorias', [
      { id_categoria: 12, id_producto: 95 },
      { id_categoria: 18, id_producto: 12 }
    ]);
    // ProductosStocks (stock de productos en tiendas)
    await queryInterface.bulkInsert('productos_stocks', [
      { id_producto: 95, id_tienda: 2, cantidad: 100 },
      { id_producto: 95, id_tienda: 4, cantidad: 250 }
    ]);
    // TiendasPromociones (relación promociones-tiendas)
    await queryInterface.bulkInsert('tiendas_promociones', [
      { id_promocion: 1, id_tienda: 2 },
      { id_promocion: 1, id_tienda: 4 },
      { id_promocion: 1, id_tienda: 6 },
      { id_promocion: 5, id_tienda: 5 },
      { id_promocion: 5, id_tienda: 6 }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tiendas_promociones', null, {});
    await queryInterface.bulkDelete('productos_stocks', null, {});
    await queryInterface.bulkDelete('productos_categorias', null, {});
    await queryInterface.bulkDelete('promociones', null, {});
    await queryInterface.bulkDelete('tiendas', null, {});
    await queryInterface.bulkDelete('productos', null, {});
    await queryInterface.bulkDelete('categorias', null, {});
  }
};
