import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: Socket;

  constructor() { 
    this.socket = io(environment.endPoint); // Asegúrate de que esta URL sea correcta
  }

  get socketInstance(): Socket {
    return this.socket;
  }

  emitEvent(event: string, data: any): void {
    this.socket.emit(event, data);
  }

  listen(event: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(event, (data: any) => {
        subscriber.next(data);
      });

      // Maneja el caso en que el Observable se complete o se cancele
      return () => this.socket.off(event);
    });
  }

  onEvent(event: string, callback: (data: any) => void): void {
    this.socket.on(event, callback);
  }

  onCarritoActualizado(callback: (data: any) => void): void {
    this.onEvent('carritoActualizado', callback);
  }

  onCarritoEliminado(): Observable<{ usuario_id: number }> {
    return this.listen('carritoEliminado');
  }
}
