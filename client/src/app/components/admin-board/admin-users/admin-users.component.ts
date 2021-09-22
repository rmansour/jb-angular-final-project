import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../_services/user.service";
import {ApiService} from "../../../_services/api.service";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  singleUser: any;

  constructor(public userService: UserService, private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.userService.getAllUsers();
  }

  handleUsersEdit(id: number) {
    this.singleUser = this.userService.users.filter(user => user.id === id);
    this.singleUser = this.singleUser[0];
    console.log(this.singleUser);
  }

  handleUserRole(event: any) {
    this.singleUser.isAdmin = Number(event.target.checked);
    console.log(this.singleUser);
  }

  async deleteUser(id: number) {
    console.log(id);
    await this.userService.deleteUserById(id);
  }

  async submitUserModalChanges() {
    await this.apiService.createPostService('/users/updateUser', this.singleUser);

  }
}
