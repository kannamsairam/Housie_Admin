import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { AdminService } from 'src/app/_shared/services/admin.service';
import { ToastService } from 'src/app/_shared/services/toast.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import Swal from 'sweetalert2';


@Component({
	selector: 'app-admin-modal',
	templateUrl: './admin-modal.component.html',
	styleUrls: ['./admin-modal.component.css']
})
export class AdminModalComponent implements OnInit {

	hide = true
	selectmudule: any = []
	emailRegExL: any = '^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
	onlyNum: any = '^[0-9]$'
	obj: Array<any> = [
		{ name: 'Quiz', value: 'quiz', checked: false },
		// { name: 'Sub Admin', value: 'subAdmin', checked: false },
		{ name: 'Users Management', value: 'usersManagement', checked: false },
		{ name: 'Users Wallet ', value: 'userWallet', checked: false },
		{ name: 'Banner Management', value: 'bannerManagement', checked: false },
		// { name: 'Bonus Management', value: 'bonusManagement', checked: false },
		{ name: 'Reports', value: 'reports', checked: false },
		{ name: 'Withdrawn Request', value: 'withdrawnRequest', checked: false },
		{ name: 'Notification Management', value: 'notificationManagement', checked: false },
		{ name: 'TDS', value: 'tds', checked: false },
		{ name: 'Deposit And GST', value: 'deposit-gst', checked: false }
	];


	@Input() modalData: any;
	@Output() isModalOpen: any;
	@Output() getAdmin: EventEmitter<any> = new EventEmitter<any>();

	adminDeatilsFormGroup!: FormGroup;
	dataLoader: boolean;
	form: FormGroup;
	admin_privileges: any;

	constructor(private fb: FormBuilder,
		private adminService: AdminService,
		private toastService: ToastService) {

		this.dataLoader = false;

		this.createForm();

		this.form = this.fb.group({
			admin_privileges: this.fb.array([])
		})
	}


	ngOnInit(): void {

		if (this.modalData._id) {
			this.adminDeatilsFormGroup.get('name')?.patchValue(this.modalData.name);
			this.adminDeatilsFormGroup.get('mobile')?.patchValue(this.modalData.mobile);
			this.adminDeatilsFormGroup.get('email')?.patchValue(this.modalData.email);
			this.adminDeatilsFormGroup.get('password')?.patchValue('123456');
			// this.adminDeatilsFormGroup.get(this.admin_privileges)?.patchValue(this.modalData.admin_privileges);
			this.obj = this.obj.map(val => {
				return {
					...val,
					checked: this.modalData.admin_privileges.includes(val.value) ? true : false
				}
			})
			this.onCheckboxChange(null)
		}
	}

	createForm() {

		//let admin_privileges = this.form.value
		//console.log(this.admin_privileges)

		this.adminDeatilsFormGroup = this.fb.group({
			name: ['', [Validators.required]],
			mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/)]],
			password: ['', !this?.modalData?._id && [Validators.required, Validators.minLength(4), Validators.maxLength(14)]],
			email: ['', [Validators.required, Validators.pattern(this.emailRegExL)]],
		});
	}

	addAdmin() {

		if (this.dataLoader) {
			return;
		}

		this.dataLoader = true;
		let postData = this.adminDeatilsFormGroup.getRawValue();


		// console.log(this.form.value)
		let element: HTMLElement = document.getElementById("close") as HTMLElement;

		if (this.modalData.name) {
			postData.admin_id = this.modalData._id;
			postData = { ...postData, admin_privileges: this.admin_privileges };
			console.log(postData,'postData')
			delete postData.password
			this.adminService.updateAdmin(postData).then((resp: any) => {
				if (!resp.error) {
					this.modalData = {};
					element.click();
					this.getAdmin.emit();
					this.dataLoader = false;
					Swal.fire('Updated!', '', 'success')
				} else {
					this.toastService.error(resp.message);
				}
			}, (error) => {
				this.dataLoader = false;
				this.toastService.error(error);
			});
		}

		else {
			// this.adminService = this.admin_privileges.toString();
			postData = { ...postData, admin_privileges: this.admin_privileges };
			this.adminService.addAdmin(postData).then((resp: any) => {
				if (!resp.error) {
					element.click();
					this.getAdmin.emit();
					this.dataLoader = false;
					Swal.fire('Sucess!', '', 'success')
				} else {
					this.toastService.error(resp.message);
				}
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
			admin_id: this.modalData.id
		}

		this.adminService.deleteAdmin(postData).then((resp: any) => {
			this.dataLoader = false;
			element.click();
			this.getAdmin.emit();
		}, (error) => {
			this.dataLoader = false;
			this.toastService.error(error);
		});
	}



	onCheckboxChange(e: any) {
		const admin_privileges: FormArray = this.form.get('admin_privileges') as FormArray;
		let data = this.obj.filter(val => val.checked).map(el => el.value);
		console.log(data,'checkbox')
		admin_privileges.patchValue(data)
		this.admin_privileges = data;
		return;
		// const admin_privileges: FormArray = this.form.get('admin_privileges') as FormArray;
		if (e.target.checked) {
			admin_privileges.push(new FormControl(e.target.value));
		} else {
			let i: number = 0;
			admin_privileges.controls.forEach((item) => {
				if (item.value == e.target.value) {
					admin_privileges.removeAt(i);
					return;
				}
				i++;
			})
		}

		this.admin_privileges = this.form.value
		console.log(admin_privileges);
	}


	/**
* it checks the form valid or invalid
* @param val the val is formcotrol of individual forms
*/
	formFieldValidator(val: string) {
		return (this.adminDeatilsFormGroup.get(val)?.invalid && (this.adminDeatilsFormGroup.get(val)?.dirty || this.adminDeatilsFormGroup.get(val)?.touched));
	}


	/**
	* it checks the form has errors or not
	* @param val the val gets formcotrol of individual forms
	*/
	formFieldErrors(val: string) {
		return this.adminDeatilsFormGroup.get(val)?.errors;
	}


	checkValidOrNot() {
		if (!this.admin_privileges || this.admin_privileges.length <= 0) return true
		else return false

	}
}
