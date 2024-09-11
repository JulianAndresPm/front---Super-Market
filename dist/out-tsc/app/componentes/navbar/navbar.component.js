import { __decorate } from "tslib";
import { Component } from '@angular/core';
let NavbarComponent = class NavbarComponent {
    constructor(router, _CarritoService, _ProductoService) {
        this.router = router;
        this._CarritoService = _CarritoService;
        this._ProductoService = _ProductoService;
        //varibales para la funcion del carrito
        this.usuario_id = +sessionStorage.getItem('id');
        this.carrito = [];
        this.productos = [];
        //variables para la funcion mostrar usuario
        this.UserInfo = null;
        this.UserType = null;
        this.token = null;
        this.message = null;
    }
    //-------------------funciones para mostrart usuario ----------------------------------
    ngOnInit() {
        const UserInfo = sessionStorage.getItem('UserInfo');
        const UserType = sessionStorage.getItem('UserType');
        const token = sessionStorage.getItem('token');
        const message = sessionStorage.getItem('message');
        if (UserInfo) {
            this.UserInfo = JSON.parse(UserInfo);
            this.UserType = UserType;
            this.token = token;
            this.message = message;
        }
    }
    //mostrar las fotos de los clientes
    getImageUrl(imagePath) {
        if (this.UserType === 'cliente') {
            return imagePath ? `http://localhost:3000/fotosClientes/${imagePath}` : 'http://localhost:3000/imagenes/default-image.png';
        }
        else if (this.UserType === 'admin') {
            return imagePath ? `http://localhost:3000/fotosAdmin/${imagePath}` : 'http://localhost:3000/imagenes/default-image.png';
        }
        else {
            // Si UserType no es 'usuario' ni 'admin', devolvemos la imagen por defecto
            return 'http://localhost:3000/imagenes/default-image.png';
        }
    }
    // Método para verificar si el usuario ha iniciado sesión
    isLoggedIn() {
        return !!this.UserInfo;
    }
    // Método para verificar si el usuario es administrador
    getUserType() {
        return this.UserType;
    }
    // Métodos para redirigir a las páginas de login y registro
    redirectToLogin() {
        window.location.href = '/login';
    }
    redirectToRegister() {
        // Redirigir a la página de registro
        window.location.href = '/registrar';
    }
    redirectToUpdate() {
        if (this.UserType === 'cliente') {
            this.router.navigate(['/editarUser', this.UserInfo.id]);
        }
        else if (this.UserType === 'admin') {
            this.router.navigate(['/editarAdmin', this.UserInfo.id]);
        }
    }
    redirectToExit() {
        sessionStorage.clear();
        window.location.href = '/';
    }
    // --------------------------- funciones para agregra al carrito ---------------------------------
    agregarProducto(producto) {
        const cantidad = 1;
        const subtotal = producto.precio * cantidad;
        const carritoItem = {
            usuario_id: this.usuario_id,
            producto_id: producto.id,
            cantidad: cantidad,
            subtotal: subtotal
        };
        this._CarritoService.agregarProducto(carritoItem).subscribe(() => {
            console.log('Producto agregado al carrito');
            this.cargarCarrito(); // Recargar el carrito después de agregar un producto
        });
    }
};
NavbarComponent = __decorate([
    Component({
        selector: 'app-navbar',
        templateUrl: './navbar.component.html',
        styleUrls: ['./navbar.component.scss']
    })
], NavbarComponent);
export { NavbarComponent };
//# sourceMappingURL=navbar.component.js.map