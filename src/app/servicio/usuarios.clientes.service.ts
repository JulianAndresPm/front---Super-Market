import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

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


}
