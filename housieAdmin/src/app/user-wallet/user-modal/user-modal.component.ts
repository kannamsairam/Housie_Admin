import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

// import { AdminService } from 'src/app/_shared/services/admin.service';
// import { ToastService } from 'src/app/_shared/services/toast.service';

@Component({
	selector: 'app-user-modal',
	templateUrl: './user-modal.component.html',
	styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {


	name1 = '400';
	name2 = '300';
	name3 = '200';

	form: any;
	"powers" : string[]; 
	submitted: boolean = false;
   
	onSubmit(form: any)  {
		this.submitted = true;
		this.form = form;
		console.log("form submit....");
		this.submitted = form.reset();
	  }




	@Input() modalData: any;
	@Output() isModalOpen: any;
	@Output() getWithdrawRequests: EventEmitter<any> = new EventEmitter<any>();

	withDrawnReqFormGroup!: FormGroup;

	title: any;

	constructor(private fb: FormBuilder) {

	}

	ngOnInit(): void {
	}
	
	}



