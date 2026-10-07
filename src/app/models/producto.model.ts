// Define la estructura que debe tener cada producto.
export interface Producto {

  // Identificador único.
  id: number;

  nombre: string;

  descripcion: string;

  precio: number;

  // Categoría permitida.
  categoria: 'Hombre' | 'Mujer' | 'Otros Productos';

  // Ruta o nombre de imagen.
  imagen: string;

  // Indica si aparece como destacado.
  destacado: boolean;

  // Indica si puede aparecer en el catálogo público.
  publico?: boolean;
}