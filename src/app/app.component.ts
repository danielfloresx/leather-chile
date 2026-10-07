import { Component } from '@angular/core';

import { Router } from '@angular/router';

import {
  IonApp,
  IonRouterOutlet,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonAccordion,
  IonAccordionGroup,
  MenuController
} from '@ionic/angular';


@Component({

  selector: 'app-root',

  standalone: true,

  templateUrl: 'app.component.html',

  styleUrls: ['app.component.scss'],

  imports: [
    IonApp,
    IonRouterOutlet,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonAccordion,
    IonAccordionGroup
  ]

})
export class AppComponent {


  constructor(

    private router: Router,

    private menuController: MenuController

  ) {}


  // ==================================================
  // NAVEGACIÓN NORMAL
  // ==================================================

  async navegar(ruta: string): Promise<void> {

    // Cierra el menú lateral.
    await this.menuController.close('main-menu');

    // Navega a la ruta indicada.
    await this.router.navigate([ruta]);

  }


  // ==================================================
  // NAVEGACIÓN POR CATEGORÍA
  // ==================================================

  async navegarCategoria(
    categoria: 'hombre' | 'mujer' | 'otros'
  ): Promise<void> {

    // Cerramos el menú.
    await this.menuController.close('main-menu');

    // Navegamos directamente a una ruta
    // específica para cada categoría.
    await this.router.navigate([
      '/catalogo',
      categoria
    ]);

  }

}