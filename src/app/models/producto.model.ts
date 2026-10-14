//Modelo del producto

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: 'Hombre' | 'Mujer' | 'Otros Productos';
  imagen: string;
  destacado: boolean;
  publico?: boolean;
}
