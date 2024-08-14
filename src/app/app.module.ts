import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { ListarProductosComponent } from './componentes/listar-productos/listar-productos.component';
import { AggEditProductosComponent } from './componentes/agg-edit-productos/agg-edit-productos.component';
import {ReactiveFormsModule} from'@angular/forms'
import {HttpClientModule} from "@angular/common/http";
import { BarraProgresoComponent } from './compartir/barra-progreso/barra-progreso.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import {ProductosComponent} from './usuarios/productos/productos.component'


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListarProductosComponent,
    AggEditProductosComponent,
    BarraProgresoComponent,
    RegistroComponent,
    ProductosComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
