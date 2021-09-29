import {Component, OnInit} from '@angular/core';
import {OrdersService} from '../../../_services/orders.service';
import {TokenStorageService} from '../../../_services/token-storage.service';

@Component({
  selector: 'app-user-board',
  templateUrl: './user-orders-list.component.html',
  styleUrls: ['./user-orders-list.component.scss']
})
export class UserOrdersListComponent implements OnInit {
  content?: string;

  constructor(public ordersService: OrdersService, private tokenStorageService: TokenStorageService) {
  }

  async ngOnInit() {
    //await this.ordersService.getAllOrdersByUser(this.tokenStorageService.getUser().id);
  }
}
