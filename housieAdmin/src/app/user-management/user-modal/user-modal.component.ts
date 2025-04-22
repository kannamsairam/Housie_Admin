import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AdminService } from 'src/app/_shared/services/admin.service';
import { ToastService } from 'src/app/_shared/services/toast.service';

@Component({
	selector: 'app-user-modal',
	templateUrl: './user-modal.component.html',
	styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {

	@Input() modalData: any;
	@Output() isModalOpen: any;
	@Output() getUsers: EventEmitter<any> = new EventEmitter<any>();

	bonusDeatilsFormGroup!: FormGroup;
	dataLoader: boolean;

	title: any;

	constructor(private fb: FormBuilder,
		        private adminService: AdminService,
				private toastService: ToastService) {

		this.dataLoader = false;
		this.title = {
			heading: '',
			subHeading: '',
			disclaimer: ''
		}

		this.createForm();
	}

	ngOnInit(): void {
		console.log('modal open', this.modalData);
		
		// if(this.modalData._id) {
			
		// }

		if(this.modalData.buttonType == 'delete') {
			this.title.heading = 'Delete User';
			this.title.subHeading = 'Are you sure, you want to delete this user?';
			this.title.disclaimer = 'User will be deleted permanently from system';
		} else if(this.modalData.buttonType == 'verify') {
			this.title.heading = 'Verify User';
			this.title.subHeading = 'Are you sure, you want to verify this user?';
			this.title.disclaimer = 'User will able to login to system';
		} else if(this.modalData.buttonType == 'unblock') {
			this.title.heading = 'Unblock User';
			this.title.subHeading = 'Are you sure, you want to unblock this user?';
			this.title.disclaimer = 'User will able to login to system';
		} else if(this.modalData.buttonType == 'block') {
			this.title.heading = 'Block User';
			this.title.subHeading = 'Are you sure, you want to block this user?';
			this.title.disclaimer = 'User will not able to login to system';
		}
	}

	createForm() {
		this.bonusDeatilsFormGroup = this.fb.group({
			name: ['', [Validators.required]],
			amount: ['', [Validators.required]],
		});
	}

	confirm() {
		if (this.dataLoader) {
			return;
		}
		this.dataLoader = true;

		let element: HTMLElement = document.getElementById("close") as HTMLElement;
		let postData: any;

		if (this.modalData.buttonType == 'block') {
			postData = {'blocked': true};
		} else if (this.modalData.buttonType == 'unblock') {
			postData = {'unblocked': true};
		} else if (this.modalData.buttonType == 'verify') {
			postData = {'verify': true};
		}

		if(this.modalData.buttonType != 'delete') {
			postData.user_id = this.modalData.id;
			
			this.adminService.updateUser(postData).then((resp: any) => {
				element.click();
				this.getUsers.emit();
				this.dataLoader = false;
			}, (error) => {
				this.dataLoader = false;
				this.toastService.error(error);
			});
		} else {
			this.delete(element);
		}
		
	}

	delete(element: any) {
		this.adminService.deleteUser({user_id: this.modalData.id}).then((resp: any) => {
			this.dataLoader = false;
			element.click();
			this.getUsers.emit();
		}, (error) => {
			this.dataLoader = false;
			this.toastService.error(error);
		});
	}

}
