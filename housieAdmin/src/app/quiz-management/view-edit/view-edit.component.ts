import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/_shared/services/admin.service';
import {environment} from '../../../environments/environment';
import { ToastService } from 'src/app/_shared/services/toast.service';

@Component({
  selector: 'app-view-edit',
  templateUrl: './view-edit.component.html',
  styleUrls: ['./view-edit.component.css']
})
export class ViewEditComponent implements OnInit {
  dataLoader:any
  allQuestions: any

  dashBoardData: any;
  columnTitles: any;
  viewEdit: boolean = false;
  setName: any;
  buttonType: string = '';
  questionData: any;
  setData: any;
  isModalOpen: boolean = false;
  modalData: any;
  host: string;

  collection = [];
  p = 1;
  constructor(private route:ActivatedRoute,
			  private adminService: AdminService,
			  private router: Router,
			  private changeDetector: ChangeDetectorRef,
			  private toastService: ToastService) {

	this.host = environment.serverIp;	
	this.allQuestions = [];
	this.getQuestions();
   }

  ngOnInit(): void {
   
  }

	
  getQuestions() {
		if (this.dataLoader) {
			return;
		}
		this.dataLoader = true;
		this.adminService.getQuestions(this.route.snapshot.paramMap.get('id')).then((resp: any) => {
			this.allQuestions = resp.questions;
			this.dataLoader = false;
		}, (error) => {
			this.dataLoader = false;
			this.toastService.error(error);
		});
	
	}

	openModal() {
		this.isModalOpen = false;
		this.modalData = {};
		this.buttonType = 'question'
		this.changeDetector.detectChanges();
		this.isModalOpen = true; 
		this.changeDetector.detectChanges();
	}

	passId(row: any){
		this.isModalOpen = false;
		this.changeDetector.detectChanges();
		this.isModalOpen = true;
		this.modalData = row;
		this.buttonType = 'question';
		this.changeDetector.detectChanges();
	}

	delete(id: any) {
		this.isModalOpen = false;
		this.buttonType = 'deleteQuestion';
		this.modalData = {};
		this.modalData.id = id;
		this.changeDetector.detectChanges();
		this.isModalOpen = true; 
		this.changeDetector.detectChanges();
	}
  
}
