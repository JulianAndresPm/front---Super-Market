import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosAdminService } from 'src/app/servicio/usuarios-admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  form: FormGroup;
  id: number;
  fotoUrl: string | ArrayBuffer | null = '';
  titulo: string = 'Registrar';
  boton: string = 'Registrate';

  constructor(
    private fm: FormBuilder,
    private _usuariosAdminService: UsuariosAdminService, // Aquí debes inyectar el servicio
    private router: Router,
    private aRouter: ActivatedRoute
  ) {
    // Validaciones
    this.form = this.fm.group({
      nombre: ['', Validators.required],
      usuario: ['', Validators.required],
      passw: ['', Validators.required],
      rol: ['', Validators.required],
      foto: [null],
    });
    this.id = Number(this.aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id !== 0) {
      this.titulo = 'Editar';
      this.boton = 'Guardar';
      this.EditarUsuario(this.id);
    }
  }

  // Funciones

  // Obtener foto de usuario
  onFileSelected(event: any): void {
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
    const inputElement = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (inputElement) {
      const file = inputElement.files?.[0]; // Accede al archivo

      if (file) {
        formData.append('foto', file); // Añade el archivo al FormData
      } else {
        console.log('No se seleccionó ninguna imagen.');
      }
    } else {
      console.log('No se encontró el elemento de entrada del archivo.');
    }

    if (this.id !== 0) {
      this._usuariosAdminService.updateUsuario(this.id, formData).subscribe(
        () => {
          console.log('Producto fue actualizado con éxito');
          this.router.navigate(['/']); // Navegar después de la actualización
        },
        (error) => {
          console.error('Error al actualizar producto', error);
        }
      );
    } else {
      this._usuariosAdminService.createUsuario(formData).subscribe(
        () => {
          console.log('Usuario agregado con éxito');
          this.router.navigate(['/']); // Navegar después de la creación
        },
        (error) => {
          console.error('Error al crear el usuario', error);
        }
      );
    }
  }

  EditarUsuario(id: number) {
    this._usuariosAdminService.dataCliente(id).subscribe((data: Usuario) => {
      this.form.patchValue({
        nombre: data.nombre,
        usuario: data.usuario,
        passw: data.usuario,
        rol: data.rol,
        foto: null,
      });
      if (data.foto) {
        this.fotoUrl = this.getFotoUrl(data.foto);
        console.log(this.fotoUrl);
        
      }
    });
  }

  getFotoUrl(imagePath: string | null | undefined): string {
    return imagePath
      ? `http://localhost:3000/fotosAdmin/${imagePath}`: 'http://localhost:3000/fotosAdmin/default-image.png';
  }
}
