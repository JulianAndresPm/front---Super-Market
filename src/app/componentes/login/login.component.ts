import { Component, OnInit } from '@angular/core';
import { AuthUsuariosService } from 'src/app/servicio/auth.usuarios.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usuario: string = '';
  passw: string = '';
  isLoggedIn: boolean = false;
  userInfo: any = null;
  userType: any = null;


  constructor(private _productoServicio: AuthUsuariosService) {}

  onSubmit() {
    // console.log(this.usuario, this.passw);
    
    this._productoServicio.loginUsuario(this.usuario, this.passw).subscribe(
      (response) => {
        // console.log('Acceso concedido, bienvenido ' + this.usuario);
        sessionStorage.setItem('token', response.accesstoken); // Almacena el token en sessionStorage
        sessionStorage.setItem('UserType', response.UserType);
        sessionStorage.setItem('message', response.message);
        

        //verificar que tipo de usuario es:
        if (response.UserType === 'admin') {
          sessionStorage.setItem('userInfo',JSON.stringify( response.admin)); // Guardar información adicional si es necesario
            // Redirigir a la página principal 
            window.location.href = '/';
          
        }if(response.UserType ==='cliente'){
          sessionStorage.setItem('userInfo',JSON.stringify( response.cliente)); // Guardar información adicional si es necesario
            // Redirigir a la página principal 
            window.location.href = '/';
        }
        
      },
      (error) => {
        console.error('Error al iniciar sesión', error);
      }
    );
  }

  ngOnInit(): void {
    // Verifica si el token está en el localStorage
    const token = sessionStorage.getItem('token');
    const userInfo = sessionStorage.getItem('userInfo') ?? '{}';
    if (token) {
      this.isLoggedIn = true;
      this.userInfo = JSON.parse(userInfo); // Convertir la cadena JSON en un objeto
    } else {
      this.isLoggedIn = false;
      
    }
  }
  
}
