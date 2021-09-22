import {AbstractControl, ValidatorFn} from '@angular/forms';

export default class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      /**
       * the validator returns null (meaning validation has passed) if there is any error on the control that we want to check (confirm password)
       */

      if (checkControl!.errors && !checkControl!.errors.matching) {
        return null;
      }

      /**
       * the validator checks that two fields match or not and set error on checking control if validation fails.
       */
      if (control!.value !== checkControl!.value) {
        // @ts-ignore
        controls.get(checkControlName).setErrors({matching: true});
        return {matching: true};
      } else {
        return null;
      }
    };
  }
}
