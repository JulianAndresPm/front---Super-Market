import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProductosComponent } from './componentes/listar-productos/listar-productos.component';
import { AggEditProductosComponent } from './componentes/agg-edit-productos/agg-edit-productos.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import {ProductosComponent} from './usuarios/productos/productos.component'
import { InicioComponent } from './componentes/inicio/inicio.component';

const routes: Routes = [
  {path: '', component: InicioComponent},

  //rutas crud de productos
  {path: 'agregar', component: AggEditProductosComponent },
  {path: 'editar/:id', component: AggEditProductosComponent},
  {path: 'lista', component: ListarProductosComponent},


  //rutas de fomrulario de usuarios admin
  {path: 'registroadmin', component: RegistroComponent},

  //ruta de vista de inicio
  {path: 'inicio', component: InicioComponent},

  //rutas para clientes
  {path: 'productos', component: ProductosComponent},

  //siempre al final
  {path: '**' ,redirectTo: '', pathMatch: 'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
