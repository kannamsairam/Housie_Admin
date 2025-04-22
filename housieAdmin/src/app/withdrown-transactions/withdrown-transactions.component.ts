import { Component, OnInit, ChangeDetectorRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TreeGridFormattedValuesFilteringStrategy } from 'igniteui-angular';
import * as moment from 'moment';
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { DatePipe } from "@angular/common";
import {FormControl} from '@angular/forms';
import { AdminService } from '../_shared/services/admin.service';
import { ToastService } from '../_shared/services/toast.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export const MY_FORMATS = {
	parse: {
		dateInput: "DD-MM-YYYY"
	},
	display: {
		dateInput: "DD-MM-YYYY",
		monthYearLabel: "MMM YYYY",
		dateA11yLabel: "YYYY-MM-DD HH:mm:ss",
		monthYearA11yLabel: "MMMM YYYY"
	}
};

@Component({
	selector: 'app-withdrown-transactions',
	templateUrl: './withdrown-transactions.component.html',
	styleUrls: ['./withdrown-transactions.component.css'],
	providers: [
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE]
		},
		{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
		DatePipe
	]
})
export class WithdrownTransactions implements OnInit {


	form: any;
	"powers": string[];
	submitted: boolean = false;


	displayedColumns: string[] = ['name', 'email',  'mobile', 'amount','balance','createdAt','status'];
	dashBoardData = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
	columnTitles: any;
	p = 1;
	dataLoader: boolean;
	modalData: any;
	isModalOpen: boolean;
	filterForm: FormGroup;
	constructor(private router: Router,
		private adminService: AdminService,
		private changeDetector: ChangeDetectorRef,
		private fb: FormBuilder,
		private toastService: ToastService) {

		this.dataLoader = false;
		this.isModalOpen = false;
		this.columnTitles = [
			{ "column": "User Name" },
			{ "column": "Email" },
			{ "column": "Mobile No" },
			// { "column": "Fees" },
			{ "column": "Amount" },
			{ "column": "Wallet Balance" },
			{ "column": "Date" },
			{ "column": "Action" },
		]

		this.modalData = {
			'buttonType': ''
		};

		this.filterForm = this.fb.group({
			fromDate: [''],
			toDate: [''],
			email: [''],
			mobile: [''],
		});

	}

	ngOnInit(): void {
		this.getWithdrawRequests();
	}

	@ViewChild(MatPaginator)
	 paginator!: MatPaginator;
	@ViewChild(MatSort)
	 sort!: MatSort;
  
	ngAfterViewInit() {
	  this.dashBoardData.paginator = this.paginator;
	  this.dashBoardData.sort = this.sort;
	}

	onSubmit() {
		this.submitted = true;
		// console.log(this.filterForm.getRawValue());"2001-03-15
		let postData = this.filterForm.getRawValue();
		postData.toDate = postData.toDate ? moment(postData.toDate).format('YYYY-MM-DD') : '';
		postData.fromDate = postData.fromDate ? moment(postData.fromDate).format('YYYY-MM-DD') : '';
		postData.mobile = postData.mobile ? postData.mobile.toString() : ''
		this.adminService.withdrawRequestsFilter(postData).then((resp: any) => {
			if (resp.details) {
				this.dashBoardData = new MatTableDataSource<PeriodicElement>(resp.details);
				this.dashBoardData.paginator = this.paginator;
				this.dashBoardData.sort = this.sort;
			}
			this.dataLoader = false;
		}, (error) => {
			this.dataLoader = false;
			this.toastService.error(error);
		});
	}

	onReset() {
		this.filterForm.reset();
		this.onSubmit()
	}

	buttonClickedInChild(valueEmitted: any) {
		let clickedButton = valueEmitted;
		console.log(clickedButton, 'clickedButton');

	}

	getWithdrawRequests() {
		if (this.dataLoader) {
			return;
		}
		this.dataLoader = true;

		this.adminService.getWithdrawRequests({ "user_id": false }).then((resp: any) => {
			if (resp.details) {
				this.dashBoardData = new MatTableDataSource<PeriodicElement>(resp.details);
				this.dashBoardData.paginator = this.paginator;
				this.dashBoardData.sort = this.sort;
			}
			this.dataLoader = false;
		}, (error) => {
			this.dataLoader = false;
			this.toastService.error(error);
		});
	}

	action(buttonType: string, id: string) {

		if (this.dataLoader) {
			return;
		  }
		  this.dataLoader = true;
		
		  let postData: any = {};
		  
		  postData.status = buttonType;
		  postData.withdraw_id = id;
		  postData.description = "updated";
			
		  this.adminService.updateWithdrawRequests(postData).then((resp: any) => {
			this.dataLoader = false;
			this.getWithdrawRequests();
		  }, (error) => {
			this.dataLoader = false;
			this.toastService.error(error);
		  });
		 this.changeDetector.detectChanges();
		 this.changeDetector.detectChanges();
	}


}

export interface PeriodicElement {
}

const ELEMENT_DATA: PeriodicElement[] = [];

