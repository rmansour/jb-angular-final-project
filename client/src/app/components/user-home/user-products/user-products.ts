import {Component, OnInit} from '@angular/core';
import {CategoriesService} from '../../../_services/categories.service';
import {ProductsService} from '../../../_services/products.service';
import {ShoppingCartItemsService} from '../../../_services/shopping-cart-items.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.html',
  styleUrls: ['./user-products.scss']
})
export class HomeUserComponent implements OnInit {
  hideCart: boolean = false;
  hideCartStatus: string = '';

  constructor(private router: Router, public categoriesService: CategoriesService, public productsService: ProductsService, public shoppingCartItemsService: ShoppingCartItemsService) {
  }

  async ngOnInit(): Promise<void> {
    await this.categoriesService.getCategories();
    await this.productsService.getAllProducts();
    await this.shoppingCartItemsService.getShoppingCartItemsByUserId();
    await this.shoppingCartItemsService.getTotalCartItemsPrice();
  }

  async continueToOrderPage() {
    await this.router.navigate(['/order-page']);
  }

  hideShowCart() {
    this.hideCart = !this.hideCart;
    if (this.hideCart)
      this.hideCartStatus = 'hideCart';
    else
      this.hideCartStatus = 'showCart';
  }
}
