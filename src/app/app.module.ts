import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { ListarProductosComponent } from './componentes/listar-productos/listar-productos.component';
import { AggEditProductosComponent } from './componentes/agg-edit-productos/agg-edit-productos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BarraProgresoComponent } from './compartir/barra-progreso/barra-progreso.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ProductosComponent } from './usuarios/productos/productos.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { RegistrarComponent } from './usuarios/registrar/registrar.component';
import { LoginComponent } from './componentes/login/login.component';
import { FacturaComponent } from './usuarios/factura/factura.component';
import { TokenInterceptor } from './token.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListarProductosComponent,
    AggEditProductosComponent,
    BarraProgresoComponent,
    RegistroComponent,
    ProductosComponent,
    InicioComponent,
    FooterComponent,
    RegistrarComponent,
    LoginComponent,
    FacturaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,        // Necesario para usar [(ngModel)]
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true  // Esto asegura que puedas tener múltiples interceptores
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
