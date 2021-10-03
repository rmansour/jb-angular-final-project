import {Injectable} from '@angular/core';
import {OrderItem} from '../models/models';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderItemsService {
  orderItemsByOrderId: Array<OrderItem> = [];

  constructor(private apiService: ApiService) {
  }

  async getOrderItemsById(order: any) {
    console.log(order);
    this.orderItemsByOrderId = await this.apiService.createPostService('/orderItems/getOrderItemsByOrderId', {orderId: order.id}) as Array<OrderItem>;
    console.log(this.orderItemsByOrderId);
  }
}
