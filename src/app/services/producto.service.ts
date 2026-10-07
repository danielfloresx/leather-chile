import { Injectable } from '@angular/core';

import {
  BehaviorSubject,
  combineLatest,
  map
} from 'rxjs';

import { Producto } from '../models/producto.model';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  // ==================================================
  // CATÁLOGO INICIAL
  // ==================================================

  // Aquí deben mantenerse los 30 productos
  // que ya creaste anteriormente.
 private productosIniciales: Producto[] = [

  // ==================================================
  // HOMBRE
  // ==================================================

  {
    id: 1,
    nombre: 'Chaqueta Heritage',
    descripcion: 'Chaqueta clásica de cuero con estilo atemporal.',
    precio: 119990,
    categoria: 'Hombre',
    imagen: 'assets/productos/01-chaqueta-heritage.jpg',
    destacado: true,
    publico: true
  },

  {
    id: 2,
    nombre: 'Billetera Andina',
    descripcion: 'Billetera compacta de cuero para uso diario.',
    precio: 32990,
    categoria: 'Hombre',
    imagen: 'assets/productos/02-billetera-andina.jpg',
    destacado: true,
    publico: true
  },

  {
    id: 3,
    nombre: 'Cinturón Patagonia',
    descripcion: 'Cinturón de cuero con hebilla metálica.',
    precio: 28990,
    categoria: 'Hombre',
    imagen: 'assets/productos/03-cinturon-patagonia.jpg',
    destacado: false,
    publico: true
  },

  {
    id: 4,
    nombre: 'Chaqueta Montés',
    descripcion: 'Chaqueta de cuero de corte moderno.',
    precio: 129990,
    categoria: 'Hombre',
    imagen: 'assets/productos/04-chaqueta-montes.jpg',
    destacado: false,
    publico: true
  },

  {
    id: 5,
    nombre: 'Billetera Austral',
    descripcion: 'Billetera de cuero con múltiples compartimentos.',
    precio: 34990,
    categoria: 'Hombre',
    imagen: 'assets/productos/05-billetera-austral.jpg',
    destacado: false,
    publico: true
  },

  {
    id: 6,
    nombre: 'Bolso Ejecutivo Sur',
    descripcion: 'Bolso de cuero pensado para trabajo y oficina.',
    precio: 89990,
    categoria: 'Hombre',
    imagen: 'assets/productos/06-bolso-ejecutivo-sur.jpg',
    destacado: false,
    publico: true
  },

  {
    id: 7,
    nombre: 'Cinturón Cordillera',
    descripcion: 'Cinturón artesanal de cuero color café.',
    precio: 30990,
    categoria: 'Hombre',
    imagen: 'assets/productos/07-cinturon-cordillera.jpg',
    destacado: false,
    publico: true
  },

  {
    id: 8,
    nombre: 'Portadocumentos Santiago',
    descripcion: 'Portadocumentos elegante de cuero.',
    precio: 45990,
    categoria: 'Hombre',
    imagen: '',
    destacado: false,
    publico: true
  },

  {
    id: 9,
    nombre: 'Morral Atacama',
    descripcion: 'Morral urbano compacto fabricado en cuero.',
    precio: 64990,
    categoria: 'Hombre',
    imagen: '',
    destacado: false,
    publico: true
  },

  {
    id: 10,
    nombre: 'Guantes Invierno Sur',
    descripcion: 'Guantes de cuero para temporada de invierno.',
    precio: 39990,
    categoria: 'Hombre',
    imagen: '',
    destacado: false,
    publico: true
  },


  // ==================================================
  // MUJER
  // ==================================================

  {
    id: 11,
    nombre: 'Bolso Siena',
    descripcion: 'Bolso de cuero con diseño elegante y funcional.',
    precio: 69990,
    categoria: 'Mujer',
    imagen: 'assets/productos/11-bolso-siena.jpg',
    destacado: true,
    publico: true
  },

  {
    id: 12,
    nombre: 'Chaqueta Biker Slim',
    descripcion: 'Chaqueta femenina de cuero modelo Biker Slim.',
    precio: 109990,
    categoria: 'Mujer',
    imagen: 'assets/productos/12-chaqueta-biker.jpg',
    destacado: false,
    publico: true
  },

  {
    id: 13,
    nombre: 'Cinturón Golden Leon',
    descripcion: 'Cinturón delgado de cuero con hebilla dorada de leon.',
    precio: 26990,
    categoria: 'Mujer',
    imagen: 'assets/productos/13-cinturon-leon.jpg',
    destacado: false,
    publico: true
  },

  {
    id: 14,
    nombre: 'Billetera Café Rock Violeta',
    descripcion: 'Billetera original fabricado en cuero color café.',
    precio: 24990,
    categoria: 'Mujer',
    imagen: 'assets/productos/14-billetera-caferock.jpg',
    destacado: false,
    publico: true
  },

  {
    id: 15,
    nombre: 'Chaqueta Lady Estilo Moto',
    descripcion: 'Chaqueta de cuero para moto estilo femenino.',
    precio: 114990,
    categoria: 'Mujer',
    imagen: 'assets/productos/15-chaqueta-motolady.jpg',
    destacado: false,
    publico: true
  },

  {
    id: 16,
    nombre: 'Mochila Isidora',
    descripcion: 'Mochila elegante y liviana de cuero.',
    precio: 68990,
    categoria: 'Mujer',
    imagen: 'assets/productos/16-mochila-isidora.jpg',
    destacado: false,
    publico: true
  },

  {
    id: 17,
    nombre: 'Chaqueta City Rojo',
    descripcion: 'Chaqueta de cuero para uso urbano roja.',
    precio: 54990,
    categoria: 'Mujer',
    imagen: 'assets/productos/17-chaqueta-city-red.jpg',
    destacado: false,
    publico: true
  },
 
  {
    id: 18,
    nombre: 'Bolso Serena',
    descripcion: 'Bolso mediano de cuero con diseño minimalista.',
    precio: 72990,
    categoria: 'Mujer',
    imagen: '',
    destacado: false,
    publico: true
  },

  {
    id: 19,
    nombre: 'Bolso Martina',
    descripcion: 'Bolso amplio de cuero para uso cotidiano.',
    precio: 79990,
    categoria: 'Mujer',
    imagen: '',
    destacado: false,
    publico: true
  },

  {
    id: 20,
    nombre: 'Cartera Valentina',
    descripcion: 'Cartera de cuero para uso diario.',
    precio: 59990,
    categoria: 'Mujer',
    imagen: '',
    destacado: false,
    publico: true
  },

  {
    id: 31,
    nombre: 'Cartera Aurora',
    descripcion: 'Cartera compacta con terminaciones en cuero.',
    precio: 54990,
    categoria: 'Mujer',
    imagen: '',
    destacado: false,
    publico: true
  },



  // ==================================================
  // OTROS PRODUCTOS
  // ==================================================

  {
    id: 21,
    nombre: 'Arnés Negro H',
    descripcion: 'Arnés de cuero para adultos con diseño ajustable.',
    precio: 54990,
    categoria: 'Otros Productos',
    imagen: 'assets/productos/21-arnes-negro-h.jpg',
    destacado: false,
    publico: true
  },

  {
    id: 22,
    nombre: 'Collar Nocturno',
    descripcion: 'Collar de cuero para adultos con terminaciones metálicas.',
    precio: 29990,
    categoria: 'Otros Productos',
    imagen: 'assets/productos/22-collar-nocturno.jpg',
    destacado: false,
    publico: true
  },

  {
    id: 23,
    nombre: 'Látigo Imperial',
    descripcion: 'Látigo artesanal de cuero para adultos.',
    precio: 45990,
    categoria: 'Otros Productos',
    imagen: 'assets/productos/23-latigo-imperial.jpg',
    destacado: false,
    publico: true
  },

  {
    id: 24,
    nombre: 'Pulsera Ébano',
    descripcion: 'Pulsera ancha elaborada en cuero.',
    precio: 19990,
    categoria: 'Otros Productos',
    imagen: 'assets/productos/24-pulsera-ebano.jpg',
    destacado: false,
    publico: true
  },

  {
    id: 25,
    nombre: 'Llavero Plata de Palo cuero y bronce',
    descripcion: 'Llavero artesanal de cuero con terminaciones en plata y bronce.',
    precio: 12990,
    categoria: 'Otros Productos',
    imagen: 'assets/productos/25-llavero-platabronce.jpg',
    destacado: false,
    publico: true
  },

  {
    id: 26,
    nombre: 'Estuche Clásico',
    descripcion: 'Estuche compacto fabricado en cuero natural.',
    precio: 24990,
    categoria: 'Otros Productos',
    imagen: '',
    destacado: false,
    publico: true
  },

  {
    id: 27,
    nombre: 'Portadocumentos Austral',
    descripcion: 'Portadocumentos artesanal de cuero.',
    precio: 39990,
    categoria: 'Otros Productos',
    imagen: '',
    destacado: false,
    publico: true
  },

  {
    id: 28,
    nombre: 'Funda Notebook Urban',
    descripcion: 'Funda protectora de cuero para notebook.',
    precio: 44990,
    categoria: 'Otros Productos',
    imagen: '',
    destacado: false,
    publico: true
  },

  {
    id: 29,
    nombre: 'Mochila Nómada',
    descripcion: 'Mochila de cuero pensada para uso urbano.',
    precio: 74990,
    categoria: 'Otros Productos',
    imagen: '',
    destacado: true,
    publico: true
  },

  {
    id: 30,
    nombre: 'Organizador Andes',
    descripcion: 'Organizador artesanal para pequeños accesorios.',
    precio: 35990,
    categoria: 'Otros Productos',
    imagen: '',
    destacado: false,
    publico: true
  }

];


  // Productos del catálogo general.
  private productosSubject =
    new BehaviorSubject<Producto[]>(
      this.productosIniciales
    );


  // Observable público.
  productos$ =
    this.productosSubject.asObservable();



  // ==================================================
  // PRODUCTOS INGRESADOS DESDE ADMINISTRACIÓN
  // ==================================================

  private productosIngresadosIniciales: Producto[] = [

    {
      id: 101,
      nombre: 'Chaqueta Urbana',
      descripcion: 'Chaqueta de cuero color negro.',
      precio: 99990,
      categoria: 'Hombre',
      imagen: '',
      destacado: false,
      publico: true
    },

    {
      id: 102,
      nombre: 'Cartera Toscana',
      descripcion: 'Cartera de cuero café.',
      precio: 64990,
      categoria: 'Mujer',
      imagen: '',
      destacado: false,
      publico: true
    },

    {
      id: 103,
      nombre: 'Collar Nocturno',
      descripcion: 'Collar de cuero con terminaciones metálicas.',
      precio: 29990,
      categoria: 'Otros Productos',
      imagen: '',
      destacado: false,
      publico: false
    }

  ];


  private productosIngresadosSubject =
    new BehaviorSubject<Producto[]>(
      this.productosIngresadosIniciales
    );


  // Observable de los productos creados desde Administración.
