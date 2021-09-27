import {Component, Input, OnInit} from '@angular/core';
import {Product, ShoppingCartItem} from '../../../models/models';
import {ShoppingCartItemsService} from '../../../_services/shopping-cart-items.service';
import {UserAdminServiceService} from '../../../_services/user-admin-service.service';
import {ApiService} from '../../../_services/api.service';

@Component({
  selector: 'app-user-cart-single-product',
  templateUrl: './user-cart-single-product.component.html',
  styleUrls: ['./user-cart-single-product.component.scss']
})
export class UserCartSingleProductComponent implements OnInit {

  @Input() singleShoppingCartItem!: ShoppingCartItem;
  itemToSubmit: ShoppingCartItem = new ShoppingCartItem(0, this.userAdminServiceService.user.id, 0, 1, new Product(0, '', 0, 0, ''));

  constructor(public shoppingCartItemsService: ShoppingCartItemsService, private userAdminServiceService: UserAdminServiceService, private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.itemToSubmit.productId = this.singleShoppingCartItem.productId;
    this.itemToSubmit.qnt = this.singleShoppingCartItem.qnt;
    this.itemToSubmit.id = this.singleShoppingCartItem.id;
  }

  async addOrSubtractQnt(action: any) {
    delete this.itemToSubmit.product;
    switch (action) {
      case 1:
        this.itemToSubmit.qnt++;
        await this.apiService.createPostService('/shoppingCart/upsertShoppingCartItem', this.itemToSubmit);
        break;
      case 2:
        this.itemToSubmit.qnt--;
        await this.apiService.createPostService('/shoppingCart/upsertShoppingCartItem', this.itemToSubmit);
        break;
    }

    await this.shoppingCartItemsService.getShoppingCartItemsByUserId();
    await this.shoppingCartItemsService.getTotalCartItemsPrice();
    console.log(this.itemToSubmit);
  }

  async deleteShoppingCartItem() {
    await this.apiService.createPostService('/shoppingCart/deleteShoppingCartItems', {id: this.itemToSubmit.id});
    await this.shoppingCartItemsService.getShoppingCartItemsByUserId();
    await this.shoppingCartItemsService.getTotalCartItemsPrice();
    //this.shoppingCartItemsService.setTotalCartItemsPrice();
  }
}
