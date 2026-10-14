
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, firstValueFrom, map } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  // Dirección de la API local.
  private readonly API_URL = 'http://localhost:3000/api/productos';

  // Productos iniciales del catálogo.
  private productosSubject =
    new BehaviorSubject<Producto[]>([]);

  productos$ = this.productosSubject.asObservable();

  // Productos creados desde Administración.
  private productosIngresadosSubject =
    new BehaviorSubject<Producto[]>([]);

  productosIngresados$ =
    this.productosIngresadosSubject.asObservable();

  // Une ambas listas y oculta los productos no públicos.
  productosPublicos$ = combineLatest([
    this.productos$,
    this.productosIngresados$
  ]).pipe(
    map(([base, ingresados]) =>
      [...base, ...ingresados].filter(
        producto => producto.publico !== false
      )
    )
  );

  constructor(private http: HttpClient) {
    // Carga los datos guardados en MySQL.
    void this.cargarProductos();
  }

  // Convierte los campos de MySQL al modelo Angular.
  private convertirProducto(fila: any): Producto {
    return {
      id: Number(fila.id),
      nombre: fila.nombre,
      descripcion: fila.descripcion ?? '',
      precio: Number(fila.precio),
      categoria: fila.categoria,
      imagen: fila.imagen ?? '',
      destacado: Boolean(Number(fila.destacado)),
      publico: Boolean(Number(fila.mostrar_catalogo))
    };
  }

  // Carga los productos desde el backend.
  async cargarProductos(): Promise<void> {
    try {
      const filas = await firstValueFrom(
        this.http.get<any[]>(`${this.API_URL}/admin`)
      );

      const todos = filas.map(
        fila => this.convertirProducto(fila)
      );

      // Conserva la separación que usaba la aplicación.
      this.productosSubject.next(
        todos.filter(producto => producto.id < 101)
      );

      this.productosIngresadosSubject.next(
        todos.filter(producto => producto.id >= 101)
      );

    } catch (error) {
      console.error(
        'No se pudieron cargar los productos desde la API.',
        error
      );
    }
  }

  // Prepara los datos que espera el backend.
  private prepararDatos(producto: Producto) {
    const publico = producto.publico !== false;

    return {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: Number(producto.precio),
      categoria: producto.categoria,
      imagen: producto.imagen || '',
      mostrar_catalogo: publico,
      destacado: publico && producto.destacado
    };
  }

  // Agrega un producto en la base de datos
  async agregarProductoIngresado(
    producto: Producto
  ): Promise<void> {
    await firstValueFrom(
      this.http.post(this.API_URL, this.prepararDatos(producto))
    );

    await this.cargarProductos();
  }

  // Mantiene disponible el método anterior
  async agregarProducto(producto: Producto): Promise<void> {
    await this.agregarProductoIngresado(producto);
  }

  // Editar Productos
  async editarProductoIngresado(
    producto: Producto
  ): Promise<void> {
    await firstValueFrom(
      this.http.put(
        `${this.API_URL}/${producto.id}`,
        this.prepararDatos(producto)
      )
    );

    await this.cargarProductos();
  }

  // Eliminar Productos
  async eliminarProductoIngresado(
    id: number
  ): Promise<void> {
    await firstValueFrom(
      this.http.delete(`${this.API_URL}/${id}`)
    );

    await this.cargarProductos();
  }

  // Mantiene disponible el método anterior
  async eliminarProducto(id: number): Promise<void> {
    await this.eliminarProductoIngresado(id);
  }

  // Devuelve los productos iniciales en memoria.
  obtenerProductos(): Producto[] {
    return this.productosSubject.value;
  }

  // Compatibilidad con el código anterior.
  generarNuevoId(): number {
    const ids = [
      ...this.productosSubject.value,
      ...this.productosIngresadosSubject.value
    ].map(producto => producto.id);

    return Math.max(100, ...ids) + 1;
  }
}
