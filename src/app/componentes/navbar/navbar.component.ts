import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  UserInfo: any = null;
  UserType: any = null;
  token: any = null;
  message: any = null;
 


  constructor(private router: Router){}

  ngOnInit(): void {
    const UserInfo = sessionStorage.getItem('UserInfo');
    const UserType = sessionStorage.getItem('UserType');
    const token = sessionStorage.getItem('token')
    const message = sessionStorage.getItem('message')
    if (UserInfo) {
      this.UserInfo = JSON.parse(UserInfo);
      this.UserType = UserType;
      this.token = token;
      this.message = message;
      // console.log(UserType);
      
    }
  }

   //mostrar las fotos de los clientes
   getImageUrl(imagePath: string | null | undefined): string {
    if (this.UserType === 'cliente') {
      return imagePath ? `http://localhost:3000/fotosClientes/${imagePath}` : 'http://localhost:3000/imagenes/default-image.png';
    } else if (this.UserType === 'admin') {
      return imagePath ? `http://localhost:3000/fotosAdmin/${imagePath}` : 'http://localhost:3000/imagenes/default-image.png';
    } else {
      // Si UserType no es 'usuario' ni 'admin', devolvemos la imagen por defecto
      return 'http://localhost:3000/imagenes/default-image.png';
    }
  }
  

  // Método para verificar si el usuario ha iniciado sesión
  isLoggedIn(): boolean {
    return !!this.UserInfo;
  }

  // Método para verificar si el usuario es administrador
  getUserType(): string {
    return this.UserType;  
  }
   // Métodos para redirigir a las páginas de login y registro

   redirectToLogin(): void {
    window.location.href = '/login';
  }

  redirectToRegister(): void {
    // Redirigir a la página de registro
    window.location.href = '/registrar';
  }

  redirectToUpdate(): void {

    if (this.UserType === 'cliente') {
      this.router.navigate(['/editarUser', this.UserInfo.id]); 
      
    } else if (this.UserType === 'admin'){
      this.router.navigate(['/editarAdmin', this.UserInfo.id]); 
      
    }
   
  }

  redirectToExit():void{
    sessionStorage.clear();
    window.location.href = '/';

  }

}
