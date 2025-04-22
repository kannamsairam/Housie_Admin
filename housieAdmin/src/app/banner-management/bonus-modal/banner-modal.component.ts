import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { AdminService } from 'src/app/_shared/services/admin.service';
import { AppConfig } from 'src/app/_shared/config/app.config';
import { ToastService } from 'src/app/_shared/services/toast.service';
import { UploadService } from 'src/app/_shared/services/upload.service';
import { AuthGuardService } from 'src/app/_shared/services/auth.service';

@Component({
	selector: 'app-banner-modal',
	templateUrl: './banner-modal.component.html',
	styleUrls: ['./banner-modal.component.css']
})
export class BannerModalComponent implements OnInit {

	@Input() modalData: any;
	@Output() isModalOpen: any;
	@Output() getBannerDetails: EventEmitter<any> = new EventEmitter<any>();

	bannerDeatilsFormGroup!: FormGroup;
	dataLoader: boolean;
	file!: File;
	selectFileChange=false;

	selectedFiles: any = '';
	imageSrc: any = '';
	imgReg=/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
	imgError:any=''

	constructor(private fb: FormBuilder,
		private adminService: AdminService,
		private http: HttpClient,
		private toastService: ToastService,
		private uploadService: UploadService,
		private authService: AuthGuardService
	) {

		this.dataLoader = false;
		this.createForm();
	}

	ngOnInit() {
		console.log(this.modalData);

		if (this.modalData._id) {
			console.log(this.modalData._id, 'this.modalData._id');
			this.bannerDeatilsFormGroup.get('show_status')?.patchValue(this.modalData.show_status);
			this.bannerDeatilsFormGroup.get('banner_type')?.patchValue(this.modalData.BannerType);
			this.imageSrc = this.modalData.image_name
			// this.bannerDeatilsFormGroup.get('files')?.patchValue(this.modalData[2]);
		}

	}

	createForm() {
		this.bannerDeatilsFormGroup = this.fb.group({
			files: [''],
			show_status: [true, [Validators.required]],
			banner_type: ['1', [Validators.required]]
		});
	}

	async addBanner() {
		console.log("----->", this.bannerDeatilsFormGroup)
		console.log(this.selectedFiles, '', this.imageSrc);
		console.log(await this.upload(), 'ji bala');

		await this.upload();
		if (this.dataLoader) {
			return;
		}

		this.dataLoader = true;

		let element: HTMLElement = document.getElementById("close") as HTMLElement;
		let postData = this.bannerDeatilsFormGroup.getRawValue();
		let userData = this.authService.toGetUserDetails();

		if (this.modalData._id) {
			if (this.bannerDeatilsFormGroup.invalid) {
				this.dataLoader = false;
				return;
			}

			let fd :any= {
				"image_name": this.selectFileChange ? (await this.upload()).url :this.imageSrc ,
				"show_status": postData.show_status,
				"created_by": userData.userId,
				"type":postData.banner_type
			}

			fd.banner_id=this.modalData._id
			const upload$ = this.http.post(environment.host + AppConfig.endpoints.updateBanner, fd);

			upload$.subscribe(data => {
				element.click();
				this.dataLoader = false;
				this.getBannerDetails.emit();
			});
			this.dataLoader = true;

		} else {
			if (this.bannerDeatilsFormGroup.invalid) {
				this.dataLoader = false;
				return;
			}


			let fd = {
				"image_name": (await this.upload()).url,
				"show_status": postData.show_status,
				"created_by": userData.userId,
				"type":postData.banner_type
			}

			const upload$ = this.http.post(environment.host + AppConfig.endpoints.addBanner, fd);

			upload$.subscribe(data => {
				element.click();
				this.dataLoader = false;
				this.getBannerDetails.emit();
			});
			this.dataLoader = true;
		}
	}

	fileChangeEvent(event: any) {
		this.file = event.target.files[0];
	}

	selectFile(event: any) {
		this.selectFileChange = true;
		const reader = new FileReader();

		if (!this.imgReg.test(event.target.files[0].name)) {
			this.imgError = "Allow only images";
			return;
		}
		
		if (event.target.files && event.target.files.length) {
			this.imgError = '';
			const [file] = event.target.files;
			console.log(file.name);
			reader.readAsDataURL(file);
			reader.onload = () => {
				this.imageSrc = reader.result as string;
			}
			this.selectedFiles = file;
		}
	}


	async upload() {
		// console.log(this.selectedFiles, 'upload');
		const file = this.selectedFiles;
		return await this.uploadService.uploadFile(file)
	}


	handleReaderLoaded(e: any) {
		let reader = e.target;
		let base64result = reader.result.substr(reader.result.indexOf(',') + 1);
		this.bannerDeatilsFormGroup.get('files')?.patchValue(base64result);
		console.log(base64result);
	}

	confirm() {
		if (this.dataLoader) {
			return;
		}
		let element: HTMLElement = document.getElementById("close") as HTMLElement;

		this.adminService.deleteBanner({ banner_id: this.modalData.id }).then((resp: any) => {
			element.click();
			this.getBannerDetails.emit();
			this.dataLoader = false;
		}, (error) => {
			this.dataLoader = false;
			this.toastService.error(error);
		});
	}


	get f(): { [key: string]: AbstractControl } {
		return this.bannerDeatilsFormGroup.controls;
	}

	onFileChanged(event: any) {
		if (event.target.files && event.target.files[0]) {
			let file = event.target.files[0];
			let newFile;
			let fr = new FileReader();
			fr.onload = (event: any) => {
				let base64 = event.target.result
				let img = base64.split(',')[1]
				let blob = new Blob([window.atob(img)], { type: 'image/jpeg' })
				// newFile = this.blobToFile(blob,'test')
				// this.service.upload(newFile).subscribe()
			}
			// fr.readAsDataURL(file)
			console.log(file)
			// console.log(newFile) // Either prints undefined or whatever initial value it contains

		}

	}
}
