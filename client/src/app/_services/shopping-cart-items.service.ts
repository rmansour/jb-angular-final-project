import {Injectable} from '@angular/core';
import {ShoppingCartItem} from '../models/models';
import {ApiService} from './api.service';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartItemsService {
  allShoppingCartItems: Array<ShoppingCartItem> = [];
  totalPrice?: any = 0;

  constructor(private tokenStorageService: TokenStorageService, private apiService: ApiService) {
  }

  async getShoppingCartItemsByUserId() {
    let tmpUser = this.tokenStorageService.getUser();
    if (tmpUser) {
      this.allShoppingCartItems = await this.apiService.createGetService('/shoppingCart/getShoppingCartItemsByUserID?userId=' + tmpUser.id) as Array<ShoppingCartItem>;
    }
  }

  async getTotalCartItemsPrice() {
    if (!this.totalPrice)
      this.totalPrice = 0;

    let tmpUser = this.tokenStorageService.getUser();
    if (tmpUser) {
      this.totalPrice = await this.apiService.createPostService('/shoppingCart/calculateShoppingCartTotalPrice', {userId: tmpUser.id});
      console.log(this.totalPrice[0].totalProductPrice);
    }
  }
}
