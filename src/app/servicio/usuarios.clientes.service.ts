import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Cliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class UsuariosClientesService {
  private myAppUrl: string;
  private myAppiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endPoint;
    this.myAppiUrl = '/api/clientes/';
  }
   //agregar usuario
   createCliente(cliente: FormData): Observable<void>{
    return this.http.post<void>(this.myAppUrl + this.myAppiUrl, cliente)
  }

  // Obtener datos del cliente
  dataCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(this.myAppUrl + this.myAppiUrl + id);
  }

  // Enviar los datos editados
  updateCliente(id: number, cliente: FormData): Observable<void> {
    return this.http.put<void>(this.myAppUrl + this.myAppiUrl + id, cliente);
  }

}
