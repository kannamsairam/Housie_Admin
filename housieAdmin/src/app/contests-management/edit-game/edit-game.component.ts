import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/_shared/services/admin.service';
import { ToastService } from 'src/app/_shared/services/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { SharedLogic } from 'src/app/core/shared-logic';
import * as moment from 'moment';

@Component({
	selector: 'app-edit-game',
	templateUrl: './edit-game.component.html',
	styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit {
	public format = 'hh:mm tt';
	public date: Date = new Date();
	time: Date = new Date();

	addGameFormGroup!: FormGroup;
	submitted = false;
	loading = false;
	isIos: boolean = false;
	minDate: any;
	maxDate: any;
	dataLoader: boolean;
	id!: String | null;

	constructor(private fb: FormBuilder,
		private adminService: AdminService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private toastService: ToastService,
		public dialog: MatDialog,
		private sharedLogic: SharedLogic
	) {

		this.dataLoader = false;
		this.minDate = new Date();
		this.maxDate = new Date();
		this.minDate.setDate(this.minDate.getDate() - 1);
		this.maxDate.setDate(this.maxDate.getDate() + 10);

		this.createForm();
	}

	ngOnInit(): void {
		// localStorage.clear();
		this.id = this.activatedRoute.snapshot.paramMap.get('id')
		console.log(this.id);

		this.adminService.getGameById({ game_id: this.id }).then((data: any) => {
			if (data.game[0]) {
				let selectdGame = data.game[0];
				console.log(selectdGame);

				Object.keys(selectdGame).map(val => {
					if (val === 'jaldiFive') {
						selectdGame[val].map((el: any, i: number) => {
							if (i > 0) this.addjaldiFive(el)
						})
					} else if (val === 'fourCorners') {
						selectdGame[val].map((el: any, i: number) => {
							if (i > 0) this.addfourCorners(el)
						})
					} else if (val === 'firstLine') {
						selectdGame[val].map((el: any, i: number) => {
							if (i > 0) this.addfirstLine(el)
						})
					} else if (val === 'secondLine') {
						selectdGame[val].map((el: any, i: number) => {
							if (i > 0) this.addsecondLine(el)
						})
					} else if (val === 'thirdLine') {
						selectdGame[val].map((el: any, i: number) => {
							if (i > 0) this.addthirdLine(el)
						})
					} else if (val === 'fullHousie') {
						selectdGame[val].map((el: any, i: number) => {
							if (i > 0) this.addfullHousie(el)
						})
					}
				})
				this.addGameFormGroup.patchValue(selectdGame)
				this.addGameFormGroup.patchValue({
					registrationStartDate: moment(selectdGame.registrationStartDate).format('DD/MM/YYYY'),
					registrationCloseTime: moment(selectdGame.registrationCloseDate).format('DD/MM/YYYY'),
					gameStartTime: moment(selectdGame.gameStartDate).format('DD/MM/YYYY')
				})

			}

		}).catch(error => {
			console.log(error)
			this.dataLoader = false;
			this.toastService.error(error);
			this.navigateTo()
		})

	}

	createForm() {
		this.addGameFormGroup = this.fb.group({
			name: ['', Validators.required],
			totalWinnings: ['', Validators.required],
			fees: ['', Validators.required],
			totalTickets: ['', Validators.required],

			jaldiPrizeAmount: ['', Validators.required],
			cornerPrizeAmount: ['', Validators.required],
			firstLinePrizeAmount: ['', Validators.required],
			secondLinePrizeAmount: ['', Validators.required],
			thirdLinePrizeAmount: ['', Validators.required],
			fullHousiePrizeAmount: ['', Validators.required],
			jaldiWinners: ['', Validators.required],
			cornerWinners: ['', Validators.required],
			firstLineWinners: ['', Validators.required],
			secondLineWinners: ['', Validators.required],
			thirdLineWinners: ['', Validators.required],
			fullHousieWinners: ['', Validators.required],

			registrationStartTime: ['', Validators.required],
			registrationStartDate: ['', Validators.required],
			registrationCloseDate: ['', Validators.required],
			registrationCloseTime: ['', Validators.required],
			gameStartDate: ['', Validators.required],
			gameStartTime: ['', Validators.required],

			multipleWinners: ['', Validators.required],

			jaldiFive: this.fb.array([this.initiateRow(null)]),
			fourCorners: this.fb.array([this.initiateRow(null)]),
			firstLine: this.fb.array([this.initiateRow(null)]),
			secondLine: this.fb.array([this.initiateRow(null)]),
			thirdLine: this.fb.array([this.initiateRow(null)]),
			fullHousie: this.fb.array([this.initiateRow(null)]),
		});
	}

	initiateRow(data: any) {
		const group = this.fb.group({
			firstCol: [data && data.firstCol ? data.firstCol : ''],
			secondCol: [data && data.secondCol ? data.secondCol : ''],
			thirdCol: [data && data.thirdCol ? data.thirdCol : '']
		});

		return group;
	}

	get f(): { [key: string]: AbstractControl } {
		return this.addGameFormGroup.controls;
	}

	get jaldiFive() {
		return this.addGameFormGroup.controls["jaldiFive"] as FormArray;
	}

	get fourCorners() {
		return this.addGameFormGroup.controls["fourCorners"] as FormArray;
	}
	get firstLine() {
		return this.addGameFormGroup.controls["firstLine"] as FormArray;
	}
	get secondLine() {
		return this.addGameFormGroup.controls["secondLine"] as FormArray;
	}
	get thirdLine() {
		return this.addGameFormGroup.controls["thirdLine"] as FormArray;
	}
	get fullHousie() {
		return this.addGameFormGroup.controls["fullHousie"] as FormArray;
	}

	addjaldiFive(data: any) {
		let control = this.addGameFormGroup.controls["jaldiFive"] as FormArray;
		control.push(this.initiateRow(data));
	}
	deletejaldiFive(index: number) {
		let control = this.addGameFormGroup.controls["jaldiFive"] as FormArray;
		control.removeAt(index);
	}

	addfourCorners(data: any) {
		let control = this.addGameFormGroup.controls["fourCorners"] as FormArray;
		control.push(this.initiateRow(data));
	}
	deletefourCorners(index: number) {
		let control = this.addGameFormGroup.controls["fourCorners"] as FormArray;
		control.removeAt(index);
	}

	addfirstLine(data: any) {
		let control = this.addGameFormGroup.controls["firstLine"] as FormArray;
		control.push(this.initiateRow(data));
	}
	deletefirstLine(index: number) {
		let control = this.addGameFormGroup.controls["firstLine"] as FormArray;
		control.removeAt(index);
	}

	addfullHousie(data: any) {
		let control = this.addGameFormGroup.controls["fullHousie"] as FormArray;
		control.push(this.initiateRow(data));
	}
	deletefullHousie(index: number) {
		let control = this.addGameFormGroup.controls["fullHousie"] as FormArray;
		control.removeAt(index);
	}

	addsecondLine(data: any) {
		let control = this.addGameFormGroup.controls["secondLine"] as FormArray;
		control.push(this.initiateRow(data));
	}
	deletesecondLine(index: number) {
		let control = this.addGameFormGroup.controls["secondLine"] as FormArray;
		control.removeAt(index);
	}

	addthirdLine(data: any) {
		let control = this.addGameFormGroup.controls["thirdLine"] as FormArray;
		control.push(this.initiateRow(data));
	}
	deletethirdLine(index: number) {
		let control = this.addGameFormGroup.controls["thirdLine"] as FormArray;
		control.removeAt(index);
	}

	navigateTo() {
		this.router.navigate(['contest-management']);
	}

	toPushFormGroups(field: string, data: any, index: number) {

	}

	toGetMinDate() {
		return this.addGameFormGroup.getRawValue().registrationStartDate || this.minDate
	}
	addGame() {
		let formData = this.addGameFormGroup.getRawValue()
		if (!this.toCheckValidOrNot(formData)) {
			this.addGameFormGroup.markAllAsTouched()
			this.toastService.error('All fields are required')
			return;
		}

		// formData.registrationStartDate= this.convert(formData.registrationStartDate,formData.registrationStartTime)

		// formData.registrationStartDate = this.convert(formData.registrationStartTime, formData.registrationStartDate)
		// formData.registrationStartTime = formData.registrationStartDate
		// formData.registrationCloseDate = this.convert(formData.registrationCloseDate, formData.registrationCloseTime)
		// formData.registrationCloseTime = formData.registrationCloseDate
		// formData.gameStartTime = formData.gameStartDate
		// console.log(this.convert(formData.gameStartDate,formData.gameStartTime))
		formData.gameStartTime =   moment(formData.gameStartTime,'DD/MM/YYYY').format() 
		formData.registrationCloseTime= moment(formData.registrationCloseTime,'DD/MM/YYYY').format() 
		formData.registrationStartDate=moment(formData.registrationStartDate,'DD/MM/YYYY').format() 
		formData.game_id = this.id;
		this.adminService.updateGame(formData).then((resp: any) => {
			console.log('====>', resp)
			this.toastService.success(resp.title, '');
			this.navigateTo()
			this.dataLoader = false;
		}, (error) => {
			console.log(error)
			this.dataLoader = false;
			this.toastService.error(error);
		});
	}

	convert(str: Date, time: Date) {
		console.log('time==', str)
		console.log('date==.', time)
		var date = new Date(time)
		console.log('the new date is ', date);
		let yy = ("0" + (date.getFullYear()))
		let mnth = ("0" + (date.getMonth() + 1)).slice(-2)
		let day = ("0" + date.getDate()).slice(-2);
		let hours = ("0" + date.getHours()).slice(-2);
		let minutes = ("0" + date.getMinutes()).slice(-2);

		var date1 = new Date(str)
		let hours1 = ("0" + date1.getHours()).slice(-2);
		let minutes1 = ("0" + date1.getMinutes()).slice(-2);
		let second = ("0" + date1.getSeconds()).slice(-2);

		console.log(`${mnth}/${day}/${yy}, ${hours}:${minutes1}`)
		// console.log([ date.getFullYear(), hours, minutes ].join("-"))
		var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
			date.getUTCHours(), date1.getUTCMinutes(), date.getUTCSeconds());
		var testdate = yy + "," + mnth + "," + day + "," + hours1 + ":" + minutes1 + ":" + second + " GMT+0530 (India Standard Time)";
		var tettt = Date.parse(testdate)
		console.log('testdate====>', testdate)

		console.log('testutc====>', tettt)
		console.log('now_utc====>', now_utc)

		// return [ date.getFullYear(), mnth, day, hours1, minutes1 ].join("-");
		// return now_utc;
		return tettt;
	}

	toCheckValidOrNot(data: any) {
		let isValid = true;
		let comp = ["jaldiFive",
			'fourCorners',
			'firstLine',
			'secondLine',
			'thirdLine',
			'fullHousie']
		Object.keys(data).map(val => {
			if (!data[val] && !(comp.includes(val)) && val !== 'multipleWinners') {
				isValid = false;
			} else if (comp.includes(val)) {
				data[val].map((el: any) => {
					Object.keys(el).map(dd => {
						if (!el[dd]) {
							console.log(el[dd]);
							isValid = false
						}
					})
				})
			}
		})

		return isValid
	}
}

@Component({
	selector: 'success',
	templateUrl: 'success.html',
})
export class success { }