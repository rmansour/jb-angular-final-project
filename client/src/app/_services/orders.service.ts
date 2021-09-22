import {Injectable} from '@angular/core';
import {Order} from "../models/models";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  totalNumOfOrders: any;
  allOrdersByUser: Array<Order> = [];

  constructor(private api: ApiService) {
  }

  async getAllOrders() {
    this.totalNumOfOrders = await this.api.createGetService('/orders/totalNumOfOrders');
    console.log(this.totalNumOfOrders[0].totalOrders);
  }

  async getAllOrdersByUser(userId: number) {
    this.allOrdersByUser = await this.api.createGetService('/orders/getOrdersByUser?userId=' + userId) as Array<Order>;
  }
}
