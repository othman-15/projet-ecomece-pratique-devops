import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './CatalogComponent/products.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProductDetailsComponent } from './product-details/product-details.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ProductServiceService} from './product-service.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './cart/cart.component';
import {JwtInterceptor} from '../models/auth/interceptor';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ClientsListComponent } from './admin/clients-list/clients-list.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AddProductComponent } from './products/add-product/add-product.component';


@NgModule({
  declarations: [
    AppComponent,

    ProductsComponent,
    DashboardComponent,

    ClientsListComponent,
    UnauthorizedComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ProductDetailsComponent,
    HttpClientModule,
    FormsModule,
    LoginComponent,
    SignupComponent,
    AddProductComponent,

  ],
  providers: [ProductServiceService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
