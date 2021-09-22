import {Component, OnInit} from '@angular/core';
import {UserAdminServiceService} from "./_services/user-admin-service.service";
import {ProductsService} from "./_services/products.service";
import {OrdersService} from "./_services/orders.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private userAdminServiceService: UserAdminServiceService, private productsService: ProductsService, private ordersService: OrdersService,) {
  }

  async ngOnInit() {
    await this.productsService.getAllProducts();
    await this.ordersService.getAllOrders();

    this.userAdminServiceService.checkUser();
  }
}
