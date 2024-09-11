import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
let CarritoService = class CarritoService {
    constructor(http) {
        this.http = http;
        this.myAppUrl = environment.endPoint;
        this.myAppiUrl = '/api/carrito/';
    }
    agregarProducto(carrito) {
        return this.http.post(this.myAppUrl + this.myAppiUrl, carrito);
    }
};
CarritoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CarritoService);
export { CarritoService };
//# sourceMappingURL=carrito.service.js.map