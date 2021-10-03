import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {UserHome} from './components/user-home/user-home';
import {AdminBoardComponent} from './components/admin-board/admin-board.component';
import {ProfileComponent} from './components/profile/profile.component';
import {UserOrdersListComponent} from './components/user-home/user-orders-list/user-orders-list.component';

import {authInterceptorProviders} from './_helpers/auth.interceptor';
import {GlobalUserNavComponent} from './components/global-user-nav/global-user-nav.component';
import {ProductCardComponent} from './components/user-home/user-products/product-card/product-card.component';
import {ProductsComponent} from './components/admin-board/products/products.component';
import {AdminUsersComponent} from './components/admin-board/admin-users/admin-users.component';
import {AddProductModelComponent} from './components/admin-board/products/add-product-model/add-product-model.component';
import {EditProductModelComponent} from './components/admin-board/products/edit-product-model/edit-product-model.component';
import {HomeUserComponent} from './components/user-home/user-products/user-products';
import {UserCartSingleProductComponent} from './components/user-home/user-cart-single-product/user-cart-single-product.component';
import {UserOrdersComponent} from './components/user-home/user-orders/user-orders.component';
import {UserOrderItemComponent} from './components/user-home/user-orders-list/user-order-item/user-order-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserHome,
    AdminBoardComponent,
    ProfileComponent,
    UserOrdersListComponent,
    GlobalUserNavComponent,
    ProductCardComponent,
    ProductsComponent,
    AdminUsersComponent,
    AddProductModelComponent,
    EditProductModelComponent,
    HomeUserComponent,
    UserCartSingleProductComponent,
    UserOrdersComponent,
    UserOrderItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
