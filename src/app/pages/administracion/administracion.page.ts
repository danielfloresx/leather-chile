import { Component } from '@angular/core';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonCard,
  IonCardContent
} from '@ionic/angular';

import { RouterLink } from '@angular/router';


@Component({

  selector: 'app-administracion',

  standalone: true,

  templateUrl: './administracion.page.html',

  styleUrls: ['./administracion.page.scss'],

  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonMenuButton,
    IonCard,
    IonCardContent,
    RouterLink
  ]

})
export class AdministracionPage {

  constructor() {}

}