import {Injectable} from '@angular/core';
import {Order} from '../models/models';
import {ApiService} from './api.service';
import {ShoppingCartItemsService} from './shopping-cart-items.service';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  totalNumOfOrders: any;
  allOrdersByUser: Array<Order> = [];
  newOrder: any = {
    userId: 0,
    shippingDate: '',
    totalPrice: 0,
    shippingCity: '',
    shippingAddress: '',
    creditCardNumber: '',
  };

  constructor(private api: ApiService, private shoppingCartItemsService: ShoppingCartItemsService, private userService: UserService) {
  }

  async getAllOrders() {
    this.totalNumOfOrders = await this.api.createGetService('/orders/totalNumOfOrders');
  }

  async getAllOrdersByUser(userId: number) {
    this.allOrdersByUser = await this.api.createGetService('/orders/getOrdersByUser?userId=' + userId) as Array<Order>;
    console.log(this.allOrdersByUser);
  }

  async insertNewOrder(id: number) {
    this.newOrder.totalPrice = this.shoppingCartItemsService.totalPrice[0].totalProductPrice;
    this.newOrder.userId = id;
    this.newOrder.creditCardNumber = this.userService.userInfo.creditCardNumber;
    this.newOrder.shippingCity = this.userService.userInfo.city;
    this.newOrder.shippingAddress = this.userService.userInfo.street;
    this.newOrder.shippingDate = this.userService.userInfo.shippingDate;
    console.log(this.newOrder);
    console.log('inserting order...');
    await this.api.createPostService('/orders/addOrder', this.newOrder);
  }
}
