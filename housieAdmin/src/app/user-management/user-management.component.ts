import { Component, OnInit, ChangeDetectorRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../_shared/services/admin.service';
import { environment } from 'src/environments/environment';
import { ToastService } from '../_shared/services/toast.service';
import { UploadService } from '../_shared/services/upload.service';
import * as moment from 'moment';

@Component({
	selector: 'app-user-management',
	templateUrl: './user-management.component.html',
	styleUrls: ['./user-management.component.css']
})
export class UserManagement implements OnInit {

	displayedColumns: string[] = ["no", "username", "email", "mobile", "status", "bank", "pan","kycDate" , "action"];
	dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

	userDetailsFormGroup!: FormGroup;

	dashBoardData: any;
	submitted: boolean = false;
	columnTitles: any;
	withDrawnData: any;
	participatedData: any;
	formSubmitted: boolean;
	dataLoader: boolean;
	isModalOpen: boolean;
	modalData: any;
	userDetailsData: any;
	usereProfile: string;
	userId: string;
	host: string;
	participatedGames: any;
	participatedGameColum: any;
	filterForm!: FormGroup;
	viewCustomer: boolean = false;

	collection = [];
	p = 1;


	constructor(private router: Router,
		private fb: FormBuilder,
		private adminService: AdminService,
		private changeDetector: ChangeDetectorRef,
		private uploadService: UploadService,
		private toastService: ToastService) {

		this.formSubmitted = false;
		this.dataLoader = false;
		this.isModalOpen = false;
		this.modalData = {};
		this.userDetailsData = {};
		this.usereProfile = '';
		this.userId = "";
		this.host = environment.serverIp;

		this.columnTitles = [
			{ "column": "User Name" },
			{ "column": "Email" },
			{ "column": "Mobile No" },
			{ "column": "Verfied" },
			{ "column": "KYC" },
			{ "column": "Date" },
			{ "column": "Action" },
		]
		this.participatedGameColum = [
			{ "column": "S.No" },
			{ "column": "Game Name" },
			{ "column": "Total Tickets" },
			{ "column": "Total Winnings" },
			{ "column": "Fees" },
			{ "column": "Status" },
			// { "column": "Date" },
			// { "column": "Action" },
		]

		this.dashBoardData = [];

		this.withDrawnData = []

		this.participatedData = [
			[
				'500',
				'500',
				'ion-android-people',
				'bg-success',
				'bg-success',
				'500',
				'500',
				'ion-android-people',
				'bg-success',
				'bg-success'

			],
			[
				'500',
				'500',
				'ion-android-people',
				'bg-success',
				'bg-success',
				'500',
				'500',
				'ion-android-people',
				'bg-success',
				'bg-success'
			]
		]
		this.filterForm = this.fb.group({
			fromDate: [''],
			toDate: ['']
		});
	}

	ngOnInit(): void {
		this.getUsers();

	}

	@ViewChild(MatPaginator)
	paginator!: MatPaginator;
	@ViewChild(MatSort)
	sort!: MatSort;

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	createForm() {
		this.userDetailsFormGroup = this.fb.group({
			name: ['', [Validators.required]],
			email: ['', [Validators.required]],
			mobileNo: ['', [Validators.required]],
			aaddress: ['', [Validators.required]],
		});
	}

	navigateTo(nav: string) {
		if (nav == 'back') {
			this.viewCustomer = false;
			this.columnTitles = [
				{ "column": "User Name" },
				{ "column": "Email" },
				{ "column": "Mobile No" },
				{ "column": "Verfied" },
				{ "column": "KYC" },
				{ "column": "Date" },
				{ "column": "Action" },
			]
			this.getUsers();
		} else {
			this.viewCustomer = true;
		}
	}

	getUsers() {
		if (this.dataLoader) {
			return;
		}
		this.dataLoader = true;
		let postData:any={}
		postData.fromDate="",
		postData.toDate=""
		this.adminService.getUsers(postData).then((resp: any) => {
			if (resp.details) {
				this.dashBoardData = resp.details;
				this.dataSource = new MatTableDataSource<PeriodicElement>(this.dashBoardData);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			}
			this.dataLoader = false;
		}, (error) => {
			this.dataLoader = false;
			this.toastService.error(error);
		});
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
	onSubmit() {
		this.submitted = true;
		let postData = this.filterForm.getRawValue();
		postData.toDate = postData.toDate ? moment(postData.toDate).format('YYYY-MM-DD') : '';
		postData.fromDate = postData.fromDate ? moment(postData.fromDate).format('YYYY-MM-DD') : '';
		if (postData.toDate && postData.fromDate && moment(postData.toDate).isBefore(postData.fromDate)) {
			this.toastService.error('Error: toDate should not be greater than fromDate');
		}else{
		this.adminService.getUsers(postData).then((resp: any) => {
			if (resp.details) {
				this.dashBoardData = resp.details;
				this.dataSource = new MatTableDataSource<PeriodicElement>(this.dashBoardData);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			}
			this.dataLoader = false;
		}, (error) => {
			this.dataLoader = false;
			this.toastService.error(error);
		});
	}
	}

	onReset() {
		this.filterForm.reset();
		this.onSubmit()
	}

	openTab(tabName: any) {
		console.log(tabName, 'tabName');

		if (tabName == 'participatedGames') {
			this.columnTitles = [
				{ "column": "Participants" },
				{ "column": "Game Name" },
				{ "column": "Total Winnings" },
				{ "column": "Fees" },
				{ "column": "Tickets" },
				{ "column": "Reg. Start Time" },
				{ "column": "Reg. End Time" },
				{ "column": "Game Start & End Time" },
				{ "column": "Multi Winners" },
				{ "column": "Status" },
			];

			this.participatedData = [];
		} else if (tabName == 'kyc') {
			console.log(this.userDetailsData.kyc, 'userDetailsData.kyc.aadhar_front.image_name');

		} else {
			this.columnTitles = [
				{ "column": "S.No." },
				// { "column": "Fees" },
				{ "column": "Withdraw Amount" },
				{ "column": "Wallet Balance" },
				{ "column": "Date" },
				{ "column": "Status" }
			];
			this.getWithdrawRequests();
		}

	}

	getUserDetails(id: string) {
		if (this.dataLoader) {
			return;
		}
		this.dataLoader = true;
		let postData:any={}
		postData.fromDate="",
		postData.toDate=""
		this.adminService.getUesrDetails({ user_id: id }).then((resp: any) => {
			this.dataLoader = false;
			if (resp.details) {
				console.log(resp.details);

				this.userDetailsData = resp.details;
				this.participatedGames = resp.participated_games
				if (resp.details.profile_image) {
					this.usereProfile = resp.details.profile_image;
				}
			}
		}, (error) => {
			this.dataLoader = false;
			this.toastService.error(error);
		});
	}

	getWithdrawRequests() {
		if (this.dataLoader) {
			return;
		}
		this.dataLoader = true;

		let postData = {
			user_id: this.userId
		}

		this.adminService.getWithdrawRequests(postData).then((resp: any) => {
			if (resp.details) {
				this.withDrawnData = resp.details;
			}
			this.dataLoader = false;
		}, (error) => {
			this.dataLoader = false;
			this.toastService.error(error);
		});
	}


	updateKYC(type: string, status: string) {
		if (this.dataLoader) {
			return;
		}
		this.dataLoader = true;

		let postData = {
			user_id: this.userId,
			type: type,
			status: status
		}

		this.adminService.updateKYC(postData).then((resp: any) => {
			if (resp.details) {
				console.log(resp.details,'resp.details')
				this.userDetailsData.kyc = resp.details;
			}
			this.dataLoader = false;
		}, (error) => {
			this.dataLoader = false;
			this.toastService.error(error);
		});
	}

	updateBank(type: string, status: string) {
		if (this.dataLoader) {
			return;
		}
		this.dataLoader = true;

		let postData = {
			user_id: this.userId,
			type: type,
			status: status
		}

		this.adminService.updateKYC(postData).then((resp: any) => {
			if (resp.details) {
				this.userDetailsData.bank = resp.bank;
			}
			this.dataLoader = false;
		}, (error) => {
			this.dataLoader = false;
			this.toastService.error(error);
		});
	}

	view(id: string) {
		this.viewCustomer = true;
		this.userId = id;
		this.getUserDetails(id);
	}

	actionButton(id: string, buttonType: string) {
		this.isModalOpen = false;
		this.modalData = {};
		this.modalData.id = id;
		this.modalData.buttonType = buttonType;
		this.changeDetector.detectChanges();
		this.isModalOpen = true;
		this.changeDetector.detectChanges();
	}


	_arrayBufferToBase64(buffer: any) {
		var binary = '';
		var bytes = new Uint8Array(buffer);
		var len = bytes.byteLength;
		for (var i = 0; i < len; i++) {
			binary += String.fromCharCode(bytes[i]);
		}
		return window.btoa(binary);
	}

	onDownloadImage(url: any) {
		console.log("dddddddddddddddd")
		let urlType = url.split('.').pop();
		this.adminService.downloadImage({ url }).then((resp: any) => {
			if (resp?.details) {
				let data = JSON.parse(resp.details);
				var base64 = btoa(
					new Uint8Array(data.data)
						.reduce((data, byte) => data + String.fromCharCode(byte), '')
				);
				let finalDataa = `data:image/${urlType};base64,${base64}`
				let link: any = document.createElement('a');
				link.href = finalDataa;
				link.download = `${url.split("/")[4]}`;
				link.click();
			}
		}, (error) => {
			this.toastService.error(error);
		});
	}

	showImgName(url: String) {
		return  url ?`${url.split("/")[4].split('_')[1]}`:''
	}

}

export interface PeriodicElement {
}

const ELEMENT_DATA: PeriodicElement[] = [];