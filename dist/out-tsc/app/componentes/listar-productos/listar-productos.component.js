import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ListarProductosComponent = class ListarProductosComponent {
    constructor(_productoServicio) {
        this._productoServicio = _productoServicio;
        this.listaProductos = [];
    }
    ngOnInit() {
        this.getProductos();
    }
    //obtener la lista de productos
    getProductos() {
        this._productoServicio.getListaProductos().subscribe((data) => {
            this.listaProductos = data;
        }, (error) => {
            console.error('Error al obtener los productos', error);
        });
    }
    //eliminar productos
    eliminarProducto(id) {
        this._productoServicio.deteleProducto(id).subscribe(() => {
            this.getProductos();
        }, (error) => {
            console.error('Error al obtener los productos', error);
        });
    }
    //mostrar la imagen del producto
    getImageUrl(imagePath) {
        return imagePath ? `http://localhost:3000/imagenes/${imagePath}` : 'http://localhost:3000/imagenes/default-image.png';
    }
};
ListarProductosComponent = __decorate([
    Component({
        selector: 'app-listar-productos',
        templateUrl: './listar-productos.component.html',
        styleUrls: ['./listar-productos.component.scss'],
    })
], ListarProductosComponent);
export { ListarProductosComponent };
//# sourceMappingURL=listar-productos.component.js.map