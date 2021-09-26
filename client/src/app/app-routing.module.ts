import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserHome} from './components/user-home/user-home';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ProfileComponent} from './components/profile/profile.component';
import {UserBoardComponent} from './components/user-home/user-board/user-board.component';
import {AdminBoardComponent} from './components/admin-board/admin-board.component';
import {AdminUsersComponent} from './components/admin-board/admin-users/admin-users.component';
import {ProductsComponent} from './components/admin-board/products/products.component';
import {UserOrdersComponent} from './components/user-home/user-orders/user-orders.component';

const routes: Routes = [
  {path: '', redirectTo: 'user-home', pathMatch: 'full'},
  {path: 'user-home', component: UserHome},
  {path: 'login', component: LoginComponent},
  {path: 'users', component: AdminUsersComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'user', component: UserBoardComponent},
  {path: 'admin', component: AdminBoardComponent},
  {path: 'order-page', component: UserOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
