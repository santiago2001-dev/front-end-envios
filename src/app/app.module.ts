import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TrackShipmentComponent } from './components/track-shipment/track-shipment.component';
import { CotizarComponent } from './components/cotizar/cotizar.component';

export function tokenGetter() {
  return localStorage.getItem('authToken');
}
@NgModule({
  declarations: [
    AppComponent,
    ListProductsComponent,
    UpdateProductComponent,
    LoginComponent,
    RegisterComponent,
    SidebarComponent,
    TrackShipmentComponent,
    CotizarComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:8090'],  // Cambia esto según tu dominio
        disallowedRoutes: ['http://localhost:8090/api/auth/login', 'http://localhost:8090/api/auth/register']  // Rutas que no requieren autenticación
      }
    })
   
],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},JwtHelperService]
    
    ,
  bootstrap: [AppComponent]
})
export class AppModule { }
