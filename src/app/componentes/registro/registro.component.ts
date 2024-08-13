import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosAdminService } from 'src/app/servicio/usuarios-admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  form: FormGroup;
  id: number;
  fotoUrl: string | ArrayBuffer | null = '';
  titulo: string = 'Registrar';

  constructor(
    private fm: FormBuilder,
    private _usuariosAdminService: UsuariosAdminService,  // Aquí debes inyectar el servicio
    private router: Router,
    private aRouter: ActivatedRoute
  ) {
    // Validaciones
    this.form = this.fm.group({
      nombre: ['', Validators.required],
      usuario: ['', Validators.required],
      passw: ['', Validators.required],
      rol: ['', Validators.required],
      foto: [null]
    });
    this.id = Number(this.aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    // Implementación de ngOnInit si es necesario
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

  addUsuario() {
    const formData = new FormData();
    formData.append('nombre', this.form.get('nombre')?.value);
    formData.append('usuario', this.form.get('usuario')?.value);
    formData.append('passw', this.form.get('passw')?.value);
    formData.append('rol', this.form.get('rol')?.value);

    // Captura la foto
    const inputElement = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = inputElement?.files?.[0]; // Accede al archivo
    
    if (file) {
      formData.append('foto', file);  // Añade el archivo al FormData
    } else {
      console.log("No se seleccionó ninguna imagen.");
    }

    // Mostrar los datos en la consola
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    this._usuariosAdminService.createUsuario(formData).subscribe(() => {
      console.log('Usuario agregado con éxito');
    });
  }
}
