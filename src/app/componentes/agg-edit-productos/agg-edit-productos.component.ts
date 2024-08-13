import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/servicio/producto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agg-edit-productos',
  templateUrl: './agg-edit-productos.component.html',
  styleUrls: ['./agg-edit-productos.component.scss'],
})
export class AggEditProductosComponent implements OnInit {
  form: FormGroup;
  id: number;
  titulo: string = 'Agregar';
  imagenPrevia: string | ArrayBuffer | null = null;
  imageUrl: string | ArrayBuffer | null = ''; 

  constructor(
    private fm: FormBuilder,
    private _productoServicio: ProductoService,
    private router: Router,
    private aRouter: ActivatedRoute
  ) {
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

  ngOnInit(): void {
    if (this.id !== 0) {
      this.titulo = 'Editar';
      this.EditarProducto(this.id);
    }
  }

  
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
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
    const inputElement = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = inputElement?.files?.[0]; // Accede al archivo

    if (file) {
      // console.log('Nombre del archivo:', file.name);
      // console.log('Tamaño del archivo:', file.size);
      // console.log('Tipo de archivo:', file.type);
      formData.append('imagen', file);  // Añade el archivo al FormData
    } else {
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
    } else {
      this._productoServicio.createProducto(formData).subscribe(() => {
        console.log('Producto agregado con éxito');
        this.router.navigate(['/']);
      }, error => {
        console.error('Error al agregar producto', error);
      });
    }
  }

  

  // Editar Producto
  EditarProducto(id: number) {
    this._productoServicio.dataProducto(id).subscribe((data: Producto) => {
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
      } else {
        
      }
    });
  }

  //ruta de la imsgen
  getImageUrl(imagePath: string | null | undefined): string {
    return imagePath ? `http://localhost:3000/imagenes/${imagePath}` : 'http://localhost:3000/imagenes/default-image.png';
  }
  
}
