import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { LoginResponse} from '../interfaces/login'

@Injectable({
  providedIn: 'root'
})
export class AuthUsuariosService {
  private myAppUrl: string;
  private myAppiUrl: string;

  constructor(private http: HttpClient ) { 
    this.myAppUrl = environment.endPoint;
    this.myAppiUrl = '/api/login/';
  }

  //login
  loginUsuario(usuario: string, passw: string): Observable<LoginResponse> {
    const body = { usuario, passw };
    return this.http.post<LoginResponse>(this.myAppUrl + this.myAppiUrl,  body)
  }
}
