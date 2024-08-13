import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import {Usuario} from '../interfaces/usuario'
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
  createUsuario(usuario: FormData): Observable<void>{
    return this.http.post<void>(this.myAppUrl + this.myAppiUrl, usuario)
  }
}
