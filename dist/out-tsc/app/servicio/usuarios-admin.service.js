import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
let UsuariosAdminService = class UsuariosAdminService {
    constructor(http) {
        this.http = http;
        this.myAppUrl = environment.endPoint;
        this.myAppiUrl = '/api/admin/';
    }
    //agregar usuario
    createUsuario(Admin) {
        return this.http.post(this.myAppUrl + this.myAppiUrl, Admin);
    }
    // Obtener datos del Producto
    dataCliente(id) {
        return this.http.get(this.myAppUrl + this.myAppiUrl + id);
    }
    // Enviar los datos editados
    updateUsuario(id, Admin) {
        return this.http.put(this.myAppUrl + this.myAppiUrl + id, Admin);
    }
};
UsuariosAdminService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], UsuariosAdminService);
export { UsuariosAdminService };
//# sourceMappingURL=usuarios-admin.service.js.map