import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';


@Component({
	selector: 'app-tds-view-modal',
	templateUrl: './tds-view-modal.component.html',
	styleUrls: ['./tds-view-modal.component.css']
})
export class TdsViewModalComponent implements OnInit {

	@Input() modalData: any;
	@Output() isModalOpen: any;
	@Output() getBannerDetails: EventEmitter<any> = new EventEmitter<any>();
	@Input() pdfList: any;


	constructor(private fb: FormBuilder,
	) {
	}

	ngOnInit() {
	}

}
