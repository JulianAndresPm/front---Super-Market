import { __decorate } from "tslib";
import { Component } from '@angular/core';
let LoginComponent = class LoginComponent {
    constructor(_productoServicio) {
        this._productoServicio = _productoServicio;
        this.usuario = '';
        this.passw = '';
        this.isLoggedIn = false;
        this.UserInfo = null;
        this.UserType = null;
    }
    onSubmit() {
        // console.log(this.usuario, this.passw);
        this._productoServicio.loginUsuario(this.usuario, this.passw).subscribe((response) => {
            // console.log('Acceso concedido, bienvenido ' + this.usuario);
            sessionStorage.setItem('token', response.accesstoken); // Almacena el token en sessionStorage
            sessionStorage.setItem('UserType', response.UserType);
            sessionStorage.setItem('message', response.message);
            //verificar que tipo de usuario es:
            if (response.UserType === 'admin') {
                sessionStorage.setItem('UserInfo', JSON.stringify(response.admin)); // Guardar información adicional si es necesario
                // Redirigir a la página principal 
                window.location.href = '/';
            }
            if (response.UserType === 'cliente') {
                sessionStorage.setItem('UserInfo', JSON.stringify(response.cliente)); // Guardar información adicional si es necesario
                // Redirigir a la página principal 
                window.location.href = '/';
            }
        }, (error) => {
            console.error('Error al iniciar sesión', error);
        });
    }
    ngOnInit() {
        // Verifica si el token está en el localStorage
        const token = sessionStorage.getItem('token');
        const UserInfo = sessionStorage.getItem('UserInfo') ?? '{}';
        if (token) {
            this.isLoggedIn = true;
            this.UserInfo = JSON.parse(UserInfo); // Convertir la cadena JSON en un objeto
        }
        else {
            this.isLoggedIn = false;
        }
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map