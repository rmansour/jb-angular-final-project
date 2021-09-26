import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../_services/token-storage.service';
import {UserService} from '../../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private token: TokenStorageService, public userService: UserService) {
  }

  async ngOnInit(): Promise<void> {
    let tmpUser = this.token.getUser();
    console.log(tmpUser);
    await this.userService.getUserInfo(tmpUser.id);
    console.log(this.userService.userInfo);
  }

}
