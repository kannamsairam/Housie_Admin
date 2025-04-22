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
	selector: 'app-tds-modal',
	templateUrl: './tds-modal.component.html',
	styleUrls: ['./tds-modal.component.css']
})
export class TdsModalComponent implements OnInit {

	@Input() modalData: any;
	@Output() isModalOpen: any;
	@Output() getBannerDetails: EventEmitter<any> = new EventEmitter<any>();
	@Input() userId: any;

	form16DeatilsFormGroup!: FormGroup;
	dataLoader: boolean;
	file!: File;
	selectFileChange = false;

	selectedFiles: any = '';
	imageSrc: any = '';
	imgReg = /\.(pdf)$/i;
	imgError: any = ''

	constructor(private fb: FormBuilder,
		private adminService: AdminService,
		private http: HttpClient,
		private toastService: ToastService,
		private uploadService: UploadService,
	) {

		this.dataLoader = false;
		this.createForm();
	}

	ngOnInit() {
		console.log(this.modalData, "modaldata");

		if (this.modalData._id) {
			console.log(this.modalData._id, 'this.modalData._id');
			this.form16DeatilsFormGroup.get('quater_no')?.patchValue(this.modalData.BannerType);
			this.imageSrc = this.modalData.form16Url
			// this.form16DeatilsFormGroup.get('files')?.patchValue(this.modalData[2]);
		}

	}

	createForm() {
		this.form16DeatilsFormGroup = this.fb.group({
			files: [''],
			quater_no: ['1', [Validators.required]]
		});
	}

	async addForm16() {
		console.log("----->", this.form16DeatilsFormGroup)
		console.log(this.selectedFiles, '', this.imageSrc);
		console.log(await this.upload(), 'ji bala');

		await this.upload();
		if (this.dataLoader) {
			return;
		}

		this.dataLoader = true;

		let element: HTMLElement = document.getElementById("close") as HTMLElement;
		let postData = this.form16DeatilsFormGroup.getRawValue();

		if (this.modalData._id) {
			if (this.form16DeatilsFormGroup.invalid) {
				this.dataLoader = false;
				return;
			}

			let fd: any = {
				"form16Url": this.selectFileChange ? (await this.upload()).url : this.imageSrc,
				"user_id": this.userId,
				"quaterNo": postData.quater_no
			}

			fd.banner_id = this.modalData._id
			const upload$ = this.http.post(environment.host + AppConfig.endpoints.uploadForm16, fd);

			upload$.subscribe(data => {
				element.click();
				this.dataLoader = false;
				//this.getBannerDetails.emit();
			});
			this.dataLoader = true;

		} else {
			if (this.form16DeatilsFormGroup.invalid) {
				this.dataLoader = false;
				return;
			}


			let fd = {
				"form16Url": (await this.upload()).url,
				"user_id": this.userId,
				"quaterNo": Number(postData.quater_no)
			}

			const upload$ = this.http.post(environment.host + AppConfig.endpoints.uploadForm16, fd);

			upload$.subscribe(data => {
				element.click();
				this.dataLoader = false;
				//this.getBannerDetails.emit();
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
			this.imgError = "Allow only PDF's";
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
		this.form16DeatilsFormGroup.get('files')?.patchValue(base64result);
		//console.log(base64result);
	}

	get f(): { [key: string]: AbstractControl } {
		return this.form16DeatilsFormGroup.controls;
	}

	onFileChanged(event: any) {
		if (event.target.files && event.target.files[0]) {
			let file = event.target.files[0];
			let newFile;
			let fr = new FileReader();
			fr.onload = (event: any) => {
				let base64 = event.target.result
				let img = base64.split(',')[1]
				let blob = new Blob([window.atob(img)], { type: 'application/pdf' })
				// newFile = this.blobToFile(blob,'test')
				// this.service.upload(newFile).subscribe()
			}
			// fr.readAsDataURL(file)
			console.log(file)
			// console.log(newFile) // Either prints undefined or whatever initial value it contains

		}

	}
}
