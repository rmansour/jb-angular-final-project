import {Component, OnInit} from '@angular/core';
import {UserAdminServiceService} from "../../_services/user-admin-service.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../_services/token-storage.service";

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
    this.userAdminServiceService.checkUser();
    // console.log(this.router.url);
    this.user = this.tokenStorageService.getUser();
    // console.log(this.user);
    // if (this.user.roles === 1)
    //   if (this.router.url === '' || this.router.url === '/user-home')
    //     this.router.navigate(['/login']);
  }
}
