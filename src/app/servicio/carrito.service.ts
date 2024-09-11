import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Carrito } from '../interfaces/carrito';



@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private myAppUrl: string;
  private myAppiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endPoint;
    this.myAppiUrl = '/api/carrito/';
   }

   agregarProducto(carrito: Carrito): Observable<void> {
    return this.http.post<void>(this.myAppUrl +this.myAppiUrl, carrito);
  }

  getCarritoByUser(usuario_id: number): Observable<Carrito[]> {
    return this.http.get<Carrito[]>(this.myAppUrl +this.myAppiUrl +'productos/' + usuario_id );
  }

  // Obtener datos del carrito
  dataCarrito(id: number): Observable<Carrito> {
    return this.http.get<Carrito>(this.myAppUrl + this.myAppiUrl + id);
  }
  

  updateCarrito(carrito_id: number, cantidad: number): Observable<void> {
    const body = {cantidad};
    return this.http.put<void>(this.myAppUrl + this.myAppiUrl + carrito_id, body);
  }

  //eliminar un producto del carrito
  deleteCarrito(id: number): Observable<void>{
    return this.http.delete<void>(this.myAppUrl + this.myAppiUrl + id)
  }
}
