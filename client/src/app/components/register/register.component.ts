import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../_services/auth.service';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import Validation from '../../utils/validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // multi-step registration
  steps: number = 1;
  firstStep: boolean = false;
  secondStep: boolean = false;

  firstStepForm!: FormGroup;
  secondStepForm!: FormGroup;
  isRegistrationSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  fStepSuccessful: boolean = false;
  fStepSubmitted: boolean = false;
  sStepSuccessful: boolean = false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    console.log(this.steps);
    this.firstStepForm = this.formBuilder.group({
        idNum: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(10),
            Validators.pattern(/^-?(0|[1-9]\d*)?$/)
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6)
          ]
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      });

    this.secondStepForm = this.formBuilder.group({
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
    });
  }

  get fFirstStep(): { [key: string]: AbstractControl } {
    return this.firstStepForm.controls;
  }

  get fSecondStep(): { [key: string]: AbstractControl } {
    return this.secondStepForm.controls;
  }

  /**
   * This component binds form data (username, email, password) from template to AuthService.register() method that returns an Observable object.
   */
  onSubmit(): void {
    const {idNum, email, password} = this.firstStepForm.value;
    const {firstName, lastName, city, street} = this.secondStepForm.value;

    console.log(idNum, email, password, firstName, lastName, city, street);

    let req = this.authService.register(idNum, firstName, lastName, email, password, city, street).subscribe(
      data => {
        console.log(data);
        this.isRegistrationSuccessful = true;
        this.isSignUpFailed = false;
        this.sStepSuccessful = true;

        // window.location.reload();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );

    // console.log(req.closed);

    if (req.closed) {
      this.secondStepForm.setErrors({
        registeredUser: 'User already exists!',
      });
    }
    if (this.firstStepForm.invalid || this.secondStepForm.invalid) {
      return;
    }

    //console.log(JSON.stringify({first: this.firstStepForm.value, second: this.secondStepForm.value}, null, 2));
  }

  next() {
    const {idNum, email} = this.firstStepForm.value;

    if (this.steps == 1) {
      this.firstStep = true;
      // console.log('firstStep = true, subscribing...');
      let req = this.authService.checkDuplicateEmailOrId(idNum, email).subscribe(data => {
          console.log(data);
          this.fStepSuccessful = true;
          this.steps++;
        },
        err => {
          this.fStepSuccessful = false;
          this.errorMessage = err.error.message;
        });
      // console.log('firstStep = true, end subscribing...');

      this.fStepSubmitted = true;

      console.log(this.firstStepForm);
      console.log(req);

      if (this.firstStepForm.invalid || this.secondStepForm.invalid) {
        return;
      } else

        console.log(this.steps);
    }

    if (this.steps == 2) {
      this.secondStep = true;
      if (this.secondStepForm.invalid) {
        return;
      }
    }
  }

  previous() {
    this.steps--;
    if (this.steps == 1)
      this.firstStep = false;

    if (this.steps == 2)
      this.secondStep = false;
  }
}
