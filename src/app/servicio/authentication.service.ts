import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../interfaces/DecodedToken';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  getToken(): string | null {
    const token = sessionStorage.getItem('token');
    return token;
  }

  //Decodificar el token JWT para obtener la informacion de payload
  getDecodedToken(){
    const token = this.getToken();

    if (token) {
      try {
        const decoded =  jwtDecode<DecodedToken>(token);
        return decoded;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
      }
    }
    return null;
  } 

  //obtener el rol del usuario desde el token decodificaco
  getUserRole(): string | null{
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.rol : null; 
  }

  //obeter el id del usuario
  getUserId(): number | null{
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.usuario.valueOf() : null;
  }

   // Obtener la información del cliente
   getUserInfo(): any {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.info : null; 
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
