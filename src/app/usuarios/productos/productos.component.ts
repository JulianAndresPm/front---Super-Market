import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/servicio/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  listaProductos: Producto[] = [];
  constructor(private _productoServicio: ProductoService){

  }

  //obtener la lista de productos
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

  //mostrar la imagen del producto
  getImageUrl(imagePath: string | null | undefined): string {
    return imagePath ? `http://localhost:3000/imagenes/${imagePath}` : 'http://localhost:3000/imagenes/default-image.png';
  }

  ngOnInit(): void {
   this.getProductos();
  }

}
