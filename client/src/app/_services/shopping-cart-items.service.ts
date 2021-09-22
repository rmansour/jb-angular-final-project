import {Injectable} from '@angular/core';
import {ShoppingCartItem} from "../models/models";
import {ApiService} from "./api.service";
import {UserAdminServiceService} from "./user-admin-service.service";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartItemsService {
  allOrdersByUser: Array<ShoppingCartItem> = [];

  constructor(public apiService: ApiService, private userAdminServiceService: UserAdminServiceService) {
  }

  async getOrderByUserID() {
    this.allOrdersByUser = await this.apiService.createGetService('/shoppingCart/getShoppingCartItemsByUserID?userId=' + this.userAdminServiceService.user.id) as Array<ShoppingCartItem>;
    console.log(this.allOrdersByUser);
  }
}
