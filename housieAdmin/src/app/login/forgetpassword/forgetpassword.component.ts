import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

import { AdminService } from '../../_shared/services/admin.service';
import { ToastService } from 'src/app/_shared/services/toast.service';
import { MustMatch } from 'src/app/core/helpers/must-match.validator';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  hide = true;
  reHide = true
  forgetPassword: FormGroup;
  formSubmitted: boolean;
  invalidPassword: boolean;
  emailRegExL: any = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  constructor(private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService,
    private toastService: ToastService) {

    this.formSubmitted = false;
    this.invalidPassword = false;

    this.forgetPassword = this.fb.group({
      // id: [],
      email: ['', [Validators.required, Validators.pattern(this.emailRegExL)]],
      otp: [{ value: '', disabled: true }, Validators.required],
      password: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(6), Validators.maxLength(14)]],
      verifyPassword: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(6), Validators.maxLength(14)]],
    });

  }
  
  ngOnInit(): void {
    this.forgetPassword.addValidators(matchValidator(this.forgetPassword.get('password'), this.forgetPassword.get('verifyPassword')))
  }

  submit() {
    if (this.formSubmitted) {
      return;
    }
    this.formSubmitted = true;
    let postData = this.forgetPassword.getRawValue();

    delete postData.otp;
    delete postData.password;
    delete postData.verifyPassword;

    console.log(postData);

    this.adminService.forgotPassword(postData).then((resp: any) => {
      this.formSubmitted = false;
      this.forgetPassword.get('email')?.disable();

      this.forgetPassword.get('otp')?.enable();
      this.forgetPassword.get('password')?.enable();
      this.forgetPassword.get('verifyPassword')?.enable();
    }, (error) => {
      this.formSubmitted = false;
      this.toastService.error(error);
    });
  }

  resetPassword() {  
    if (this.formSubmitted) {
      return;
    }

    let postData = this.forgetPassword.getRawValue();

    if (postData.password != postData.verifyPassword) {
      this.invalidPassword = true;
      return;
    } else {
      this.invalidPassword = false;
    }

    delete postData.verifyPassword;

    this.formSubmitted = true;

    this.adminService.resetPassword(postData).then((resp: any) => {
      this.formSubmitted = false;
      if (!resp.error) {
        this.toastService.success(resp.title, '');
        this.router.navigate(['login'])
      }
    }, (error) => {
      this.formSubmitted = false;
      this.toastService.error(error);
    });
  }



  /**
* it checks the form valid or invalid
* @param val the val is formcotrol of individual forms
*/
  formFieldValidator(val: string) {
    return (this.forgetPassword.get(val)?.invalid && (this.forgetPassword.get(val)?.dirty || this.forgetPassword.get(val)?.touched));
  }


  /**
 * it checks the form has errors or not
 * @param val the val gets formcotrol of individual forms
 */
  formFieldErrors(val: string) {
    return this.forgetPassword.get(val)?.errors;
  }

}



function matchValidator(
  control: AbstractControl | null,
  controlTwo: AbstractControl | null,
): ValidatorFn {
  return () => {
    if (control?.value !== controlTwo?.value)
      return { match_error: `Password must match Error` };
    return null;
  };
}