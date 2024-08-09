import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProductosComponent } from './componentes/listar-productos/listar-productos.component';
import { AggEditProductosComponent } from './componentes/agg-edit-productos/agg-edit-productos.component';

const routes: Routes = [
  {path: '', component: ListarProductosComponent},
  {path: 'agregar', component: AggEditProductosComponent },
  {path: 'editar/:id', component: AggEditProductosComponent},
  {path: '**' ,redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
