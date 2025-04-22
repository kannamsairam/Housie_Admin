import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { AdminService } from 'src/app/_shared/services/admin.service';
import { UploadService } from 'src/app/_shared/services/upload.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { environment } from 'src/environments/environment';
import { AppConfig } from 'src/app/_shared/config/app.config';
import { ToastService } from 'src/app/_shared/services/toast.service';

@Component({
	selector: 'app-quiz-modal',
	templateUrl: './quiz-modal.component.html',
	styleUrls: ['./quiz-modal.component.css']
})
export class QuizModalComponent implements OnInit {
	@Input() modalData: any;
	@Output() isModalOpen: any;
	@Input() buttonType: any;
	@Output() getQuiz: EventEmitter<any> = new EventEmitter<any>();

	quizDeatilsFormGroup!: FormGroup;
	dataLoader: boolean;
	fileName: any;
	file!: File;
	setId: any;

	selectFileChange = false;

	selectedFiles: any = '';
	imageSrc: any = ''

	constructor(private fb: FormBuilder,
		private adminService: AdminService,
		private uploadService: UploadService,
		private http: HttpClient,
		private route: ActivatedRoute,
		private toastService: ToastService
	) {

		this.dataLoader = false;
		this.fileName = {};
		this.setId = this.route.snapshot.paramMap.get('id');
	}

	ngOnInit(): void {
		console.log(this.modalData, 'this.buttonType');

		if (this.buttonType == 'set') {
			this.createQSetForm();
		} else {
			this.createQuestionForm();
		}

		if (this.modalData._id) {
			this.quizDeatilsFormGroup.get('questionDetails')?.get('question')?.patchValue(this.modalData.question);
			this.quizDeatilsFormGroup.get('questionDetails')?.get('option_1')?.patchValue(this.modalData.option_1);
			this.quizDeatilsFormGroup.get('questionDetails')?.get('option_2')?.patchValue(this.modalData.option_2);
			this.quizDeatilsFormGroup.get('questionDetails')?.get('answer')?.patchValue(this.modalData.answer);
			this.imageSrc = this.modalData.image_name
			// this.quizDeatilsFormGroup.get('bannerImage')?.patchValue(this.modalData[2]);
		} else if (this.buttonType == 'question') {
			console.log('hhhhhh');

			this.quizDeatilsFormGroup.get('questionDetails')?.get('answer')?.patchValue('1');
		}
	}

	createQSetForm() {
		this.quizDeatilsFormGroup = this.fb.group({
			name: ['', Validators.required],
			// bonusAmount: ['', [Validators.required]],

		});
	}

	createQuestionForm() {
		this.quizDeatilsFormGroup = this.fb.group({
			questionSet: this.fb.array([]),
			questionDetails: this.inItQuestionSet(null)
		})
		console.log(this.quizDeatilsFormGroup.controls, 'this.quizDeatilsFormGroup.controls');

	}



	questionList(collection: any) {
		const controls = <FormArray>this.quizDeatilsFormGroup.get('questionSet');

		if (collection && collection.length > 0) {
			collection.map((data: any) => {
				controls.push(this.inItQuestionSet(data));
			});
		}
	}

	inItQuestionSet(data: any) {
		const group = this.fb.group({
			question: ['', Validators.required],
			option_1: ['', Validators.required],
			option_2: ['', Validators.required],
			answer: ["1", Validators.required],
			image: ['']
		});
		return group;
	}

	get f(): { [key: string]: AbstractControl } {
		return this.quizDeatilsFormGroup.controls;
	}

	addSet() {
		console.log("this.dataLoader", this.quizDeatilsFormGroup.getRawValue())
		if (this.dataLoader) {
			return;
		}
		this.dataLoader = true;
		let postData = this.quizDeatilsFormGroup.getRawValue();

		let element: HTMLElement = document.getElementById("close") as HTMLElement;

		if (this.modalData._id) {
			postData.bonus_id = this.modalData._id;
			console.log('postData', postData);

			this.adminService.updateQuiz(postData).then((resp: any) => {
				this.modalData = {};
				element.click();
				this.dataLoader = false;
				this.getQuiz.emit();
			}, (error) => {
				this.dataLoader = false;
				this.toastService.error(error);
			});
		} else {
			this.adminService.addSet(postData).then((resp: any) => {
				element.click();
				this.dataLoader = false;
				this.getQuiz.emit();
			}, (error) => {
				this.dataLoader = false;
				this.toastService.error(error);
			});
		}
	}

	// selectFile(event: any) {
	// 	this.file = event.target.files[0];
	// }

	async addQuestion() {
		let element: HTMLElement = document.getElementById("close") as HTMLElement;
		let postData = this.quizDeatilsFormGroup.getRawValue();
		delete postData.questionSet;
		postData = postData.questionDetails;
		delete postData.image;

		postData.set_id = this.setId

		postData.image_name = this.selectFileChange ? (await this.upload()).url : this.imageSrc;
		if (this.quizDeatilsFormGroup.invalid || !postData.image_name) {
			this.quizDeatilsFormGroup.markAllAsTouched();
			return;
		}
		if (this.modalData._id) {
			postData.question_id = this.modalData._id;
			const upload$ = this.http.post(environment.host + AppConfig.endpoints.updateQuestion, postData);
			upload$.subscribe(data => {
				console.log("daaaaaaaaaaaa", data)
				element.click();
				this.dataLoader = false;
				this.getQuiz.emit();
			});
		} else {
			const upload$ = this.http.post(environment.host + AppConfig.endpoints.addQuestion, postData);

			upload$.subscribe(data => {
				console.log("daaaaaaaaaaaa", data)
				element.click();
				this.dataLoader = false;
				this.getQuiz.emit();
			});
		}
		this.dataLoader = true;
	}

	confirm() {
		let element: HTMLElement = document.getElementById("close") as HTMLElement;
		if (this.buttonType == 'delete') {
			this.adminService.deleteSet(this.modalData.id).then((resp: any) => {
				this.modalData = {};
				element.click();
				this.getQuiz.emit();
			}, (error) => {
				this.toastService.error(error);
			});
		} else {
			this.adminService.deleteQuestion({ set_id: this.route.snapshot.paramMap.get('id'), question_id: this.modalData.id }).then((resp: any) => {
				this.modalData = {};
				element.click();
				this.getQuiz.emit();
			}, (error) => {
				this.toastService.error(error);
			});
		}
	}

	selectFile(event: any) {
		this.selectFileChange = true;
		const reader = new FileReader();
		if (event.target.files && event.target.files.length) {
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

}
