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
          Validators.pattern(/^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/)
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
    this.submitted = true;
    await this.ordersService.insertNewOrder(this.tokenStorage.getUser().id);
  }

  onReset(): void {
    this.form.reset();
    this.submitted = false;
  }
}
