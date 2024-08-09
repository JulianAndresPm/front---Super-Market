import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private myAppUrl: string;
  private myAppiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endPoint;
    this.myAppiUrl = '/api/productos/';
  }

  // Lista productos
  getListaProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.myAppUrl + this.myAppiUrl);
  }
  
  // Eliminar producto
  deteleProducto(id: number): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myAppiUrl + id);
  }

  // Agregar producto
  createProducto(producto: FormData): Observable<void> {
    return this.http.post<void>(this.myAppUrl + this.myAppiUrl, producto);
  }

  // Obtener datos del Producto
  dataProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(this.myAppUrl + this.myAppiUrl + id);
  }

  // Enviar los datos editados
  updateProducto(id: number, producto: FormData): Observable<void> {
    return this.http.put<void>(this.myAppUrl + this.myAppiUrl + id, producto);
  }
}
