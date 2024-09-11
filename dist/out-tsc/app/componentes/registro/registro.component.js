import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let RegistroComponent = class RegistroComponent {
    constructor(fm, _usuariosAdminService, // Aquí debes inyectar el servicio
    router, aRouter, storageService) {
        this.fm = fm;
        this._usuariosAdminService = _usuariosAdminService;
        this.router = router;
        this.aRouter = aRouter;
        this.storageService = storageService;
        this.fotoUrl = '';
        this.titulo = 'Registrar';
        this.boton = 'Registrate';
        // Validaciones
        this.form = this.fm.group({
            nombre: ['', Validators.required],
            usuario: ['', Validators.required],
            passw: ['', Validators.required],
            rol: ['', Validators.required],
            foto: [null],
        });
        this.id = Number(this.aRouter.snapshot.paramMap.get('id'));
        this.UserInfo = this.storageService.getItem('UserInfo');
    }
    ngOnInit() {
        if (this.id !== 0) {
            this.titulo = 'Editar';
            this.boton = 'Guardar';
            this.EditarUsuario(this.id);
        }
    }
    // Funciones
    // Obtener foto de usuario
    onFileSelected(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            this.form.get('foto')?.setValue(file);
        }
    }
    AddUpdateUsuario() {
        const formData = new FormData();
        formData.append('nombre', this.form.get('nombre')?.value);
        formData.append('usuario', this.form.get('usuario')?.value);
        formData.append('passw', this.form.get('passw')?.value);
        formData.append('rol', this.form.get('rol')?.value);
        // Captura la foto
        const inputElement = document.querySelector('input[type="file"]');
        if (inputElement) {
            const file = inputElement.files?.[0]; // Accede al archivo
            if (file) {
                formData.append('foto', file); // Añade el archivo al FormData
            }
            else {
                console.log('No se seleccionó ninguna imagen.');
            }
        }
        else {
            console.log('No se encontró el elemento de entrada del archivo.');
        }
        if (this.id !== 0) {
            this._usuariosAdminService.updateUsuario(this.id, formData).subscribe((Admin) => {
                console.log('usuario admin fue actualizado con éxito');
                // Eliminar la entrada anterior de sessionStorage
                this.storageService.removeItem('UserInfo');
                // Guarda el objeto Cliente desanidado directamente en sessionStorage
                this.storageService.setItem('UserInfo', Admin);
                this.router.navigate(['/']); // Navegar después de la actualización
            }, (error) => {
                console.error('Error al actualizar', error);
            });
        }
        else {
            this._usuariosAdminService.createUsuario(formData).subscribe(() => {
                console.log('Usuario agregado con éxito');
                this.router.navigate(['/']); // Navegar después de la creación
            }, (error) => {
                console.error('Error al crear el usuario', error);
            });
        }
    }
    EditarUsuario(id) {
        this._usuariosAdminService.dataCliente(id).subscribe((data) => {
            this.form.patchValue({
                nombre: data.nombre,
                usuario: data.usuario,
                passw: data.passw,
                rol: data.rol,
                foto: null,
            });
            if (data.foto) {
                this.fotoUrl = this.getFotoUrl(data.foto);
                console.log(this.fotoUrl);
            }
        });
    }
    getFotoUrl(imagePath) {
        return imagePath
            ? `http://localhost:3000/fotosAdmin/${imagePath}` : 'http://localhost:3000/fotosAdmin/default-image.png';
    }
};
RegistroComponent = __decorate([
    Component({
        selector: 'app-registro',
        templateUrl: './registro.component.html',
        styleUrls: ['./registro.component.scss'],
    })
], RegistroComponent);
export { RegistroComponent };
//# sourceMappingURL=registro.component.js.map