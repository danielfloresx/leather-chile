import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AsyncPipe } from '@angular/common';

import { RouterLink } from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonModal,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonItem,
  AlertController
} from '@ionic/angular';

import { Producto } from '../../models/producto.model';

import { ProductoService }
  from '../../services/producto.service';


@Component({

  selector: 'app-listar-productos',

  standalone: true,

  templateUrl: './listar-productos.page.html',

  styleUrls: ['./listar-productos.page.scss'],

  imports: [
    FormsModule,
    AsyncPipe,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonMenuButton,
    IonButton,
    IonModal,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonToggle,
    IonItem
  ]

})
export class ListarProductosPage {

  // Observable de productos administrativos.
  productosIngresados$;

  // Control del modal.
  modalEditarAbierto: boolean = false;

  // Copia del producto que se está editando.
  productoEditando: Producto | null = null;

  constructor(

    private alertController: AlertController,
    private productoService: ProductoService

  ) {

    this.productosIngresados$ =
      this.productoService
        .productosIngresados$;

  }


  // ==================================================
  // ABRIR EDICIÓN
  // ==================================================

  abrirEditar(
    producto: Producto
  ): void {

    // Copia del producto.
    this.productoEditando = {

      ...producto,
      publico:
        producto.publico ?? true

    };

    this.modalEditarAbierto = true;

  }


  // ==================================================
  // CERRAR EDICIÓN
  // ==================================================

  cerrarEditar(): void {

    this.modalEditarAbierto = false;
    this.productoEditando = null;

  }


  // ==================================================
  // CAMBIO PÚBLICO / DESTACADO
  // ==================================================

  cambiarEstadoPublico(
    publico: boolean
  ): void {

    if (!this.productoEditando) {
      return;
    }


    // Si deja de ser público, deja también de ser destacado.
    if (!publico) {
      this.productoEditando.destacado = false;
    }

  }


  // ==================================================
  // GUARDAR CAMBIOS
  // ==================================================

  async guardarCambios(): Promise<void> {
    if (!this.productoEditando) {
      return;
    }

    try {
      await this.productoService.editarProductoIngresado(
        this.productoEditando
      );

      this.cerrarEditar();

    } catch (error) {
      console.error('Error al editar:', error);

      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudieron guardar los cambios.',
        buttons: ['Aceptar']
      });

      await alert.present();
    }
  }


  // ==================================================
  // CONFIRMAR ELIMINACIÓN
  // ==================================================

  async confirmarEliminacion(
    producto: Producto
  ): Promise<void> {


    const alert =
      await this.alertController.create({

        header: 'Eliminar producto',
        message: `¿Deseas eliminar "${producto.nombre}"?`,
        buttons: [

          {
            text: 'Cancelar',
            role: 'cancel'
          },

          {
            text: 'Eliminar',
            role: 'destructive',

            handler: () => {
              this.eliminarProducto(
                producto.id
              );
            }
          }
        ]
      });


    await alert.present();

  }


  // ==================================================
  // ELIMINAR
  // ==================================================

  async eliminarProducto(id: number): Promise<void> {
    try {
      await this.productoService.eliminarProductoIngresado(id);

    } catch (error) {
      console.error('Error al eliminar:', error);

      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo eliminar el producto.',
        buttons: ['Aceptar']
      });

      await alert.present();
    }
  }

}