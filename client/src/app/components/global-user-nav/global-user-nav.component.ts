import {Component, OnInit} from '@angular/core';
import {UserAdminServiceService} from "../../_services/user-admin-service.service";

@Component({
  selector: 'app-global-user-nav',
  templateUrl: './global-user-nav.component.html',
  styleUrls: ['./global-user-nav.component.scss']
})
export class GlobalUserNavComponent implements OnInit {

  constructor(public userAdminServiceService: UserAdminServiceService) {
  }

  ngOnInit(): void {
    this.userAdminServiceService.checkUser();
  }
}
