import { Producto } from "./producto";

export interface Carrito {
  id?: number;
  usuario_id: number;
  producto_id: number;
  cantidad: number;
  subtotal: number;
  Producto?: Producto | null; // Opcional o puede ser null
}
