import { HttpClient } from '@angular/common/http';
import {Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import {Admin} from '../interfaces/admin'
@Injectable({
  providedIn: 'root'
})
export class UsuariosAdminService {
  private myAppUrl: string;
  private myAppiUrl: string;

  constructor(private http: HttpClient ) {
    this.myAppUrl = environment.endPoint;
    this.myAppiUrl = '/api/admin/';
  }

  //agregar usuario
  createUsuario(Admin: FormData): Observable<void>{
    return this.http.post<void>(this.myAppUrl + this.myAppiUrl, Admin)
  }

  // Obtener datos del Producto
  dataCliente(id: number): Observable<Admin> {
    return this.http.get<Admin>(this.myAppUrl + this.myAppiUrl + id);
  }

   // Enviar los datos editados
   updateUsuario(id: number, Admin: FormData): Observable<Admin> {
    return this.http.put<Admin>(this.myAppUrl + this.myAppiUrl  + id, Admin);
  }

  
  
}
