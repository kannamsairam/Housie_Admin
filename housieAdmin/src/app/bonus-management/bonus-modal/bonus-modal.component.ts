import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AdminService } from 'src/app/_shared/services/admin.service';
import { AuthGuardService } from 'src/app/_shared/services/auth.service';
import { ToastService } from 'src/app/_shared/services/toast.service';

@Component({
	selector: 'app-bonus-modal',
	templateUrl: './bonus-modal.component.html',
	styleUrls: ['./bonus-modal.component.css']
})
export class BonusModalComponent implements OnInit {

	@Input() modalData: any;
	@Output() isModalOpen: any;
	@Output() getBonus: EventEmitter<any> = new EventEmitter<any>();

	bonusDeatilsFormGroup!: FormGroup;
	dataLoader: boolean;
	numericNumberReg = /^[0-9]+$/;

	constructor(private fb: FormBuilder,
		private adminService: AdminService,
		private toastService: ToastService,
		private authService: AuthGuardService
	) {

		this.dataLoader = false;

		this.createForm();
	}

	ngOnInit(): void {
		console.log('modal open', this.modalData);

		if (this.modalData._id) {
			this.bonusDeatilsFormGroup.get('name')?.patchValue(this.modalData.name);
			this.bonusDeatilsFormGroup.get('amount')?.patchValue(this.modalData.amount);
		}
	}

	createForm() {
		this.bonusDeatilsFormGroup = this.fb.group({
			name: ['', [Validators.required]],
			amount: ['', [Validators.required, Validators.pattern(this.numericNumberReg)]],
		});
	}

	/**
* it checks the form valid or invalid
* @param val the val is formcotrol of individual forms
*/
	formFieldValidator(val: string) {
		return (this.bonusDeatilsFormGroup.get(val)?.invalid && (this.bonusDeatilsFormGroup.get(val)?.dirty || this.bonusDeatilsFormGroup.get(val)?.touched));
	}

	/**
	* it checks the form has errors or not
	* @param val the val gets formcotrol of individual forms
	*/
	formFieldErrors(val: string) {
		return this.bonusDeatilsFormGroup.get(val)?.errors;
	}

	addBonus() {
		if (this.dataLoader) {
			return;
		}
		this.dataLoader = true;
		let postData = this.bonusDeatilsFormGroup.getRawValue();
		let userData = this.authService.toGetUserDetails();
		// console.log({ userData });
		postData.created_by = userData.userId;
		postData.amount = Number(postData.amount)
		let element: HTMLElement = document.getElementById("close") as HTMLElement;

		if (this.modalData.name) {
			postData.bonus_id = this.modalData._id;
			console.log(postData);

			this.adminService.updateBonus(postData).then((resp: any) => {
				this.modalData = {};
				element.click();
				this.getBonus.emit();
				this.dataLoader = false;
			}, (error) => {
				this.dataLoader = false;
				this.toastService.error(error);
			});
		} else {
			this.adminService.addBonus(postData).then((resp: any) => {
				element.click();
				this.getBonus.emit();
				this.dataLoader = false;
			}, (error) => {
				this.dataLoader = false;
				this.toastService.error(error);
			});
		}
	}

	confirm() {
		if (this.dataLoader) {
			return;
		}
		this.dataLoader = true;

		let element: HTMLElement = document.getElementById("close") as HTMLElement;
		let postData = {
			bonus_id: this.modalData.id
		}

		this.adminService.deleteBonus(postData).then((resp: any) => {
			this.dataLoader = false;
			element.click();
			this.getBonus.emit();
		}, (error) => {
			this.dataLoader = false;
			this.toastService.error(error);
		});
	}

}
