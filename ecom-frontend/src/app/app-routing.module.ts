import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './CatalogComponent/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './cart/cart.component';


import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ClientsListComponent } from './admin/clients-list/clients-list.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import {AuthGuard} from './guards/auth.guard';
import {AdminGuard} from './guards/admin.guard';
import { ProductsListComponent } from './admin/products-list/products-list.component';
import {AddProductComponent} from './products/add-product/add-product.component';




const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'cart', component: CartComponent },


  {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'clients', component: ClientsListComponent },
      { path: 'products', component: ProductsListComponent },


    ]
  },
  {
    path: 'products/add',
    component: AddProductComponent,
    canActivate: [AuthGuard, AdminGuard] // Add guards if needed
  },


  { path: 'unauthorized', component: UnauthorizedComponent },


  { path: '**', redirectTo: 'admin/products' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
