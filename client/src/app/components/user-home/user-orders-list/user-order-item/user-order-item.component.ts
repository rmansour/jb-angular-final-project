import {Component, Input, OnInit} from '@angular/core';
import {OrderItemsService} from '../../../../_services/order-items.service';

@Component({
  selector: 'app-user-order-item',
  templateUrl: './user-order-item.component.html',
  styleUrls: ['./user-order-item.component.scss']
})
export class UserOrderItemComponent implements OnInit {

  @Input() singleOrderItem: any;

  constructor(public orderItemsService: OrderItemsService) {
  }

  ngOnInit(): void {
    console.log(this.singleOrderItem);
  }

}
