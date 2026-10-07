// Importamos Component desde Angular.
import { Component } from '@angular/core';

// Componentes Ionic utilizados en Home.
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent
} from '@ionic/angular';

// AsyncPipe permite leer el Observable desde HTML.
import { AsyncPipe } from '@angular/common';

// RouterLink permite navegar al catálogo.
import { RouterLink } from '@angular/router';

// Operador RxJS utilizado para filtrar destacados.
import { map } from 'rxjs/operators';

// Servicio de productos.
import { ProductoService } from '../services/producto.service';


@Component({

  selector: 'app-home',

  standalone: true,

  templateUrl: 'home.page.html',

  styleUrls: ['home.page.scss'],

  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonMenuButton,
    IonButton,
    IonIcon,
    IonCard,
    IonCardContent,
    AsyncPipe,
    RouterLink
  ]

})
export class HomePage {


  // Observable que contendrá solamente
  // los productos destacados.
  productosDestacados$;


  constructor(
    private productoService: ProductoService
  ) {

    // Tomamos todos los productos.
    this.productosDestacados$ =
      this.productoService.productosPublicos$.pipe(

        // Conservamos solamente los destacados.
        map(productos =>
          productos.filter(
            producto => producto.destacado
          )
        )

      );

  }

}