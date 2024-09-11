import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
let AuthUsuariosService = class AuthUsuariosService {
    constructor(http) {
        this.http = http;
        this.myAppUrl = environment.endPoint;
        this.myAppiUrl = '/api/login/';
    }
    //login
    loginUsuario(usuario, passw) {
        const body = { usuario, passw };
        return this.http.post(this.myAppUrl + this.myAppiUrl, body);
    }
};
AuthUsuariosService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthUsuariosService);
export { AuthUsuariosService };
//# sourceMappingURL=auth.usuarios.service.js.map