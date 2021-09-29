import {Component, OnInit} from '@angular/core';
import {UserAdminServiceService} from "../../_services/user-admin-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.scss']
})
export class AdminBoardComponent implements OnInit {
  content?: string;

  constructor(private userAdminServiceService: UserAdminServiceService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.userAdminServiceService.isAdmin === 1)
      this.router.navigate(['/products']);
  }
}