productosIngresados$ =
  this.productosIngresadosSubject.asObservable();



// ==================================================
// PRODUCTOS PÚBLICOS
// ==================================================

/*
  Este Observable une:
  1. Productos iniciales del catálogo.
  2. Productos creados desde Administración.
  Luego conserva solamente los productos
  que tienen publico = true.
*/
productosPublicos$ = combineLatest([

  this.productos$,
  this.productosIngresados$

]).pipe(

  map(([productosBase, productosIngresados]) => {


    // Unimos ambas listas
    const todosLosProductos: Producto[] = [

      ...productosBase,
      ...productosIngresados

    ];


    // Solo se mostrarán públicamente aquellos que no estén desactivados
    return todosLosProductos.filter(
      producto => producto.publico !== false
    );

  })

  );

  constructor() {}

  // ==================================================
  // CATÁLOGO GENERAL
  // ==================================================

  obtenerProductos(): Producto[] {

    return this.productosSubject.value;

  }



  agregarProducto(producto: Producto): void {

    const productosActuales =
      this.productosSubject.value;


    const nuevaLista = [
      ...productosActuales,
      producto
    ];


    this.productosSubject.next(nuevaLista);

  }



  eliminarProducto(id: number): void {

    const nuevaLista =
      this.productosSubject.value.filter(
        producto => producto.id !== id
      );


    this.productosSubject.next(nuevaLista);

  }



  // ==================================================
  // ADMINISTRACIÓN
  // ==================================================

  agregarProductoIngresado(
    producto: Producto
  ): void {

    const productosActuales =
      this.productosIngresadosSubject.value;


    const nuevaLista = [
      ...productosActuales,
      producto
    ];


    this.productosIngresadosSubject.next(
      nuevaLista
    );

  }



  editarProductoIngresado(
    productoEditado: Producto
  ): void {

    const nuevaLista =
      this.productosIngresadosSubject.value.map(
        producto => {

          if (
            producto.id === productoEditado.id
          ) {

            return productoEditado;

          }

          return producto;

        }
      );


    this.productosIngresadosSubject.next(
      nuevaLista
    );

  }



  eliminarProductoIngresado(
    id: number
  ): void {

    const nuevaLista =
      this.productosIngresadosSubject.value.filter(
        producto => producto.id !== id
      );


    this.productosIngresadosSubject.next(
      nuevaLista
    );

  }



  generarNuevoId(): number {

    const productos =
      this.productosIngresadosSubject.value;


    if (productos.length === 0) {

      return 101;

    }


    const mayorId =
      Math.max(
        ...productos.map(
          producto => producto.id
        )
      );


    return mayorId + 1;

  }

}