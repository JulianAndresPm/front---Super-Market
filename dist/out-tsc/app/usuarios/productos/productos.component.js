import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ProductosComponent = class ProductosComponent {
    constructor(_productoServicio) {
        this._productoServicio = _productoServicio;
        this.listaProductos = [];
    }
    //obtener la lista de productos
    getProductos() {
        this._productoServicio.getListaProductos().subscribe((data) => {
            this.listaProductos = data;
        }, (error) => {
            console.error('Error al obtener los productos', error);
        });
    }
    //mostrar la imagen del producto
    getImageUrl(imagePath) {
        return imagePath ? `http://localhost:3000/imagenes/${imagePath}` : 'http://localhost:3000/imagenes/default-image.png';
    }
    ngOnInit() {
        this.getProductos();
    }
};
ProductosComponent = __decorate([
    Component({
        selector: 'app-productos',
        templateUrl: './productos.component.html',
        styleUrls: ['./productos.component.scss']
    })
], ProductosComponent);
export { ProductosComponent };
//# sourceMappingURL=productos.component.js.map