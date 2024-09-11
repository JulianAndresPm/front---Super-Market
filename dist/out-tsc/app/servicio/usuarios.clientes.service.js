import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
let UsuariosClientesService = class UsuariosClientesService {
    constructor(http) {
        this.http = http;
        this.myAppUrl = environment.endPoint;
        this.myAppiUrl = '/api/clientes/';
    }
    //agregar usuario
    createCliente(cliente) {
        return this.http.post(this.myAppUrl + this.myAppiUrl, cliente);
    }
    // Obtener datos del cliente
    dataCliente(id) {
        return this.http.get(this.myAppUrl + this.myAppiUrl + id);
    }
    // Enviar los datos editados
    updateCliente(id, cliente) {
        return this.http.put(this.myAppUrl + this.myAppiUrl + id, cliente);
    }
};
UsuariosClientesService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], UsuariosClientesService);
export { UsuariosClientesService };
//# sourceMappingURL=usuarios.clientes.service.js.map