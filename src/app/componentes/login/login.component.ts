import { Component, OnInit } from '@angular/core';
import { AuthUsuariosService } from 'src/app/servicio/auth.usuarios.service';
import { AuthenticationService } from 'src/app/servicio/authentication.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usuario: string = '';
  passw: string = '';
  isLoggedIn: boolean = false;
  UserInfo: any = null;
  UserType: any = null;


  constructor(private _usuarioServicio: AuthUsuariosService, private _authentication:  AuthenticationService) {}

  onSubmit() {

    this._usuarioServicio.loginUsuario(this.usuario, this.passw).subscribe(
      (response) => {

        sessionStorage.setItem('token', response.accesstoken);

        // Decodificar el token y mostrarlo en la consola
        const decodedToken = this._authentication.getDecodedToken();
        console.log('Token decodificado en Login:', decodedToken);

        this.isLoggedIn = true

        //verificar que tipo de usuario es:
        if (this._authentication.getUserRole() === 'admin') {
            window.location.href = '/';
          
        }if(this._authentication.getUserRole() ==='cliente'){
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
    // Verifica si el token está en el SessionStorage
    const token = sessionStorage.getItem('token');
    this.isLoggedIn = !!token; // Establecer isLoggedIn basándote en la existencia del token
  }
  
}
