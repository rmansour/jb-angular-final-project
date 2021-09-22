import {Injectable} from '@angular/core';
import {User} from "../models/models";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: Array<User> = [];
  usersByType: Array<User> = [];

  constructor(private apiService: ApiService) {
  }

  async getAllUsers() {
    this.users = await this.apiService.createGetService('/users/getAllUsers') as Array<User>;
    console.log(this.users);
    this.usersByType = this.users
  }

  filterUsersByType(isAdmin: any) {
    let tmpUsersArr = [...this.users];

    if (isAdmin.target.value === 'admins') {
      this.usersByType = tmpUsersArr.filter(user => user.isAdmin === 1);
      return;
    } else if (isAdmin.target.value === 'costumers') {
      this.usersByType = tmpUsersArr.filter(user => user.isAdmin === 0);
      return;
    } else {
      this.usersByType = tmpUsersArr;
    }
  }

  async deleteUserById(userId: number) {
    await this.apiService.createPostService('/users/deleteUser', {id: userId});
    await this.getAllUsers();
  }
}

