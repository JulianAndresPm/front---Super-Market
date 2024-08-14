import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProductosComponent } from './componentes/listar-productos/listar-productos.component';
import { AggEditProductosComponent } from './componentes/agg-edit-productos/agg-edit-productos.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import {ProductosComponent} from './usuarios/productos/productos.component'

const routes: Routes = [
  {path: '', component: ListarProductosComponent},
  {path: 'agregar', component: AggEditProductosComponent },
  {path: 'editar/:id', component: AggEditProductosComponent},

  //rutas de fomrulario de usuarios admin
  {path: 'registro', component: RegistroComponent},


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
