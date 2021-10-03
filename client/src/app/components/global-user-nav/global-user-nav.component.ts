import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {ShoppingCartItemsService} from '../../_services/shopping-cart-items.service';
import {UserAdminServiceService} from '../../_services/user-admin-service.service';

@Component({
  selector: 'app-global-user-nav',
  templateUrl: './global-user-nav.component.html',
  styleUrls: ['./global-user-nav.component.scss']
})
export class GlobalUserNavComponent implements OnInit {

  constructor(public userAdminServiceService: UserAdminServiceService, public shoppingCartItemsService: ShoppingCartItemsService, private router: Router) {
  }

  ngOnInit(): void {
    this.userAdminServiceService.checkUser();
  }

  async showCartOnHomepage() {
    if (this.shoppingCartItemsService.allShoppingCartItems.length !== 0)
      await this.router.navigate(['/order-page']);
    else
      Swal.fire({
        title: 'Oops...',
        text: `It looks like your shopping cart is empty! Please add at least one item to your shopping cart!`,
        icon: 'warning',
        timer: 2500,
        showCloseButton: true,
        showConfirmButton: true
      })
  }
}
