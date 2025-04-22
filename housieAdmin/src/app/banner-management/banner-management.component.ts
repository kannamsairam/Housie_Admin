import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment'

import { AdminService } from '../_shared/services/admin.service';
import { ToastService } from '../_shared/services/toast.service';
import { UploadService } from '../_shared/services/upload.service';

@Component({
	selector: 'app-banner-management',
	templateUrl: './banner-management.component.html',
	styleUrls: ['./banner-management.component.css']
})
export class BannerManagement implements OnInit {

	// client: any = clients; 
	dashBoardData: any;
	columnTitles: any;
	modalData: any;
	isModalOpen: boolean = false;
	dataLoader: boolean = false;
	host: string;


	collection = [];
	p = 1;

	constructor(private router: Router,
		private changeDetector: ChangeDetectorRef,
		private adminService: AdminService,
		private toastService: ToastService,
		private uploadService:UploadService
		) {

		this.host = environment.serverIp;	
		this.columnTitles = [
			{ "column": "Banner" },
			{ "column": "Status" },
			{ "column": "Banner type" },
			{ "column": "Date" },
			{ "column": "Action" },
		]
	
		this.dashBoardData = []

	}

	ngOnInit(): void {
		this.getBannerDetails();
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

	openModal() {
		this.isModalOpen = false;
		this.modalData = {};
		this.changeDetector.detectChanges();
		this.isModalOpen = true; 
		this.changeDetector.detectChanges();
	}

	delete(id: number) {

		this.isModalOpen = false;
		this.modalData = {};
		this.modalData.id = id;
		this.modalData.type = 'delete';
		this.changeDetector.detectChanges();
		this.isModalOpen = true; 
		this.changeDetector.detectChanges();

		
	}

}
