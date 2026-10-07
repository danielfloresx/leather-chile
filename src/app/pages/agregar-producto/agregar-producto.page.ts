import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonItem,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonButton,
  ToastController
} from '@ionic/angular';

import { Producto } from '../../models/producto.model';

import { ProductoService }
  from '../../services/producto.service';


@Component({

  selector: 'app-agregar-producto',

  standalone: true,

  templateUrl: './agregar-producto.page.html',

  styleUrls: ['./agregar-producto.page.scss'],

  imports: [

    // Formularios reactivos.
    ReactiveFormsModule,

    // Navegación.
    RouterLink,

    // Componentes Ionic.
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonMenuButton,
    IonItem,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonToggle,
    IonButton

  ]

})
export class AgregarProductoPage {


  // Formulario principal.
  productoForm: FormGroup;


  constructor(

    // Permite construir el formulario.
    private formBuilder: FormBuilder,

    // Servicio encargado de los productos.
    private productoService: ProductoService,

    // Permite cambiar de página mediante TypeScript.
    private router: Router,

    // Permite mostrar mensajes temporales.
    private toastController: ToastController

  ) {


    // ==================================================
    // FORMULARIO REACTIVO
    // ==================================================

    this.productoForm =
      this.formBuilder.group({


        // Nombre obligatorio.
        // Mínimo 3 caracteres.
        nombre: [
          '',
          [
            Validators.required,
            Validators.minLength(3)
          ]
        ],


        // Descripción obligatoria.
        // Mínimo 10 caracteres.
        descripcion: [
          '',
          [
            Validators.required,
            Validators.minLength(10)
          ]
        ],


        // Precio obligatorio.
        // Mínimo $1.000.
        precio: [
          '',
          [
            Validators.required,
            Validators.min(1000)
          ]
        ],


        // Categoría obligatoria.
        categoria: [
          '',
          Validators.required
        ],


        // Por defecto el producto no es destacado.
        destacado: [
          false
        ],


        // Por defecto el producto será visible
        // en el catálogo público.
        publico: [
          true
        ]

      });



    // ==================================================
    // RELACIÓN ENTRE PÚBLICO Y DESTACADO
    // ==================================================

    const publicoControl =
      this.productoForm.get('publico');


    const destacadoControl =
      this.productoForm.get('destacado');


    // Escuchamos los cambios del interruptor
    // "Mostrar en catálogo público".
    publicoControl?.valueChanges.subscribe(
      publico => {


        // Si el producto es público...
        if (publico) {

          // Permitimos decidir si será destacado.
          destacadoControl?.enable();

        } else {

          // Si deja de ser público,
          // automáticamente deja de ser destacado.
          destacadoControl?.setValue(false);

          // Bloqueamos el control destacado.
          destacadoControl?.disable();

        }

      }
    );

  }



  // ==================================================
  // GUARDAR PRODUCTO
  // ==================================================

  async guardarProducto(): Promise<void> {


    // Si el formulario contiene errores...
    if (this.productoForm.invalid) {

      // Mostramos las validaciones.
      this.productoForm.markAllAsTouched();

      return;

    }


    // getRawValue permite obtener también
    // controles que estén deshabilitados.
    const datosFormulario =
      this.productoForm.getRawValue();



    // Creamos el nuevo producto.
    const nuevoProducto: Producto = {

      // Generamos un ID automáticamente.
      id:
        this.productoService
          .generarNuevoId(),

      nombre:
        datosFormulario.nombre,

      descripcion:
        datosFormulario.descripcion,

      precio:
        Number(
          datosFormulario.precio
        ),

      categoria:
        datosFormulario.categoria,

      // La imagen se implementará más adelante.
      imagen: '',

      destacado:
        datosFormulario.destacado,

      publico:
        datosFormulario.publico

    };



    // Guardamos el producto en el servicio.
    this.productoService
      .agregarProductoIngresado(
        nuevoProducto
      );



    // Creamos un mensaje de confirmación.
    const toast =
      await this.toastController.create({

        message:
          'Producto agregado correctamente.',

        duration: 1800,

        position: 'bottom'

      });



    // Mostramos el mensaje.
    await toast.present();



    // Limpiamos el formulario.
    this.productoForm.reset({

      destacado: false,

      publico: true

    });



    // Después de guardar,
    // enviamos al usuario al listado.
    this.router.navigate([
      '/listar-productos'
    ]);

  }

}