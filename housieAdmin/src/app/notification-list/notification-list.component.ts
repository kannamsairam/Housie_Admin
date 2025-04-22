import { ChangeDetectorRef, Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AdminService } from '../_shared/services/admin.service';
import { ToastService } from '../_shared/services/toast.service';
import { UploadService } from '../_shared/services/upload.service';



@Component({
	selector: 'app-notification-list',
	templateUrl: './notification-list.component.html',
	styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

	// client: any = clients; 
	notificationData: any = []
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
		private uploadService: UploadService
	) {

		this.host = environment.serverIp;
		this.columnTitles = [
			{ "column": "S.No" },
			{ "column": "Image" },
			{ "column": "Title" },
			{ "column": "Description" },
			{ "column": "Action" },
		]

		this.notificationData = []

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
		this.adminService.getNotification().then((resp: any) => {
			if (resp.details) {
				this.notificationData = resp.details;
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

	onSendNotification(notId: any) {
		this.adminService.sendPushNotification({ id: notId }).then((resp: any) => {
			if (!resp.error) {
				this.toastService.success(resp?.title || "", '')
			}
		}, (error) => {
			this.toastService.error(error);
		});

	}


}
