import { Component } from '@angular/core';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonButton,
  IonCard,
  IonCardContent,
  IonButtons,
  IonMenuButton
} from '@ionic/angular';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { Producto } from '../../models/producto.model';

import { ProductoService }
  from '../../services/producto.service';


@Component({

  selector: 'app-catalogo',

  standalone: true,

  templateUrl: './catalogo.page.html',

  styleUrls: ['./catalogo.page.scss'],

  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonButton,
    IonCard,
    IonCardContent,
    IonButtons,
    IonMenuButton
  ]

})
export class CatalogoPage {

  // Todos los productos públicos.
  productos: Producto[] = [];

  // Productos visibles después de filtrar.
  productosFiltrados: Producto[] = [];

  // Categoría activa.
  categoriaSeleccionada: string = 'Todos';

  // Texto del buscador.
  textoBusqueda: string = '';


  constructor(

    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router

  ) {


    // ==================================================
    // ESCUCHAR PRODUCTOS
    // ==================================================

    this.productoService
      .productosPublicos$
      .subscribe(productos => {

        // Actualizamos productos.
        this.productos = productos;

        // Volvemos a aplicar el filtro activo.
        this.aplicarFiltros();

      });


    // ==================================================
    // ESCUCHAR CATEGORÍA DE LA RUTA
    // ==================================================

    this.route.data.subscribe(
      datos => {

        const categoria =
          datos['categoria'];

        if (
          categoria === 'Hombre' ||
          categoria === 'Mujer' ||
          categoria === 'Otros Productos'
        ) {

          this.categoriaSeleccionada =
            categoria;

        } else {

          this.categoriaSeleccionada =
            'Todos';

        }

        // Aplicamos el filtro
        this.aplicarFiltros();

      }
    );

  }


  // ==================================================
  // BOTONES INTERNOS DE CATEGORÍA
  // ==================================================

  seleccionarCategoria(
    categoria: string
  ): void {

    // Actualizamos inmediatamente la interfaz.
    this.categoriaSeleccionada =
      categoria;

    this.aplicarFiltros();


    // También actualizamos la URL.
    switch (categoria) {

      case 'Hombre':
        this.router.navigate([
          '/catalogo/hombre'
        ]);
        break;

      case 'Mujer':
        this.router.navigate([
          '/catalogo/mujer'
        ]);
        break;

      case 'Otros Productos':
        this.router.navigate([
          '/catalogo/otros'
        ]);
        break;

      default:

        this.router.navigate([
          '/catalogo'
        ]);

        break;

    }

  }


  // ==================================================
  // BUSCADOR
  // ==================================================

  buscar(event: any): void {

    const texto =
      event.detail.value || '';

    this.textoBusqueda =
      texto
        .toLowerCase()
        .trim();
    this.aplicarFiltros();

  }


  // ==================================================
  // FILTRADO
  // ==================================================

  aplicarFiltros(): void {
    this.productosFiltrados = this.productos
      .filter(producto => {
        // Filtrar por categoría.
        const coincideCategoria =
          this.categoriaSeleccionada === 'Todos' ||
          producto.categoria === this.categoriaSeleccionada;

        // Filtrar por nombre o descripción.
        const coincideBusqueda =
          producto.nombre.toLowerCase().includes(this.textoBusqueda) ||
          producto.descripcion.toLowerCase().includes(this.textoBusqueda);

        return coincideCategoria && coincideBusqueda;
      })
      // Mostrar primero los productos con ID más antiguo.
      .sort((a, b) => a.id - b.id);
  }


}