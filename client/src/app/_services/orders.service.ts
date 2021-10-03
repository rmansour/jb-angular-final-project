import {Injectable} from '@angular/core';
import Swal from 'sweetalert2';
import {Order} from '../models/models';
import {ApiService} from './api.service';
import {ShoppingCartItemsService} from './shopping-cart-items.service';
import {UserService} from './user.service';
import {Router} from '@angular/router';

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

  constructor(private api: ApiService, private shoppingCartItemsService: ShoppingCartItemsService, private userService: UserService, private router: Router) {
  }

  async getAllOrders() {
    this.totalNumOfOrders = await this.api.createGetService('/orders/totalNumOfOrders');
  }

  async getAllOrdersByUser(userId: number) {
    this.allOrdersByUser = await this.api.createGetService('/orders/getOrdersByUser?userId=' + userId) as Array<Order>;
  }

  async insertNewOrder(id: number) {
    this.newOrder.totalPrice = this.shoppingCartItemsService.totalPrice;
    this.newOrder.userId = id;
    this.newOrder.creditCardNumber = this.userService.userInfo.creditCardNumber;
    this.newOrder.shippingCity = this.userService.userInfo.city;
    this.newOrder.shippingAddress = this.userService.userInfo.street;
    this.newOrder.shippingDate = this.userService.userInfo.shippingDate;
    await this.api.createPostService('/orders/addOrder', this.newOrder).then(() => {
      Swal.fire({
        title: 'Order placed successfully!',
        html: '',
        icon: 'success',
        timer: 2000
      }).then(() => {
        this.router.navigate(['/user-home']);
      });
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: `Oops...`,
        showConfirmButton: true,
        timer: 3000,
        text: `${err}`
      });
    });
  }
}
