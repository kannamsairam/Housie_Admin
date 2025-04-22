import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef, EventEmitter, Output, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/_shared/config/app.config';
import { AdminService } from 'src/app/_shared/services/admin.service';
import { AuthGuardService } from 'src/app/_shared/services/auth.service';
import { ToastService } from 'src/app/_shared/services/toast.service';
import { UploadService } from 'src/app/_shared/services/upload.service';
import { environment } from 'src/environments/environment';
// import {environment} from '../../environments/environment'


@Component({
  selector: 'app-notification-model',
  templateUrl: './notification-model.component.html',
  styleUrls: ['./notification-model.component.css']
})
export class NotificationModelComponent implements OnInit {

  @Input() modalData: any;
  @Output() isModalOpen: any;
  @Output() getBannerDetails: EventEmitter<any> = new EventEmitter<any>();

  notificationFormGroup!: FormGroup;
  dataLoader: boolean;
  file!: File;

  selectedFiles: any = '';
  imageSrc: any = ''
  selectFileChange = false;
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
      this.notificationFormGroup?.patchValue(this.modalData);
      this.imageSrc = this.modalData.image_name
      // this.notificationFormGroup.get('files')?.patchValue(this.modalData[2]);
    }

  }

  createForm() {
    this.notificationFormGroup = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }



  /**
* it checks the form valid or invalid
* @param val the val is formcotrol of individual forms
*/
  formFieldValidator(val: string) {
    return (this.notificationFormGroup.get(val)?.invalid && (this.notificationFormGroup.get(val)?.dirty || this.notificationFormGroup.get(val)?.touched));
  }


  /**
 * it checks the form has errors or not
 * @param val the val gets formcotrol of individual forms
 */
  formFieldErrors(val: string) {
    return this.notificationFormGroup.get(val)?.errors;
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

  confirm() {
    if (this.dataLoader) {
      return;
    }
    let element: HTMLElement = document.getElementById("close") as HTMLElement;

    this.adminService.deleteNotification({ notification_id: this.modalData.id }).then((resp: any) => {
      element.click();
      this.getBannerDetails.emit();
      this.dataLoader = false;
      // title
    }, (error) => {
      this.dataLoader = false;
      this.toastService.error(error);
    });
  }


  get f(): { [key: string]: AbstractControl } {
    return this.notificationFormGroup.controls;
  }


  async addNotification() {
    if (this.dataLoader) {
      return;
    }
    this.dataLoader = true;
    let postData = this.notificationFormGroup.getRawValue();
    let userData = this.authService.toGetUserDetails();
    // console.log({ userData });
    postData.created_by = userData.userId;
    let element: HTMLElement = document.getElementById("close") as HTMLElement;
    postData.image_name = this.selectFileChange ? (await this.upload()).url : this.imageSrc;
    if (this.modalData._id) {
      postData.notification_id = this.modalData._id;
      console.log(postData);

      this.adminService.updateNotification(postData).then((resp: any) => {
        this.modalData = {};
        element.click();
        this.getBannerDetails.emit();
        this.dataLoader = false;
      }, (error) => {
        this.dataLoader = false;
        this.toastService.error(error);
      });
    } else {
      this.adminService.addNotification(postData).then((resp: any) => {
        element.click();
        this.getBannerDetails.emit();
        this.dataLoader = false;
      }, (error) => {
        this.dataLoader = false;
        this.toastService.error(error);
      });
    }
  }


  async upload() {
    // console.log(this.selectedFiles, 'upload');
    const file = this.selectedFiles;
    return await this.uploadService.uploadFile(file)
  }

}
