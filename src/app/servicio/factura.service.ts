import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Factura } from '../interfaces/factura';
import { CarritoService } from './carrito.service';




@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private myAppUrl: string;
  private myAppiUrl: string;

  constructor(
    private http: HttpClient,
  ) {
    this.myAppUrl = environment.endPoint;
    this.myAppiUrl = '/api/factura/';
   }

  postFactura(factura: Factura): Observable<void>{
      return this.http.post<void>(this.myAppUrl + this.myAppiUrl, factura)
  }
}
