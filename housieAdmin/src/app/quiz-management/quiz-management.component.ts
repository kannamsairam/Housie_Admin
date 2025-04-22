import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { AdminService } from '../_shared/services/admin.service';
import { ToastService } from '../_shared/services/toast.service';

@Component({
	selector: 'app-quiz-management',
	templateUrl: './quiz-management.component.html',
	styleUrls: ['./quiz-management.component.css']
})
export class QuzeManagement implements OnInit {

	// client: any = clients; 
	dashBoardData: any;
	columnTitles: any;
	viewEdit: boolean = false;
	setName: any;
	buttonType: string = '';
	questionData: any;
	setData: any;
	isModalOpen: boolean = false;
	modalData: any;
	dataLoader: boolean;

	collection = [];
	p = 1;

	constructor(private router: Router,
				private changeDetector: ChangeDetectorRef,
				private adminService: AdminService,
				private toastService: ToastService) {

		this.dataLoader = false;
		this.modalData = {};

		this.columnTitles = [
			{ "column": "Set Name" },
			{ "column": "Create Date"},
			{ "column": "Action" },
		]

		this.dashBoardData = []
		
		this.setData = []

		this.questionData = []

	}

	ngOnInit(): void {
		this.getQuiz();
	}

	
	getQuiz() {
		if (this.dataLoader) {
			return;
		}
		this.dataLoader = true;

		this.adminService.getSet().then((resp: any) => {
			if(resp.details) {
				this.dashBoardData = resp.details;
			}
			this.dataLoader = false;
		}, (error) => {
			this.dataLoader = false;
			this.toastService.error(error);
		});
	}



	buttonClickedInChild(valueEmitted: any){
		let clickedButton = valueEmitted;
		console.log(clickedButton, 'clickedButton');
		this.isModalOpen = false;
		if(clickedButton.buttonName == 'ViewEdit') {
			this.viewEdit = true;
			this.setName = this.dashBoardData[clickedButton.index][0];
			this.columnTitles = [
				{ "column": "Image" },
				{ "column": "Question" },
				{ "column": "Options 1" },
				{ "column": "Options 2" },
				{ "column": "Answer" },
				{ "column": "Action" },
			]

			this.dashBoardData = this.questionData;
			
		} else if(valueEmitted.buttonName == "Edit") {
			let element: HTMLElement = document.getElementById("addQuestion") as HTMLElement;

			this.isModalOpen = false;
			this.changeDetector.detectChanges();
    		this.isModalOpen = true; 
			this.buttonType = 'question';
			this.modalData = this.dashBoardData[valueEmitted.index];
			this.changeDetector.detectChanges();
			element.click();
			
		}
		
	}

	navigateTo() {
		if(this.viewEdit) {
			this.columnTitles = [
				{ "column": "Image" },
				{ "column": "Question" },
				{ "column": "Options 1" },
				{ "column": "Options 2" },
				{ "column": "Answer" },
				{ "column": "Action" },
			]

			this.dashBoardData = this.questionData;
		} else {
			this.columnTitles = [
				{ "column": "Set Name" },
				{ "column": "Create Date"},
				{ "column": "Action" },
			]
			this.dashBoardData = this.setData;
		}
	}

	passId(id:any){
		this.router.navigate([`/ViewEdit`,id]);
	}
	
	delete(id:any){
		this.isModalOpen = false;
		this.buttonType = 'delete';
		this.modalData = {};
		this.modalData.id = id;
		this.changeDetector.detectChanges();
		this.isModalOpen = true; 
		this.changeDetector.detectChanges();
	}

}
