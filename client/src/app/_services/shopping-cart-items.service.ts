import {Injectable} from '@angular/core';
import {ShoppingCartItem} from '../models/models';
import {ApiService} from './api.service';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartItemsService {
  allShoppingCartItems: Array<ShoppingCartItem> = [];
  totalPrice?: number = 0;

  constructor(private tokenStorageService: TokenStorageService, private apiService: ApiService) {
  }

  async getShoppingCartItemsByUserId() {
    let tmpUser = this.tokenStorageService.getUser();
    if (tmpUser) {
      this.allShoppingCartItems = await this.apiService.createGetService('/shoppingCart/getShoppingCartItemsByUserID?userId=' + tmpUser.id) as Array<ShoppingCartItem>;
    }
  }

  async getTotalCartItemsPrice() {
    let tmpUser = this.tokenStorageService.getUser();
    if (tmpUser) {
      this.totalPrice = await this.apiService.createPostService('/shoppingCart/calculateShoppingCartTotalPrice', {userId: tmpUser.id}) as number;
    }
    if (this.totalPrice === null)
      this.totalPrice = 0;
    console.log(this.totalPrice);
  }

  async deleteShoppingCart() {
    await this.apiService.createPostService('/shoppingCart/deleteShoppingCart', {userId: this.tokenStorageService.getUser().id});
    await this.getShoppingCartItemsByUserId();
    await this.getTotalCartItemsPrice();
  }


}
