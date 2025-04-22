import { DatePipe } from '@angular/common';
import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { MY_FORMATS } from '../withdrown-transactions/withdrown-transactions.component';
import {FormControl} from '@angular/forms';
import { AdminService } from '../_shared/services/admin.service';
import { ToastService } from '../_shared/services/toast.service';

@Component({
	selector: 'app-user-transaction',
	templateUrl: './user-transactions.component.html',
	styleUrls: ['./user-transactions.component.css'],
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
export class UserTransaction implements OnInit {

	form: any;
	"powers": string[];
	submitted: boolean = false;
	filterForm!: FormGroup;



	dashBoardData=new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
	displayedColumns: string[] = ['name', 'email',  'mobile', 'amount','new_balance','old_balance','type','createdAt','status','description'];

	columnTitles: any;
	p = 1;
	dataLoader: boolean;
	constructor(private router: Router,
		private fb: FormBuilder,
		private adminService: AdminService,
		private toastService: ToastService) {

		this.dataLoader = false;
		this.columnTitles = [
			{ "column": "User Name" },
			{ "column": "Email" },
			{ "column": "Mobile" },
			{ "column": "Amount" },
			{ "column": "New Balance" },
			{ "column": "Old Balance" },
			{ "column": "Type" },
			{ "column": "Date" },
			{ "column": "Status" },
			{ "column": "Reason" },
		]

		this.filterForm = this.fb.group({
			fromDate: [''],
			toDate: [''],
			email: [''],
			mobile: [''],
		});
	}

	ngOnInit(): void {
		this.getCounts();
	}

	
	@ViewChild(MatPaginator)
	 paginator!: MatPaginator;
	@ViewChild(MatSort)
	 sort!: MatSort;
  
	ngAfterViewInit() {
	  this.dashBoardData.paginator = this.paginator;
	  this.dashBoardData.sort = this.sort;
	}


	getCounts() {
		if (this.dataLoader) {
			return;
		}
		this.dataLoader = true;

		this.adminService.getuserTransactions().then((resp: any) => {
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

	onSubmit() {
		this.submitted = true;
		// console.log(this.filterForm.getRawValue());"2001-03-15
		let postData = this.filterForm.getRawValue();
		postData.toDate = postData.toDate ? moment(postData.toDate).format('YYYY-MM-DD') : '';
		postData.fromDate = postData.fromDate ? moment(postData.fromDate).format('YYYY-MM-DD') : '';
		postData.mobile = postData.mobile ? postData.mobile.toString() : ''
		this.adminService.transactionsFilter(postData).then((resp: any) => {
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

}

export interface PeriodicElement {
}

const ELEMENT_DATA: PeriodicElement[] = [];