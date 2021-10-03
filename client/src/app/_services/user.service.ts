import {Injectable} from '@angular/core';
import Swal from 'sweetalert2';
import {User} from '../models/models';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: Array<User> = [];
  usersByType: Array<User> = [];
  userInfo: any = {};

  constructor(private apiService: ApiService) {
  }

  async getAllUsers() {
    this.users = await this.apiService.createGetService('/users/getAllUsers') as Array<User>;
    this.usersByType = this.users;
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

  async getUserInfo(id: number) {
    this.userInfo = await this.apiService.createPostService('/users/getUserById', {id: id});
    this.userInfo.creditCardNumber = '';
    this.userInfo.shippingDate = '';
    //console.log(this.userInfo);
  }

  async updateUserInfo(obj: any) {
    await this.apiService.createPostService('/users/updateUser', obj).then(result => {
      if (result)
        Swal.fire({
          title: 'User details updated successfully!',
          html: '',
          icon: 'success',
          timer: 2000
        });
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: `Oops...`,
        showConfirmButton: true,
        timer: 3000,
        text: `${err}`
      });
    });
  }
}

