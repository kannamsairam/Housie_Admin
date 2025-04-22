import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { AdminService } from 'src/app/_shared/services/admin.service';
import { ToastService } from 'src/app/_shared/services/toast.service';

@Component({
	selector: 'app-withdrown-modal',
	templateUrl: './withdrown-modal.component.html',
	styleUrls: ['./withdrown-modal.component.css']
})
export class WithdrownModalComponent implements OnInit {

	@Input() modalData: any;
	@Output() isModalOpen: any;
	@Output() getWithdrawRequests: EventEmitter<any> = new EventEmitter<any>();

	withDrawnReqFormGroup!: FormGroup;
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
	
		if(this.modalData.buttonType == 'reject') {
			this.title.heading = 'Reject Request';
			this.title.subHeading = 'Are you sure, you want to reject this request?';
			// this.title.disclaimer = 'User will be deleted permanently from system';
		} else if(this.modalData.buttonType == 'accept') {
			this.title.heading = 'Accept Request';
			this.title.subHeading = 'Are you sure, you want to accept this request?';
			// this.title.disclaimer = 'User will able to login to system';
		}
	}

	createForm() {
		this.withDrawnReqFormGroup = this.fb.group({
			description: ['', [Validators.required]],
		});
	}

	get f(): { [key: string]: AbstractControl } {
		return this.withDrawnReqFormGroup.controls;
	}

	confirm() {
		if (this.dataLoader) {
			return;
		}
		this.dataLoader = true;

		let element: HTMLElement = document.getElementById("close") as HTMLElement;
		let postData: any = this.withDrawnReqFormGroup.getRawValue();

		console.log(this.withDrawnReqFormGroup.getRawValue());
		
		postData.status = this.modalData.buttonType;
		postData.withdraw_id = this.modalData.id;
			
		this.adminService.updateWithdrawRequests(postData).then((resp: any) => {
			element.click();
			this.getWithdrawRequests.emit();
			this.dataLoader = false;
		}, (error) => {
			this.dataLoader = false;
			this.toastService.error(error);
		});
		
	}

	delete(element: any) {
		this.adminService.deleteUser({user_id: this.modalData.id}).then((resp: any) => {
			this.dataLoader = false;
			element.click();
			this.getWithdrawRequests.emit();
		}, (error) => {
			this.dataLoader = false;
			this.toastService.error(error);
		});
	}

}
