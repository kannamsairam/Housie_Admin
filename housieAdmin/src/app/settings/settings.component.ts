import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { AppConfig } from 'src/app/_shared/config/app.config';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

	uploadFileFormGroup!: FormGroup;
	submitted = false;
	loading = false;
	isIos: boolean = false;
	file!: File;

	constructor(private fb: FormBuilder,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private http: HttpClient) {

		activatedRoute.queryParams.subscribe(params => {
			console.log('queryParams', params['plateform'])
			if (params['plateform'] == 'ios') {
				this.isIos = true;
			} else {
				this.isIos = false;
			}
			// this.file = ''
		});
		this.createForm();
	}

	ngOnInit(): void {
		// localStorage.clear();
	}

	createForm() {
		this.uploadFileFormGroup = this.fb.group({
			file: ['', Validators.required]
		});
	}

	onFileChanged(event:any){
		this.file  = event.target.files[0];
		console.log('ldkkjk');
		
	}

	uploadFile() {
		let fileName = this.file.name;

		const fd = new FormData();

		fd.append("files", this.file);
		
		if(this.isIos) {
			const upload$ = this.http.post(environment.host + AppConfig.endpoints.uploadAppIOS, fd);
			upload$.subscribe(data => {
				console.log("daaaaaaaaaaaa", data)
				this.loading = false;
			});
		} else {
			const upload$ = this.http.post(environment.host + AppConfig.endpoints.uploadAppAndroid, fd);
			upload$.subscribe(data => {
				console.log("daaaaaaaaaaaa", data)
				this.loading = false;
			});
		}
	}
}
