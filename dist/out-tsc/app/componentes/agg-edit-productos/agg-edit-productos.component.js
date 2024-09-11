import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let AggEditProductosComponent = class AggEditProductosComponent {
    constructor(fm, _productoServicio, router, aRouter) {
        this.fm = fm;
        this._productoServicio = _productoServicio;
        this.router = router;
        this.aRouter = aRouter;
        this.titulo = 'Agregar';
        this.imagenPrevia = null;
        this.imageUrl = '';
        // Validaciones
        this.form = this.fm.group({
            nombre: ['', Validators.required],
            descripcion: ['', Validators.required],
            precio: ['', Validators.required],
            stock: ['', Validators.required],
            imagen: [null],
        });
        this.id = Number(this.aRouter.snapshot.paramMap.get('id'));
    }
    ngOnInit() {
        if (this.id !== 0) {
            this.titulo = 'Editar';
            this.EditarProducto(this.id);
        }
    }
    onFileSelected(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.imagenPrevia = e.target.result;
            };
            reader.readAsDataURL(file);
            this.form.get('imagen')?.setValue(file);
        }
    }
    addProducto() {
        const formData = new FormData();
        formData.append('nombre', this.form.get('nombre')?.value);
        formData.append('descripcion', this.form.get('descripcion')?.value);
        formData.append('precio', this.form.get('precio')?.value);
        formData.append('stock', this.form.get('stock')?.value);
        // Capturar el archivo de la imagen correctamente
        const inputElement = document.querySelector('input[type="file"]');
        const file = inputElement?.files?.[0]; // Accede al archivo
        if (file) {
            // console.log('Nombre del archivo:', file.name);
            // console.log('Tamaño del archivo:', file.size);
            // console.log('Tipo de archivo:', file.type);
            formData.append('imagen', file); // Añade el archivo al FormData
        }
        else {
            console.log("No se seleccionó ninguna imagen.");
        }
        // // Mostrar los datos en la consola
        // formData.forEach((value, key) => {
        //   console.log(`${key}:`, value);
        // });
        if (this.id !== 0) {
            this._productoServicio.updateProducto(this.id, formData).subscribe(() => {
                console.log('Producto fue actualizado con éxito');
                this.router.navigate(['/']);
            }, error => {
                console.error('Error al actualizar producto', error);
            });
        }
        else {
            this._productoServicio.createProducto(formData).subscribe(() => {
                console.log('Producto agregado con éxito');
                this.router.navigate(['/']);
            }, error => {
                console.error('Error al agregar producto', error);
            });
        }
    }
    // Editar Producto
    EditarProducto(id) {
        this._productoServicio.dataProducto(id).subscribe((data) => {
            this.form.patchValue({
                nombre: data.nombre,
                descripcion: data.descripcion,
                precio: data.precio,
                stock: data.stock,
                imagen: null
            });
            // Configurar la URL de la imagen para mostrarla en la vista de edición
            if (data.imagen) {
                this.imageUrl = this.getImageUrl(data.imagen);
            }
            else {
            }
        });
    }
    //ruta de la imsgen
    getImageUrl(imagePath) {
        return imagePath ? `http://localhost:3000/imagenes/${imagePath}` : 'http://localhost:3000/imagenes/default-image.png';
    }
};
AggEditProductosComponent = __decorate([
    Component({
        selector: 'app-agg-edit-productos',
        templateUrl: './agg-edit-productos.component.html',
        styleUrls: ['./agg-edit-productos.component.scss'],
    })
], AggEditProductosComponent);
export { AggEditProductosComponent };
//# sourceMappingURL=agg-edit-productos.component.js.map