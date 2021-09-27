import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../../_services/token-storage.service';
import {UserService} from '../../../_services/user.service';
import {ShoppingCartItemsService} from '../../../_services/shopping-cart-items.service';
import {OrdersService} from '../../../_services/orders.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private tokenStorage: TokenStorageService, public userService: UserService, public shoppingCartItemsService: ShoppingCartItemsService, private ordersService: OrdersService) {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.shoppingCartItemsService.getShoppingCartItemsByUserId();
    this.userService.getUserInfo(this.tokenStorage.getUser().id);
    this.shoppingCartItemsService.getTotalCartItemsPrice();

    this.form = this.formBuilder.group({
      shippingAddress: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],
      shippingCity: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],
      creditCardNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
          Validators.pattern(/^-?(0|[1-9]\d*)?$/)
        ]
      ],
      shippingDate: [
        '',
        [
          Validators.required
        ]
      ]
    });
  }

  async onSubmit() {
    console.log('onsubmit');
    this.submitted = true;
    await this.ordersService.insertNewOrder(this.tokenStorage.getUser().id);
  }
}
