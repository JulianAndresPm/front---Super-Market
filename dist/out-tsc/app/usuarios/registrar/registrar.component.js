import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let RegistrarComponent = class RegistrarComponent {
    constructor(fm, _usuariosClientService, // Aquí debes inyectar el servicio
    router, aRouter, storageService) {
        this.fm = fm;
        this._usuariosClientService = _usuariosClientService;
        this.router = router;
        this.aRouter = aRouter;
        this.storageService = storageService;
        this.fotoUrl = '';
        this.titulo = 'Registrate';
        this.boton = 'Enviar';
        this.form = this.fm.group({
            nombres: ['', Validators.required],
            apellidos: ['', Validators.required],
            edad: ['', Validators.required],
            sexo: ['', Validators.required],
            correo: ['', Validators.required],
            foto: [null],
            usuario: ['', Validators.required],
            contrasena: ['', Validators.required],
        });
        this.id = Number(this.aRouter.snapshot.paramMap.get('id'));
        this.UserInfo = this.storageService.getItem('UserInfo');
    }
    ngOnInit() {
        if (this.id !== 0) {
            this.titulo = 'Actualizar';
            this.boton = 'Guardar';
            this.EditarCliente(this.id);
        }
    }
    // Obtener foto de cliente
    onFileSelected(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            this.form.get('foto')?.setValue(file);
        }
    }
    addClientes() {
        const formData = new FormData();
        formData.append('nombres', this.form.get('nombres')?.value);
        formData.append('apellidos', this.form.get('apellidos')?.value);
        formData.append('edad', this.form.get('edad')?.value);
        formData.append('sexo', this.form.get('sexo')?.value);
        formData.append('correo', this.form.get('correo')?.value);
        formData.append('usuario', this.form.get('usuario')?.value);
        formData.append('contrasena', this.form.get('contrasena')?.value);
        // Captura la foto
        const inputElement = document.querySelector('input[type="file"]');
        const file = inputElement?.files?.[0]; // Accede al archivo
        if (file) {
            formData.append('foto', file); // Añade el archivo al FormData
        }
        else {
            console.log('No se seleccionó ninguna imagen.');
        }
        // // Mostrar los datos en la consola
        // formData.forEach((value, key) => {
        //   console.log(`${key}:`, value);
        // });
        if (this.id !== 0) {
            this._usuariosClientService.updateCliente(this.id, formData).subscribe((Cliente) => {
                console.log('Usuario cliente fue actualizado con exito');
                // Eliminar la entrada anterior de sessionStorage
                this.storageService.removeItem('UserInfo');
                // Guarda el objeto Cliente desanidado directamente en sessionStorage
                this.storageService.setItem('UserInfo', Cliente);
                this.router.navigate(['/']);
            }, (error) => {
                console.error('error al actualizar datos del cliente', error);
            });
        }
        else {
            this._usuariosClientService.createCliente(formData).subscribe(() => {
                console.log('cliente agregado con éxito');
            }, (error) => {
                console.error('error registrar datos del cliente', error);
            });
        }
    }
    EditarCliente(id) {
        this._usuariosClientService.dataCliente(id).subscribe((data) => {
            this.form.patchValue({
                nombres: data.nombres,
                apellidos: data.apellidos,
                edad: data.edad,
                sexo: data.sexo,
                correo: data.correo,
                usuario: data.usuario,
                contrasena: data.contrasena,
                foto: null
            });
        });
    }
};
RegistrarComponent = __decorate([
    Component({
        selector: 'app-registrar',
        templateUrl: './registrar.component.html',
        styleUrls: ['./registrar.component.scss'],
    })
], RegistrarComponent);
export { RegistrarComponent };
//# sourceMappingURL=registrar.component.js.map