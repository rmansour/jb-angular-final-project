import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../../../_services/categories.service";
import {ProductsService} from "../../../_services/products.service";
import {ShoppingCartItemsService} from "../../../_services/shopping-cart-items.service";

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.html',
  styleUrls: ['./user-products.scss']
})
export class HomeUserComponent implements OnInit {
  categoryName: string = '';

  constructor(public categoriesService: CategoriesService, public productsService: ProductsService, public shoppingCartItemsService: ShoppingCartItemsService) {
  }

  async ngOnInit(): Promise<void> {
    await this.categoriesService.getCategories();
    await this.productsService.getAllProducts();
    await this.shoppingCartItemsService.getOrderByUserID();
  }
}
