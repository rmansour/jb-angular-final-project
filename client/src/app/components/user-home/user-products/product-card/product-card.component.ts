import {Component, Input, OnInit, Output} from "@angular/core";
import {ShoppingCartItemsService} from "../../../../_services/shopping-cart-items.service";
import {Product, ShoppingCartItem} from "../../../../models/models";
import {UserAdminServiceService} from "../../../../_services/user-admin-service.service";
import {ApiService} from "../../../../_services/api.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"]
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;
  productQnt: number = 1;

  @Output() itemToSubmit: ShoppingCartItem = new ShoppingCartItem(this.userAdminServiceService.user.id, 0, 1, new Product(0, "", 0, 0, ""));


  constructor(public shoppingCartItemsService: ShoppingCartItemsService, private userAdminServiceService: UserAdminServiceService, private apiService: ApiService) {
  }

  ngOnInit(): void {
  }

  checkItemQntBelowZero(event: any) {
    console.log(event.target.value);
    //let charCode = (event.which) ? event.which : event.keyCode;
    // || charCode === 48 || charCode === 96 ||
    if (event.target.value === "" || event.target.value === null || event.target.value <= 0) {
      this.itemToSubmit.qnt = 1;
      //alert(`You can't have a value below 0 in this field!`);
      Swal.fire({
        icon: "error",
        title: `You can't have a value below 0 in this field!`
      });
      event.preventDefault();
    }
  }

  async addOrSubtractQnt(action: any) {
    switch (action) {
      case 1:
        this.itemToSubmit.qnt++;
        break;
      case 2:
        this.itemToSubmit.qnt--;
        break;
    }

    console.log(this.itemToSubmit);
  }

  async submitProductToOrder() {
    this.itemToSubmit.productId = this.product.id;
    await this.apiService.createPostService("/shoppingCart/upsertShoppingCartItem", this.itemToSubmit);
  }
}


