import { Component, OnInit, } from '@angular/core';



@Component({
	selector: 'app-send-notification',
	templateUrl: './send-notification.component.html',
	styleUrls: ['./send-notification.component.css']
})
export class SendNotificationComponent implements OnInit {
	

	dashBoardData: any;
	columnTitles: any;
	p = 1;
	dataLoader: boolean;
	modalData: any;
	isModalOpen: boolean;


	form: any;
	"powers" : string[]; 
	submitted: boolean = false;
   
	onSubmit(form: any)  {
		this.submitted = true;
		this.form = form;
		console.log("form submit....");
		this.submitted = form.reset();
	  }


	constructor() {

		this.dataLoader = false;
		this.isModalOpen = false;
		this.columnTitles = [
			{ "column": "Name" },
			{ "column": "Email" },
			{ "column": "Mobile No" },
			{ "column": "Balance Wallet" },
			{ "column": "Winning Wallet" },
			{ "column": "Bonus Wallet" },
			{ "column": "Action" },
		]

		this.dashBoardData = []	;
		this.modalData = {
			'buttonType': ''
		};
	
	}

	ngOnInit(): void {
		//this.getWithdrawRequests();
	}

	openModal() {
		this.isModalOpen = false;
		//this.modalData = {};
		this.isModalOpen = true; 
	  }

}

