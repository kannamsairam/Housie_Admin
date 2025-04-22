import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl,ValidatorFn } from '@angular/forms';

import { AdminService } from '../services/admin.service';
import { AuthGuardService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Component({
	selector: 'app-update-password-modal',
	templateUrl: './update-password-modal.component.html',
	styleUrls: ['./update-password-modal.component.css']
})
export class UpdatePasswordModalComponent implements OnInit {

	hide = true;
	confHide = true;
	isModalOpen=true;
	passwordFormGroup!: FormGroup;
	formSubmitted: boolean;
	invalidPassword: boolean;

	constructor(private fb: FormBuilder,
		private adminService: AdminService,
		private toastService: ToastService,
		private authServices: AuthGuardService
	) {

		this.formSubmitted = false;
		this.invalidPassword = false;
		this.createForm();
	}

	ngOnInit(): void {
	}

	createForm() {
		this.passwordFormGroup = this.fb.group({
			password: ['', [Validators.required,Validators.minLength(4)]],
			verifyPassword: ['', Validators.required],
		});
		this.passwordFormGroup.addValidators(matchValidator(this.passwordFormGroup.get('password'), this.passwordFormGroup.get('verifyPassword')))
	}

	get f(): { [key: string]: AbstractControl } {
		return this.passwordFormGroup.controls;
	}

	changePassword() {
		if (this.formSubmitted) {
			return;
		}
		let element: HTMLElement = document.getElementById("close") as HTMLElement;

		let postData = this.passwordFormGroup.getRawValue();

		if (postData.password != postData.verifyPassword) {
			this.invalidPassword = true;
			return;
		} else {
			this.invalidPassword = false;
		}

		this.formSubmitted = true;

		delete postData.verifyPassword;
		let userData = this.authServices.toGetUserDetails()
		postData.user_id = userData.userId
		this.adminService.changePassword(postData).then((resp: any) => {
			if (!resp.error) {
				this.formSubmitted = false;
				element.click();
				this.toastService.success(resp.title,'')
			}
		}, (error) => {
			this.formSubmitted = false;
			this.toastService.error(error);
		});
	}
}

function matchValidator(
	control: AbstractControl | null,
	controlTwo: AbstractControl | null,
  ): ValidatorFn {
	return () => {
	  if (control?.value != controlTwo?.value)
		return { match_error: `Password and Verify Password must be match` };
	  return null;
	};
  }
