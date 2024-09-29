import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Carrito } from 'src/app/interfaces/carrito';
import { Factura } from 'src/app/interfaces/factura';
import { CarritoService } from 'src/app/servicio/carrito.service';
import { FacturaService } from 'src/app/servicio/factura.service';
import { WebSocketService } from 'src/app/servicio/web-socket.service';
import { ChangeDetectorRef } from '@angular/core';
import {Router } from '@angular/router';
import { AuthenticationService } from 'src/app/servicio/authentication.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss'],
})
export class FacturaComponent implements OnInit {
  usuario_id = this._authentication.getUserId();
  UserInfo = this._authentication.getUserInfo();
  CarritoItems: Carrito[] = [];
  subTotal: number = 0;
  iva: number = 0;
  Total: number = 0;
  DatosVisibles: boolean = true;
  EstadoFactura: string = 'Pendiente';

  fechaCompra: Date = new Date();
  numeroFactura: number = Math.floor(Math.random() * 1000);

  @ViewChild('facturaHTML') facturaHTML!: ElementRef;

  constructor(
    private _CarritoService: CarritoService,
    private _FacturaService: FacturaService,
    private cdr: ChangeDetectorRef,
    private _authentication: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const UserInfo = sessionStorage.getItem('UserInfo');
    if (UserInfo) {
      this.UserInfo = JSON.parse(UserInfo);
      this.usuario_id = this.UserInfo?.id || null;
    }
    this.getProductosCarrito();
  }

    
  getProductosCarrito(): void {
    if (this.usuario_id) {
      this._CarritoService.getCarritoByUser(this.usuario_id!).subscribe(
        (data: Carrito[]) => {
          this.CarritoItems = data;
          this.calcularValores();
        },
        (error) => {
          console.error('Error al obtener los productos del carrito:', error);
        }
      );
    } else {
      console.log('No se inicia sesion');
    }
  }

  calcularValores(): void {
    this.subTotal = this.CarritoItems.reduce(
      (acc, item) => acc + item.subtotal,
      0
    );
    this.iva = this.subTotal * 0.12;
    this.Total = this.subTotal + this.iva;
  }

  addFactura(): void {

    this.DatosVisibles = false;
    this.EstadoFactura = 'Finalizado';
    //para obtener los cambios antes de realizar la factura
    this.cdr.detectChanges();

    if (this.usuario_id != null) {
      const htmlContent = this.facturaHTML.nativeElement.innerHTML;

      const factura: Factura = {
        usuario_id: this.usuario_id!,
        valor_total: this.Total,
        htmlContent: htmlContent,
      };

      this._FacturaService.postFactura(factura).subscribe(
        () => {
          console.log('Factura creada con éxito');
          // Una vez que la factura se crea, eliminamos los productos del carrito
          if (this.usuario_id) {
            this.eliminarProductos(this.usuario_id);
          }
        },
        (error) => {
          console.log('No hay usuario registrado o el ID no es válido');
        }
      );
    }
  }


  //eliminar los productos despues de realizar la facturacion.
  eliminarProductos(id: number){
    this.usuario_id = id
    if (this.usuario_id) {
      this._CarritoService.deleteProductosCarrito(id).subscribe(
        ()=>{
          console.log("productos eliminados con exito"); 
          this.router.navigate(['/']);
           // Emitir evento de carrito actualizado
        },
        (error) => {
          console.error('Error al eliminar loRouters productos', error);
        }
      );
    }else{
      console.log('No hay usuario registrado');
      
    }
  }
}
