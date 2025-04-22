import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild, } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService, ApilistBanner } from '../_shared/services/admin.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../_shared/services/toast.service';

@Component({
	selector: 'app-user-wallet',
	templateUrl: './user-wallet.component.html',
	styleUrls: ['./user-wallet.css']
})
export class UserWallet implements OnInit {
	
    name1 = '400';
	name2 = '300';
	name3 = '200';
	
	displayedColumns: string[] = ['no', 'name', 'email',  'mobile', 'depositwallet', 'winAmount', 'bonusWallet', 'credit_points', 'action'];
	dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  
  
	data: any[] = [];
	dataArray: any;
	isModalOpen!: boolean;
	userId: any;
	userDetail: any;
	totalwallet : any;
	balancewallet : any;
	winneramount : any;
	bonoswallet : any;

  
	constructor(private service: ApilistBanner, 
		private http: HttpClient,
		 public route: ActivatedRoute,
		  public router : Router,
		   private formBuilder: FormBuilder,
		   private adminService:AdminService,
		   private toastService:ToastService
		   ) {

	this.getUserWallet();
		
	//   this.service.getDataDetails(this.data).then((resp: any) => {
	// 	this.dataArray = resp.result;
	// 	this.dataSource = new MatTableDataSource<PeriodicElement>(this.dataArray);
	// 	this.dataSource.paginator = this.paginator;
	// 	this.dataSource.sort = this.sort;
	// 	console.warn(this.dataArray)
	//   });
	}
	


  
	@ViewChild(MatPaginator)
	 paginator!: MatPaginator;
	@ViewChild(MatSort)
	 sort!: MatSort;
  
	// constructor() {
	//   this.dataSource = new MatTableDataSource();
	// }
  
	ngAfterViewInit() {
	  this.dataSource.paginator = this.paginator;
	  this.dataSource.sort = this.sort;
	}

	getUserWallet(){
		let postData:any={}
		postData.fromDate="",
		postData.toDate=""
		this.adminService.getUsers(postData).then((resp: any) => {
			if (resp.details) {
				// this.dashBoardData = 
				this.dataArray = resp.details;
		this.dataSource = new MatTableDataSource<PeriodicElement>(this.dataArray);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
			}
		}, (error) => {
			;
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
  

  
	openModal(id: string) {
	    this.isModalOpen = false;
		//this.modalData = {};
		this.isModalOpen = true; 
		this.userId = id;
		this.balancewallet = this.userId.balanceWallet;
		this.userDetail = this.userId._id;
		this.winneramount = this.userId.winAmount;
		this.bonoswallet = this.userId.bonusWallet;
		console.log(this.userId);

		this.uploadForm.patchValue({
			userId:this.userId._id,
			balanceWallet: this.userId.balanceWallet,
			winAmount: this.userId.winAmount,
			bonusWallet:this.userId.bonusWallet
		})
	  }

	  numericNumberReg = /^\-?[0-9]+(?:\.[0-9]{1,2})?$/;
	ngOnInit() {
		this.uploadForm = this.formBuilder.group({
			userId: [''],
	    	balanceWallet: ['',[Validators.required, Validators.pattern(this.numericNumberReg)]],	
			winAmount: ['',[Validators.required, Validators.pattern(this.numericNumberReg)]],
			bonusWallet: ['',[Validators.required, Validators.pattern(this.numericNumberReg)]],
		});
	  }
	
	uploadForm: any; 
	form: any;
	submitted: boolean = false;
	

	onSubmit()  {
		console.log(this.uploadForm.valid);
		
		if (this.submitted || !this.uploadForm.valid) {
			return;
		}
		this.submitted = true;
        let postData=this.uploadForm.getRawValue();
		// postData.user_id=postData.userId;
        // postData.balanceWallet=postData.credit_points
		// delete postData.userId;
		// delete postData.credit_points;

		postData.balanceWallet= Number(postData.balanceWallet);
		postData.bonusWallet =Number(postData.bonusWallet);
		postData.winAmount=Number(postData.winAmount)
		postData.user_id=postData.userId
		 let element: HTMLElement = document.getElementById("close") as HTMLElement;
      
		this.adminService.updateUserWallet(postData).then((resp: any) => {
			element.click();
			this.submitted = false;
	this.getUserWallet();
		}, (error) => {
			this.toastService.error(error);
			this.submitted = false;
		});
	  }
	  
  roundNumber(x:any){
	return (x).toFixed(2); 
  }



	/**
* it checks the form valid or invalid
* @param val the val is formcotrol of individual forms
*/
	formFieldValidator(val: string) {
		return (this.uploadForm.get(val)?.invalid && (this.uploadForm.get(val)?.dirty || this.uploadForm.get(val)?.touched));
	}

	/**
 * it checks the form has errors or not
 * @param val the val gets formcotrol of individual forms
 */
	formFieldErrors(val: string) {
		return this.uploadForm.get(val)?.errors;
	}

  }
  
  export interface PeriodicElement {
  }
  
  const ELEMENT_DATA: PeriodicElement[] = [];
  







function postData(postData: any) {
	throw new Error('Function not implemented.');
}
	// name1 = '400';
	// name2 = '300';
	// name3 = '200';

	// dashBoardData: any;
	// columnTitles: any;
	// p = 1;
	// dataLoader: boolean;
	// modalData: any;
	// isModalOpen: boolean;


	// form: any;
	// "powers" : string[]; 
	// submitted: boolean = false;
   
	// onSubmit(form: any)  {
	// 	this.submitted = true;
	// 	this.form = form;
	// 	console.log("form submit....");
	// 	this.submitted = form.reset();
	//   }


	// constructor() {

	// 	this.dataLoader = false;
	// 	this.isModalOpen = false;
	// 	this.columnTitles = [
	// 		{ "column": "Name" },
	// 		{ "column": "Email" },
	// 		{ "column": "Mobile No" },
	// 		{ "column": "Balance Wallet" },
	// 		{ "column": "Winning Wallet" },
	// 		{ "column": "Bonus Wallet" },
	// 		{ "column": "Action" },
	// 	]

	// 	this.dashBoardData = []	;
	// 	this.modalData = {
	// 		'buttonType': ''
	// 	};
	
	// }

// 	ngOnInit(): void {
// 		//this.getWithdrawRequests();
// 	}

// 	openModal() {
// 		this.isModalOpen = false;
// 		//this.modalData = {};
// 		this.isModalOpen = true; 
// 	  }

// }

