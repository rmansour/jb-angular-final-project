import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {TokenStorageService} from '../../_services/token-storage.service';
import {UserService} from '../../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  submitted: boolean = false;

  constructor(private tokenStorageService: TokenStorageService, public userService: UserService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    let tmpUser = this.tokenStorageService.getUser();
    this.userService.getUserInfo(tmpUser.id);
    console.log('profile', this.userService.userInfo);

    this.profileForm = this.formBuilder.group({
      idNum: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(9),
          Validators.pattern(/^-?(0|[1-9]\d*)?$/)
        ]
      ],
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
        ]
      ],
      city: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],
      street: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email]
      ]
    });
  }

  get fProfileForm(): { [key: string]: AbstractControl } {
    return this.profileForm.controls;
  }

  async changeUserInfo() {
    const {idNum, email, firstName, lastName, city, street} = this.profileForm.value;
    this.submitted = true;
    let obj = {
      userId: this.tokenStorageService.getUser().id,
      IDnum: idNum,
      email: email,
      firstName: firstName,
      lastName: lastName,
      city: city,
      street: street
    };
  
    if (!this.profileForm.invalid) {
      await this.userService.updateUserInfo(obj);
      return;
    } else
      Swal.fire({
        icon: 'error',
        title: `Oops...`,
        showConfirmButton: true,
        timer: 3000,
        text: `Can't update the user's info, one or more fields are missing!`
      });
  }
}
