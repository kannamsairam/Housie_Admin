import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../_shared/services/admin.service';
import { environment } from 'src/environments/environment';
import { ToastService } from '../_shared/services/toast.service';
import { UploadService } from '../_shared/services/upload.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { AuthGuardService } from 'src/app/_shared/services/auth.service';
import * as moment from 'moment';
import jsPDF  from 'jspdf';
import autoTable from 'jspdf-autotable'

@Component({
    selector: 'app-deposit-gst',
    templateUrl: './deposit-gst.component.html',
    styleUrls: ['./deposit-gst.component.css']
  })
export class DepositGstComponent implements OnInit {

	displayedColumns: string[] = ["no", "username","email","mobile","deposit", "GST","specialbonus", "total","depositdate","invoice"];
	dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

	userDetailsFormGroup!: FormGroup;
	submitted: boolean = false;
	dashBoardData: any;
	columnTitles: any;
	formSubmitted: boolean;
	dataLoader: boolean;
	isModalOpen: boolean = false;
	modalData: any;
	userDetailsData: any;
	usereProfile: string;
	userId: string;
	host: string;
	collection = [];
	p = 1;
	selectedUserId: any = null;
	pdfListData: any = [];
	filterForm!: FormGroup;
	pdfData : any;

	constructor(private router: Router,
		private fb: FormBuilder,
		private adminService: AdminService,
		private changeDetector: ChangeDetectorRef,
		private uploadService: UploadService,
		private toastService: ToastService,
		private authService: AuthGuardService) {

		this.formSubmitted = false;
		this.dataLoader = false;
		//this.isModalOpen = false;
		this.modalData = {};
		this.userDetailsData = {};
		this.usereProfile = '';
		this.userId = "";
		this.host = environment.serverIp;

		this.columnTitles = [
			{ "column": "User Name" },
			{ "column": "Email" },
			{ "column": "Mobile No" },
			{ "column": "Deposit" },
			{ "column": "GST" },
			{ "column": "Special Bonus" },
			{ "column": "Total" },
      		{ "column": "Deposit Date" },
			{ "column": "Invoice" },
			// { "column": "Date" },
			// { "column": "Action" },
		]

		this.dashBoardData = [];
		this.filterForm = this.fb.group({
			fromDate: [''],
			toDate: ['']
		});
		
	}

	ngOnInit(): void {
		this.DepositGstDetails();

	}

	@ViewChild(MatPaginator)
	paginator!: MatPaginator;
	@ViewChild(MatSort)
	sort!: MatSort;
	@ViewChild('pdfTable', {static: false}) pdfTable !: ElementRef;

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

	downloadPDF(): void {
		const doc = new jsPDF();
		const data = this.dataSource.data.map((item, index) =>  {
			const { _id, user_id, ...rest } = item as any;
			return { "S.No": index + 1, ...rest };
		});
		data.forEach((item: any) => {
			let totalAmount = item.amount + item.bonusAmount;
			item.totalAmount = totalAmount?totalAmount:0;
			item.Date=moment(item.createdAt).format("DD-MM-YYYY")
			item.amount=Number((item.amount)).toFixed(2)
		});
		autoTable(doc,{
			columns: [
				{ header: 'S.No', dataKey: 'S.No' },
				{ header: 'User Name', dataKey: 'username' },
				{ header: 'Email Id', dataKey: 'email' },
				{ header: 'Mobile No', dataKey: 'mobile' },
				{ header: 'Deposit', dataKey: 'amount' },
				{ header: 'GST', dataKey: 'gstAmount' },
				{ header: 'Special Bonus', dataKey: 'bonusAmount' },
				{ header: 'Total', dataKey: 'totalAmount'},
				{ header: 'Deposit Date', dataKey: 'Date' }
			  ],
		  body: data
		});
	
		doc.save(`Deposit_Data-${Date.now()}.pdf`);
	  }
	
