import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   //obtener token de la SessionStorage
   const token = sessionStorage.getItem('token')

   //si el token es verdadero, clomaoms la solicitud y aañadimos el header de Autorization
   if (token) {
    const clonedReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });

    //pasamos la solicitud clonada al siguiente manejador
    return next.handle(clonedReq);
   }

   // Si no hay token, pasar la solicitud original
   return next.handle(request);
  }
}
