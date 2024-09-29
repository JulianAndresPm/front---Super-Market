import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';
import { Carrito } from 'src/app/interfaces/carrito';
import { ProductoService } from 'src/app/servicio/producto.service';
import { CarritoService } from 'src/app/servicio/carrito.service';
import { AuthenticationService } from 'src/app/servicio/authentication.service';



@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  listaProductos: Producto[] = [];

  // Variables para la función del carrito
  usuario_id = this._authentication.getUserId();
  carrito: Carrito[] = [];
  productos: any[] = [];

  constructor(
    private _productoServicio: ProductoService,
    private _CarritoService: CarritoService,
    private _authentication: AuthenticationService
  ) {}
  
  ngOnInit(): void {
    this.getProductos();
  }
  // Obtener la lista de productos
  getProductos() {

    this._productoServicio.getListaProductos().subscribe(
      (data) => {
        this.listaProductos = data;
      },
      (error) => {
        console.error('Error al obtener los productos', error);
      }
    );
  }

  // Mostrar la imagen del producto
  getImageUrl(imagePath: string | null | undefined): string {
    return imagePath? `http://localhost:3000/imagenes/${imagePath}`
      :'http://localhost:3000/imagenes/default-image.png';
  }


  // Agregar producto al carrito
  agregarAlCarrito(productoId: number): void {  
    if (!this.usuario_id) {
      console.error('No hay usuario autenticado. Por favor, inicia sesión.');
      console.log(Error);
      
      // Aquí podrías mostrar una notificación o redirigir al login
      return;
    }

    // Encontrar el producto en la lista de productos
    const producto = this.listaProductos.find(p => p.id === productoId);

    if (!producto) {
      console.error('Producto no encontrado.');
      return;
    }

    const cantidad = 1;
    const subtotal = producto.precio * cantidad;

    const carritoItem: Carrito = {
      usuario_id: this.usuario_id,
      producto_id: producto.id as number,
      cantidad: cantidad,
      subtotal: subtotal
    };

    this._CarritoService.agregarProducto(carritoItem).subscribe(
      () => {
      },
      (error) => {
        console.error('Error al agregar el producto al carrito:', error);
      }
    );
  }

}
