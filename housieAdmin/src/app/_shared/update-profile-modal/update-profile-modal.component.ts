import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';

import { AdminService } from '../services/admin.service';
import { AuthGuardService } from '../services/auth.service';
import { Cache } from '../services/cache';
import { ToastService } from '../services/toast.service';

@Component({
	selector: 'app-update-profile-modal',
	templateUrl: './update-profile-modal.component.html',
	styleUrls: ['./update-profile-modal.component.css']
})
export class UpdateProfileModalComponent implements OnInit {

	profileFormGroup!: FormGroup;
	formSubmitted: boolean;
	isModalOpen = true;
	userData:any;
	name:any;
	@Output() toUpdateUser: EventEmitter<any> = new EventEmitter<any>();
	@Output() getUserProfile: EventEmitter<any> = new EventEmitter<any>();
	constructor(private fb: FormBuilder,
		private adminService: AdminService,
		private cache: Cache,
		private authServices: AuthGuardService,
		private toastService: ToastService) {

		this.formSubmitted = false;
		this.createForm();
	}

	ngOnInit(): void {
		this.userData = localStorage.getItem('userDetails')
		let userDeatils = JSON.parse(this.userData)
		if (userDeatils) {
			this.setDataToForm({ userName: userDeatils.name, userMobile: userDeatils.mobile })
		} else {
			this.setDataToForm(this.cache.user)
		}
	}

	setDataToForm(data:any){
		this.profileFormGroup.get('name')?.patchValue(data.userName);
		this.profileFormGroup.get('mobile')?.patchValue(data.userMobile);
	}

	createForm() {
		this.profileFormGroup = this.fb.group({
			name: ['', Validators.required],
			mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
		});
	}

	get f(): { [key: string]: AbstractControl } {
		return this.profileFormGroup.controls;
	}

	editProfile() {
		// this.toUpdateUser.emit()
		// return;
		if (this.formSubmitted) {
			return;
		}
		let element: HTMLElement = document.getElementById("close") as HTMLElement;
		let postData = this.profileFormGroup.getRawValue();

		this.formSubmitted = true;
		let userData = this.authServices.toGetUserDetails()
		postData.user_id = userData.userId;
		this.adminService.editProfile(postData).then((resp: any) => {
			if (!resp.error) {
				this.formSubmitted = false;
				element.click();
				this.getUserProfile.emit();
				this.toastService.success(resp.title, '')
			}
		}, (error) => {
			this.formSubmitted = false;
			this.toastService.error(error);
		});
	}

	formFieldValidator(val: string) {
		return (this.profileFormGroup.get(val)?.invalid && (this.profileFormGroup.get(val)?.dirty || this.profileFormGroup.get(val)?.touched));
	}


	/**
 * it checks the form has errors or not
 * @param val the val gets formcotrol of individual forms
 */
	formFieldErrors(val: string) {
		return this.profileFormGroup.get(val)?.errors;
	}

}
