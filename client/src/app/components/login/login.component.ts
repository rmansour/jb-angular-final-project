import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../_services/auth.service';
import {TokenStorageService} from '../../_services/token-storage.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OrdersService} from '../../_services/orders.service';
import {ProductsService} from '../../_services/products.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * The Login Component uses AuthService in order for it to work with the Observable object. Besides that, it calls TokenStorageService methods to check the logged in status and save the token and the user info in the client's localStorage.
 */
export class LoginComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: number = 0;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private formBuilder: FormBuilder, public ordersService: OrdersService, public productsService: ProductsService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUser().roles;
      return;
    } else {
      this.form = this.formBuilder.group({
          email: [
            '',
            [
              Validators.required,
              Validators.minLength(3),
            ],
          ],
          password: [
            '',
            [
              Validators.required,
              Validators.minLength(6),
            ],
          ]
        }
      );
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    const {email, password} = this.form.value;
    this.authService.login(email, password).subscribe(
      data => {
        this.submitted = true;
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.role = this.tokenStorage.getUser().roles;
        this.router.navigate(['user-home']);
      },
      err => {
        this.submitted = true;
        console.log(err);
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
}