	DepositGstDetails() {
		if (this.dataLoader) {
			return;
		}
		this.dataLoader = true;
		let postData:any={}
		postData.fromDate="",
		postData.toDate=""
		this.adminService.DepositGstDetails(postData).then((resp: any) => {
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
		console.log(postData,'postData')
		postData.toDate = postData.toDate ? moment(postData.toDate).format('YYYY-MM-DD') : '';
		postData.fromDate = postData.fromDate ? moment(postData.fromDate).format('YYYY-MM-DD') : '';
		if (postData.toDate && postData.fromDate && moment(postData.toDate).isBefore(postData.fromDate)) {
			this.toastService.error('Error: toDate should not be greater than fromDate');
		}else{
		this.adminService.DepositGstDetails(postData).then((resp: any) => {
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
	getUserDetails(id: string) {
		if (this.dataLoader) {
			return;
		}
		this.dataLoader = true;
		this.adminService.getUesrDetails({ user_id: id }).then((resp: any) => {
			this.dataLoader = false;
			if (resp.details) {
				console.log(resp.details);

				this.userDetailsData = resp.details;

				if (resp.details.profile_image) {
					this.usereProfile = resp.details.profile_image;
				}
			}
		}, (error) => {
			this.dataLoader = false;
			this.toastService.error(error);
		});
	}

	view(id: string) {
		this.userId = id;
		this.getUserDetails(id);
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
		return url ? `${url.split("/")[4].split('_')[1]}` : ''
	}

	exportToExcel(): void {
		const dataWithSerialNumber = this.dataSource.data.map((item, index) => {
			const { _id, user_id, createdAt, ...rest } = item as any;
			return { "S.No": index + 1, ...rest };
		});

		dataWithSerialNumber.forEach((item:any)=>{
			item.amount = item.amount?item.amount:0;
			item.bonusAmount=item.bonusAmount?item.bonusAmount:0;
			item.gstAmount=item.gstAmount?item.gstAmount:0;
			item.invoice=item.invoice?item.invoice:"No Invoice";
		})
		const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataWithSerialNumber);
		const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
		const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

		this.saveAsExcelFile(excelBuffer, 'Deposit_Data');
	}
	  

	private saveAsExcelFile(buffer: any, fileName: string): void {
		const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
		saveAs(data, fileName + '_Export_' + new Date().getTime() + '.xlsx');
	}

	edit(row: any) {
		let element: HTMLElement = document.getElementById("addBanner") as HTMLElement;
		this.isModalOpen = false;
		this.changeDetector.detectChanges();
		this.modalData = row;
		this.isModalOpen = true;
		this.changeDetector.detectChanges();
		// element.click();
	}

	getBannerDetails() {
		if (this.dataLoader) {
			return;
		}
		this.dataLoader = true;

		this.adminService.getBanners().then((resp: any) => {
			if (resp.banners) {
				this.dashBoardData = resp.banners;
			}
			this.dataLoader = false;
		}, (error) => {
			this.dataLoader = false;
			this.toastService.error(error);
		});
	}

	openModal(userId: any | null) {
		console.log("openModal")
		this.selectedUserId = userId;
		this.getPdfList(userId)
		this.isModalOpen = false;
		this.modalData = {};
		this.changeDetector.detectChanges();
		this.isModalOpen = true;
		this.changeDetector.detectChanges();
	}

	getPdfList(id: any) {
		if (this.dataLoader) {
			return;
		}
		this.dataLoader = true;
		this.adminService.getForm16ForUser({ user_id: id }).then((resp: any) => {
			this.dataLoader = false;
			if (resp.details) {

				let res: any = []
				for (let data of resp.details) {
					let url_parts = data.form16Url.split('/')
					let folder_index = url_parts.indexOf('folder')
					let pdf_name = url_parts[folder_index + 1]

					res.push({
						no: data.quaterNo,
						name: pdf_name,
						url: data.form16Url
					})
				}
				console.log(res);
				this.pdfListData = res
			}
		}, (error) => {
			this.dataLoader = false;
			this.toastService.error(error);
		});
	}

}

export interface PeriodicElement {
}

const ELEMENT_DATA: PeriodicElement[] = [];