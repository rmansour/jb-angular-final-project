import {Component, ElementRef, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CategoriesService} from '../../../_services/categories.service';
import {ProductsService} from '../../../_services/products.service';
import {ShoppingCartItemsService} from '../../../_services/shopping-cart-items.service';

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.html',
  styleUrls: ['./user-products.scss']
})
export class HomeUserComponent implements OnInit {
  hideCart: boolean = false;
  hideCartStatus: string = '';
  searchBar: any;

  constructor(private router: Router, public categoriesService: CategoriesService, public productsService: ProductsService, public shoppingCartItemsService: ShoppingCartItemsService, private elem: ElementRef) {
  }

  async ngOnInit(): Promise<void> {
    this.hideShowCart();
    await this.categoriesService.getCategories();
    await this.productsService.getAllProducts();
    await this.shoppingCartItemsService.getShoppingCartItemsByUserId();
    await this.shoppingCartItemsService.getTotalCartItemsPrice();
  }

  ngAfterViewInit() {
    // you'll get your through 'elements' below code
    this.searchBar = this.elem.nativeElement.querySelector('.search-bar');
    console.log(this.searchBar.style);
  }

  async continueToOrderPage() {
    await this.router.navigate(['/order-page']);
  }

  hideShowCart() {
    if (!this.searchBar)
      this.ngAfterViewInit();

    this.hideCart = !this.hideCart;
    if (this.hideCart) {
      this.hideCartStatus = 'hideCart';
    } else {
      this.hideCartStatus = 'showCart';

    }
  }
}
