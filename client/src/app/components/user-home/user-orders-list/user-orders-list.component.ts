import {Component, OnInit} from '@angular/core';
import {OrdersService} from '../../../_services/orders.service';
import {TokenStorageService} from '../../../_services/token-storage.service';
import {OrderItemsService} from '../../../_services/order-items.service';

@Component({
  selector: 'app-user-board',
  templateUrl: './user-orders-list.component.html',
  styleUrls: ['./user-orders-list.component.scss']
})
export class UserOrdersListComponent implements OnInit {
  content?: string;

  constructor(public ordersService: OrdersService, private tokenStorageService: TokenStorageService, public orderItemsService: OrderItemsService) {
  }

  async ngOnInit() {
    await this.ordersService.getAllOrdersByUser(this.tokenStorageService.getUser().id);
    //await this.orderItemsService.getOrderItemsByOrderId();
  }


}
