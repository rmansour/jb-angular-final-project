import { Component, OnInit } from '@angular/core';
import {OrdersService} from "../../../_services/orders.service";
import {UserAdminServiceService} from "../../../_services/user-admin-service.service";

@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.scss']
})
export class UserBoardComponent implements OnInit {
  content?: string;
  constructor(private userAdminServiceService: UserAdminServiceService, public ordersService: OrdersService) { }

  async ngOnInit() {
    await this.ordersService.getAllOrdersByUser(this.userAdminServiceService.user.id);
  }
}
