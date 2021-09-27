import {Component, OnInit} from '@angular/core';
import {OrdersService} from '../../../_services/orders.service';

@Component({
  selector: 'app-user-board',
  templateUrl: './user-orders-list.component.html',
  styleUrls: ['./user-orders-list.component.scss']
})
export class UserOrdersListComponent implements OnInit {
  content?: string;

  constructor(public ordersService: OrdersService) {
  }

  async ngOnInit() {
    //await this.ordersService.getAllOrdersByUser(this.userAdminServiceService.user.id);
  }
}
