import {Component, OnInit} from '@angular/core';
import {UserAdminServiceService} from '../../_services/user-admin-service.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../_services/token-storage.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.html',
  styleUrls: ['./user-home.scss']
})
export class UserHome implements OnInit {

  user: any;

  constructor(public userAdminServiceService: UserAdminServiceService, private router: Router, private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    console.log('/user-home');
    this.userAdminServiceService.checkUser();
    this.user = this.tokenStorageService.getUser();

    if (Object.keys(this.user).length === 0 && Object.getPrototypeOf(this.user) === Object.prototype) {
      this.router.navigate(['/login']);
    }
  }
}
