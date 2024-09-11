import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Carrito } from 'src/app/interfaces/carrito';
import {CarritoService} from 'src/app/servicio/carrito.service'
import { ProductoService } from 'src/app/servicio/producto.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  //variables para la funcion mostrar productos-carrito
  usuario_id: number | null = null
  carrito_id: number | null = null
  CarritoItems: Carrito[] = [];
  form: FormGroup;
  editar: boolean = false;
  cantidad: number = 1;



  //variables para la funcion mostrar usuario
  UserInfo: any = null;
  UserType: any = null;
  token: any = null;
  message: any = null;
 


  constructor(
    private router: Router,
    private _CarritoService: CarritoService,
    private fm: FormBuilder
  ){
    //
    this.form = this.fm.group({
      cantidad: [1, [Validators.required, Validators.min(1)]]
    })
  }


  //-------------------funciones para mostrart usuario ----------------------------------

  ngOnInit(): void {
    const UserInfo = sessionStorage.getItem('UserInfo');
    const UserType = sessionStorage.getItem('UserType');
    const token = sessionStorage.getItem('token')
    const message = sessionStorage.getItem('message')
    if (UserInfo) {
      this.UserInfo = JSON.parse(UserInfo);
      this.UserType = UserType;
      this.usuario_id = this.UserInfo?.id || null;
      this.token = token;
      this.message = message;
    }
    this.getCarritoByUser()
  }

   //mostrar las fotos de los clientes
   getImageUrl(imagePath: string | null | undefined): string {
    if (this.UserType === 'cliente') {
      return imagePath ? `http://localhost:3000/fotosClientes/${imagePath}` : 'http://localhost:3000/fotosCLientes/default-image.png';
    } else if (this.UserType === 'admin') {
      return imagePath ? `http://localhost:3000/fotosAdmin/${imagePath}` : 'http://localhost:3000/fotosAdmin/default-image.png';
    } else {
      // Si UserType no es 'usuario' ni 'admin', devolvemos la imagen por defecto
      return 'http://localhost:3000/imagenes/default-image.png';
    }
  }
  
  // Método para verificar si el usuario ha iniciado sesión
  isLoggedIn(): boolean {
    return !!this.UserInfo;
  }

  // Método para verificar si el usuario es administrador
  getUserType(): string {
    return this.UserType;  
  }
   // Métodos para redirigir a las páginas de login y registro

   redirectToLogin(): void {
    window.location.href = '/login';
  }

  redirectToRegister(): void {
    // Redirigir a la página de registro
    window.location.href = '/registrar';
  }

  redirectToUpdate(): void {

    if (this.UserType === 'cliente') {
      this.router.navigate(['/editarUser', this.UserInfo.id]); 
      
    } else if (this.UserType === 'admin'){
      this.router.navigate(['/editarAdmin', this.UserInfo.id]); 
      
    }
   
  }

  redirectToExit():void{
    sessionStorage.clear();
    window.location.href = '/';

  }

  // --------------------------- funciones para mostrar los productos del usuario en el carrito ---------------------------------
  
  getCarritoByUser():void{
    this._CarritoService.getCarritoByUser(this.usuario_id!).subscribe(
      (data: Carrito[]) => {
         this.CarritoItems= data;
        // console.log('Productos en el carrito:', this.CarritoItems);
      },
      (error) => {
        console.error('Error al obtener los productos del carrito:', error);
      }
    );
  }

   // Mostrar la imagen del producto
   getUrlImagen(imagen: string | null | undefined): string {
    return imagen
      ? `http://localhost:3000/imagenes/${imagen}`
      : 'http://localhost:3000/imagenes/default-image.png';
  }
 
   // Función para obtener los datos del carrito
   dataCarrito(id: number): void {
    this.editar = true;
    this._CarritoService.dataCarrito(id).subscribe(
      (data: any) => {
        this.form.patchValue({
         cantidad: data.cantidad
        })
        // this.carrito_id = id;
        // console.log(data);
      },
      (error) => {
        console.error('Error al obtener los datos del carrito:', error);
      }
    );
  }

  cancelarEdicion(): void {
    this.editar = false; // Salir del modo de edición sin guardar cambios    
  }

  //actualizar los datos - cantidad

  updateCarrito(id: number){
    const NuevaCantidad = this.form.get('cantidad')?.value;
    if (NuevaCantidad !== undefined) {
      
      this._CarritoService.updateCarrito(id, NuevaCantidad).subscribe(
        () => {
          console.log('enviada ? '+ NuevaCantidad);
          console.log('Cantidad actualizada exitosamente.');
          this.editar = false; // Salir del modo de edición
        },
        (error) => {
          console.error('Error al actualizar la cantidad:', error);
        }
      );
    }
  }

  eliminarCarrito(id: number): void{
    
      this._CarritoService.deleteCarrito(id).subscribe(
        ()=>{
          console.log("producto eliminado id:" + id);
          
        },(Error) =>{
          console.error('Error al eliminar le prodcuto del carrito', Error);
          
        }
      )
      
  }

  test(){
    console.log(
      "si funciona boton"
    );
    
  }

  }

 
  




