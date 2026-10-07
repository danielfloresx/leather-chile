import { Routes } from '@angular/router';


export const routes: Routes = [

  // Inicio automático.
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },


  // Página principal.
  {
    path: 'home',

    loadComponent: () =>
      import('./home/home.page')
        .then((m) => m.HomePage)
  },


  // ==================================================
  // CATÁLOGO POR CATEGORÍA
  // ==================================================

  // Hombre.
  {
    path: 'catalogo/hombre',

    loadComponent: () =>
      import('./pages/catalogo/catalogo.page')
        .then((m) => m.CatalogoPage),

    data: {
      categoria: 'Hombre'
    }
  },


  // Mujer.
  {
    path: 'catalogo/mujer',

    loadComponent: () =>
      import('./pages/catalogo/catalogo.page')
        .then((m) => m.CatalogoPage),

    data: {
      categoria: 'Mujer'
    }
  },


  // Otros Productos.
  {
    path: 'catalogo/otros',

    loadComponent: () =>
      import('./pages/catalogo/catalogo.page')
        .then((m) => m.CatalogoPage),

    data: {
      categoria: 'Otros Productos'
    }
  },


  // Catálogo completo.
  {
    path: 'catalogo',

    loadComponent: () =>
      import('./pages/catalogo/catalogo.page')
        .then((m) => m.CatalogoPage),

    data: {
      categoria: 'Todos'
    }
  },


  // Administración.
  {
    path: 'administracion',

    loadComponent: () =>
      import('./pages/administracion/administracion.page')
        .then((m) => m.AdministracionPage)
  },


  // Agregar productos.
  {
    path: 'agregar-producto',

    loadComponent: () =>
      import('./pages/agregar-producto/agregar-producto.page')
        .then((m) => m.AgregarProductoPage)
  },


  // Listar productos.
  {
    path: 'listar-productos',

    loadComponent: () =>
      import('./pages/listar-producto/listar-productos.page')
        .then((m) => m.ListarProductosPage)
  }

];