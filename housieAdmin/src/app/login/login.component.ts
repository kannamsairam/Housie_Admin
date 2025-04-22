import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AdminService } from '../_shared/services/admin.service';
import { Cache } from '../_shared/services/cache';
import { ToastService } from '../_shared/services/toast.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	hide = true
	login: FormGroup;
	invalidlogin = false;
	submitted = false;
	loading = false;
	formSubmitted = false;
	rememberMe: Boolean = false
	emailRegExL: any = '^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
	constructor(private fb: FormBuilder,
		private router: Router,
		private adminService: AdminService,
		private cache: Cache,
		private toastService: ToastService) {

		this.cache.clear('user');
		this.login = this.fb.group({
			// id: [],
			email: ['', [Validators.required, Validators.pattern(this.emailRegExL)]],
			password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(14)]]
		});


	}

	ngOnInit(): void {
		this.onPatchUser()

	}

	logIn() {
		if (this.formSubmitted || !this.login.valid) {
			return;
		}
		this.formSubmitted = true;
		let postData = this.login.getRawValue();
		this.adminService.logIn(postData).then((resp: any) => {
			if (resp.userDetails && resp.userDetails.name) {
				this.cache.user.userName = resp.userDetails.name;
			}
			if (resp.userDetails && resp.userDetails.mobile) {
				this.cache.user.userMobile = resp.userDetails.mobile;
			}
			this.onRemember()
			this.cache.set('user', this.cache.user);
			this.router.navigate(["dashboard"]);
			this.formSubmitted = false;
		}, (error) => {
			this.formSubmitted = false;
			this.toastService.error(error);
		});
	}

	forgetPassword() {
		this.router.navigate(["forget-password"]);
	}


	onRemember() {
		localStorage.removeItem('userData');
		if (!this.rememberMe) {
			return;
		}
		let postData = this.login.getRawValue();
		localStorage.setItem('userData', JSON.stringify(postData))
	}


	onPatchUser() {
		let userData: any = localStorage.getItem('userData');
		if (!!userData) {
			this.rememberMe = true;
			this.login.patchValue(JSON.parse(userData))
		}
	}


	/**
* it checks the form valid or invalid
* @param val the val is formcotrol of individual forms
*/
	formFieldValidator(val: string) {
		return (this.login.get(val)?.invalid && (this.login.get(val)?.dirty || this.login.get(val)?.touched));
	}


	/**
 * it checks the form has errors or not
 * @param val the val gets formcotrol of individual forms
 */
	formFieldErrors(val: string) {
		return this.login.get(val)?.errors;
	}

}
