import {Component, Input, OnInit} from '@angular/core';
import {Product, ShoppingCartItem} from '../../../../models/models';
import {UserAdminServiceService} from '../../../../_services/user-admin-service.service';
import {ShoppingCartItemsService} from '../../../../_services/shopping-cart-items.service';
import {ApiService} from '../../../../_services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;

  itemToSubmit: ShoppingCartItem = new ShoppingCartItem(0, this.userAdminServiceService.user.id, 0, 1, new Product(0, '', 0, 0, ''));

  constructor(public shoppingCartItemsService: ShoppingCartItemsService, private userAdminServiceService: UserAdminServiceService, private apiService: ApiService) {
  }

  ngOnInit(): void {

    this.itemToSubmit.productId = this.product.id;
  }

  checkItemQntBelowZero(event: any) {
    console.log(event.target.value);
    if (event.target.value === '' || event.target.value === null || event.target.value <= 0) {
      this.itemToSubmit.qnt = 1;
      Swal.fire({
        icon: 'error',
        title: `You can't have a value below or equal to 0 in this field!`
      });
      event.preventDefault();
    }
  }

  addOrSubtractQnt(action: any) {
    switch (action) {
      case 1:
        this.itemToSubmit.qnt++;
        break;
      case 2:
        this.itemToSubmit.qnt--;
        break;
    }
  }

  async submitProductToOrder() {
    delete this.itemToSubmit.product;

    await this.apiService.createPostService('/shoppingCart/upsertShoppingCartItem', this.itemToSubmit);
    //await this.shoppingCartItemsService.getShoppingCartItemsByUserId();
    //await this.shoppingCartItemsService.getTotalCartItemsPrice();
    //this.shoppingCartItemsService.setTotalCartItemsPrice();
  }

}


