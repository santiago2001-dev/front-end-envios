import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import {ListProductsComponent} from './components/list-products/list-products.component'
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';
import { CotizarComponent } from './components/cotizar/cotizar.component';

const routes: Routes = [
  {path: '',component:ListProductsComponent,canActivate:[LoginGuard]},
  {path: 'ordenar',component:UpdateProductComponent,canActivate:[LoginGuard]},
  {path:'cotizar',component:CotizarComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
