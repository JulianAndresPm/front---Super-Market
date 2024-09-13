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

    this.socket= io(environment.endPoint);
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
    });
  }

  onEvent(event: string, callback: (data: any) => void): void {
    this.socket.on(event, callback);
  }

  onCarritoActualizado(callback: (data: any) => void): void {
    this.socket.on('carritoActualizado', callback);
  }
  onCarritoEliminado(): Observable<any> {
    return this.listen('carritoEliminado');
  }

}
