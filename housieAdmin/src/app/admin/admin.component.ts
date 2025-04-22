import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../_shared/services/admin.service';
import { ToastService } from '../_shared/services/toast.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  // client: any = clients; 
  dashBoardData: any;
  columnTitles: any;
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
      { "column": "Name" },
      { "column": "Email"},
      { "column": "Mobile"},
      { "column": "Date" },
      { "column": "Action" },
    ]

    this.dashBoardData = [] 

  }

  ngOnInit(): void {
    this.getAdmin();
  }

  getAdmin() {
    if (this.dataLoader) {
      return;
    }
    this.dataLoader = true;

    this.adminService.getAdmin().then((resp: any) => {
      if(resp.details.length != 0 && !resp.error ) {
        this.dashBoardData = resp.details;
      } 

      this.dataLoader = false;
    }, (error) => {
      this.dataLoader = false;
		  this.toastService.error(error);
    });
  }

  openModal() {
    this.isModalOpen = false;
    this.modalData = {};
    this.changeDetector.detectChanges();
    this.isModalOpen = true; 
    this.changeDetector.detectChanges();
  }

  edit(row: any){
    this.isModalOpen = false;
    this.changeDetector.detectChanges();
    this.isModalOpen = true; 
    this.modalData = row;
    this.changeDetector.detectChanges();
    // element.click(); 
    console.log(this.modalData);
  }

  deleteAdmin(row: any) {
    this.isModalOpen = false;
    this.modalData = {};
    this.modalData.id = row._id;
    this.changeDetector.detectChanges();
    this.isModalOpen = true; 
    this.changeDetector.detectChanges();
  }

}
