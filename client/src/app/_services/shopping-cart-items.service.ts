import {Injectable} from '@angular/core';
import {ShoppingCartItem} from '../models/models';
import {ApiService} from './api.service';
import {UserAdminServiceService} from './user-admin-service.service';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartItemsService {
  allShoppingCartItems: Array<ShoppingCartItem> = [];
  totalPrice: number = 0;

  constructor(private tokenStorageService: TokenStorageService, private apiService: ApiService) {
  }

  async getShoppingCartItemsByUserId() {
    let tmpUser = this.tokenStorageService.getUser();
    console.log(tmpUser);
    if (tmpUser) {
      this.allShoppingCartItems = await this.apiService.createGetService('/shoppingCart/getShoppingCartItemsByUserID?userId=' + tmpUser.id) as Array<ShoppingCartItem>;
      console.log(this.allShoppingCartItems);
    }
  }

  setTotalCartItemsPrice() {
    this.totalPrice = 0;

    if (!this.allShoppingCartItems) {
      this.totalPrice = 0;
      return;
    }

    for (let i = 0; i < this.allShoppingCartItems.length; i++) {
      if (this.allShoppingCartItems[i].qnt > 1) {
        this.totalPrice += this.allShoppingCartItems[i].product!.price * this.allShoppingCartItems[i].qnt;
      } else
        this.totalPrice += this.allShoppingCartItems[i].product!.price;
    }
  }
}
