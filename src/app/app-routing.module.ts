import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProductosComponent } from './componentes/listar-productos/listar-productos.component';
import { AggEditProductosComponent } from './componentes/agg-edit-productos/agg-edit-productos.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import {ProductosComponent} from './usuarios/productos/productos.component'
import { InicioComponent } from './componentes/inicio/inicio.component';
import { RegistrarComponent } from './usuarios/registrar/registrar.component';
import { FacturaComponent } from './usuarios/factura/factura.component';

const routes: Routes = [
  {path: '', component: InicioComponent},

  //rutas crud de productos
  {path: 'agregar', component: AggEditProductosComponent },
  {path: 'editar/:id', component: AggEditProductosComponent},
  {path: 'lista', component: ListarProductosComponent},


  //rutas de fomrulario de usuarios admin 
  {path: 'registrarAdmin', component: RegistroComponent},
  {path: 'editarAdmin/:id', component: RegistroComponent},


  //ruta de vista de inicio
  {path: 'inicio', component: InicioComponent},

  //rutas para clientes
  {path: 'productos', component: ProductosComponent},
  {path: 'registrar', component: RegistrarComponent},
  {path: 'editarUser/:id', component: RegistrarComponent},
  {path: 'factura', component: FacturaComponent},





  //login
  {path: 'login', component: LoginComponent},


  //siempre al final
  {path: '**' ,redirectTo: '', pathMatch: 'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
