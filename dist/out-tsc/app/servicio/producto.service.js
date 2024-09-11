import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
let ProductoService = class ProductoService {
    constructor(http) {
        this.http = http;
        this.myAppUrl = environment.endPoint;
        this.myAppiUrl = '/api/productos/';
    }
    // Lista productos
    getListaProductos() {
        return this.http.get(this.myAppUrl + this.myAppiUrl);
    }
    // Eliminar producto
    deteleProducto(id) {
        return this.http.delete(this.myAppUrl + this.myAppiUrl + id);
    }
    // Agregar producto
    createProducto(producto) {
        return this.http.post(this.myAppUrl + this.myAppiUrl, producto);
    }
    // Obtener datos del Producto
    dataProducto(id) {
        return this.http.get(this.myAppUrl + this.myAppiUrl + id);
    }
    // Enviar los datos editados
    updateProducto(id, producto) {
        return this.http.put(this.myAppUrl + this.myAppiUrl + id, producto);
    }
};
ProductoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ProductoService);
export { ProductoService };
//# sourceMappingURL=producto.service.js.map