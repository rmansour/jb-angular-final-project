import {Injectable} from '@angular/core';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})

export class UserAdminServiceService {
  isAdmin: number = 0;
  isLoggedIn = false;
  user: any;

  constructor(private tokenStorageService: TokenStorageService) {
  }

  checkUser() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
      this.isAdmin = this.user.roles;
    }
    //console.log(this.isAdmin, this.user);
  }

  logout(): void {
    this.tokenStorageService.signOut();
    // this.router.navigate(['login']);
  }
}
