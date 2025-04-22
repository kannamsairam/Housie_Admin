import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/_shared/services/admin.service';
import { ToastService } from 'src/app/_shared/services/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';
import * as moment from 'moment';
@Component({
	selector: 'app-add-game',
	templateUrl: './add-game.component.html',
	styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

	//date-time picker variables
	public showSpinners = false;
	public showSeconds = false;
	public touchUi = false;
	public stepHour = 1;
	public stepMinute = 1;
	public stepSecond = 1;
	public enableMeridian = false;
	public color: ThemePalette = 'primary';
	public minDate = moment();
	public defaultTime = [new Date().getHours(), new Date().getMinutes() , 0] 
	numericNumberReg = /^[0-9]+$/;

	public format = 'hh:mm tt';
	public date: Date = new Date();
	time: Date = new Date();

	public addGameFormGroup!: FormGroup;
	submitted = false;
	loading = false;
	isIos: boolean = false;
	// minDate: any;

	maxDate: any;
	dataLoader: boolean;

	dynamicFieldsErr: any = {}
	nowDate: any = new Date();
	toggleValidation: boolean = false;

	constructor(private fb: FormBuilder,
		private adminService: AdminService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private toastService: ToastService,
		public dialog: MatDialog,
		private elementRef: ElementRef) {

		this.dataLoader = false;
		// this.minDate = new Date();
		// this.maxDate = new Date();
		// this.minDate.setDate(this.minDate.getDate() - 1);
		// this.maxDate.setDate(this.maxDate.getDate() + 10);

		this.createForm();
		this.handleConformationBonusamountChange();
	}
	id: any;
	fee:any;
	min:any=1;
	isDisable:boolean=false;
	isTotalWinnings:boolean=true;
	ngOnInit(): void {
		// localStorage.clear();
		// localStorage.clear();
		this.nowDate.setSeconds(0o0);
		this.fee=0;
		this.id = this.activatedRoute.snapshot.paramMap.get('id')
		if (!this.id) return;
		this.adminService.getGameById({ game_id: this.id }).then((data: any) => {
			if (data.game[0]) {
				data.game[0].isGameType == "free" ? (this.toggleValidation = true, this.isTotalWinnings = false) : (this.toggleValidation = false, this.isTotalWinnings = true)
				this.onToggleChange()
				this.isDisable = true; 
				let selectdGame = data.game[0];
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
					totalWinnings: Number(selectdGame.totalWinnings),
					fees: String(selectdGame.fees),
					gameStartTime: moment(selectdGame.gameStartDate).format('DD/MM/YYYY'),
					bonusPercentage:String(selectdGame.bonusPercentage)
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
			totalWinnings: ['', [Validators.required, Validators.pattern(this.numericNumberReg), Validators.min(1)]],
			fees: ['', [Validators.required, Validators.pattern(this.numericNumberReg), Validators.min(1)]],
			totalTickets: ['', [Validators.required, Validators.pattern(this.numericNumberReg), Validators.min(1)]],

			jaldiPrizeAmount: ['', [Validators.required, Validators.pattern(this.numericNumberReg), Validators.min(1)]],
			cornerPrizeAmount: ['', [Validators.required, Validators.pattern(this.numericNumberReg), Validators.min(1)]],
			firstLinePrizeAmount: ['', [Validators.required, Validators.pattern(this.numericNumberReg), Validators.min(1)]],
			secondLinePrizeAmount: ['', [Validators.required, Validators.pattern(this.numericNumberReg), Validators.min(1)]],
			thirdLinePrizeAmount: ['', [Validators.required, Validators.pattern(this.numericNumberReg), Validators.min(1)]],
			fullHousiePrizeAmount: ['', [Validators.required, Validators.pattern(this.numericNumberReg), Validators.min(1)]],

			jaldiWinners: ['', [Validators.required, Validators.pattern(this.numericNumberReg), Validators.min(1)]],
			cornerWinners: ['', [Validators.required, Validators.pattern(this.numericNumberReg), Validators.min(1)]],
			firstLineWinners: ['', [Validators.required, Validators.pattern(this.numericNumberReg), Validators.min(1)]],
			secondLineWinners: ['', [Validators.required, Validators.pattern(this.numericNumberReg), Validators.min(1)]],
			thirdLineWinners: ['', [Validators.required, Validators.pattern(this.numericNumberReg), Validators.min(1)]],
			fullHousieWinners: ['', [Validators.required, Validators.pattern(this.numericNumberReg), Validators.min(1)]],

			registrationStartDateTime: ['', Validators.required],
			registrationCloseDateTime: ['', Validators.required],
			gameStartDateTime: ['', Validators.required],

			bonusPercentage: [{value: '', disabled: true}, [Validators.required,Validators.pattern(this.numericNumberReg), Validators.min(0)]],
			ConformationBonusamount:['', Validators.required],
			conformationLeague: ['', Validators.required],
			multipleEntry: ['', Validators.required],
			// registrationStartTime: ['', Validators.required],
			// registrationStartDate: ['', Validators.required],
			// registrationCloseDate: ['', Validators.required],
			// registrationCloseTime: ['', Validators.required],
			// gameStartDate: ['', Validators.required],
			// gameStartTime: ['', Validators.required],

			multipleWinners: [''],

			jaldiFive: this.fb.array([this.initiateRow(null)]),
			fourCorners: this.fb.array([this.initiateRow(null)]),
			firstLine: this.fb.array([this.initiateRow(null)]),
			secondLine: this.fb.array([this.initiateRow(null)]),
			thirdLine: this.fb.array([this.initiateRow(null)]),
			fullHousie: this.fb.array([this.initiateRow(null)]),
		});

		this.addGameFormGroup.addValidators(matchValidator(this.addGameFormGroup.get('fees'), this.addGameFormGroup.get('totalTickets'), this.addGameFormGroup.get('totalWinnings')))
		this.addGameFormGroup.addValidators(toCheckTotalAmount(this.addGameFormGroup));
		this.addGameFormGroup.patchValue({
			bonusPercentage: "0"
		})
	}


	onToggleChange() {
		console.log(this.toggleValidation, "toggleValidation")
		const inputField = this.elementRef.nativeElement.querySelector('#fees');
		let totalKeys = [
			'jaldiPrizeAmount',
			'cornerPrizeAmount',
			'firstLinePrizeAmount',
			'secondLinePrizeAmount',
			'thirdLinePrizeAmount',
			'fullHousiePrizeAmount',
		]
		if (this.toggleValidation) {
			totalKeys.forEach(val => {
				this.addGameFormGroup.get(val)?.setValidators([Validators.required, Validators.pattern(this.numericNumberReg), Validators.min(0)]);
			})

			this.addGameFormGroup.get('fees')?.clearValidators();
			inputField.setAttribute('readonly', 'readonly');
			this.isTotalWinnings=false;
			this.addGameFormGroup.patchValue({
				fees: "0"
			})
			this.addGameFormGroup.get('totalWinnings')?.setValidators([Validators.required, Validators.pattern(this.numericNumberReg), Validators.min(0)]);
			this.min = 0;
		} else {
			totalKeys.forEach(val => {
				this.addGameFormGroup.get(val)?.setValidators([Validators.required, Validators.pattern(this.numericNumberReg), Validators.min(1)]);
			})
			this.addGameFormGroup.get('fees')?.setValidators([Validators.required, Validators.pattern(this.numericNumberReg), Validators.min(1)]);
			this.addGameFormGroup.patchValue({
				fees: ""
			})
			inputField.removeAttribute('readonly');
			this.isTotalWinnings=true;
			this.addGameFormGroup.get('totalWinnings')?.setValidators([Validators.required, Validators.pattern(this.numericNumberReg), Validators.min(1)]);
			this.min = 1;
		}

		let amountKeys = [
			'jaldiFive',
			'fourCorners',
			'firstLine',
			'secondLine',
			'thirdLine',
			'fullHousie',
		]

		amountKeys.forEach((val) => {
			const control = <FormArray>this.addGameFormGroup.controls[val];
			control.push(this.initiateRow(null));

			for (let i = 0; i <= control.value.length - 1; i++) {
				control.removeAt(0);
			}
		})


		// update the validation status
		totalKeys.forEach(val => {
			this.addGameFormGroup.get(val)?.updateValueAndValidity();
		})
		this.addGameFormGroup.get('fees')?.updateValueAndValidity();
		this.addGameFormGroup.get('totalWinnings')?.updateValueAndValidity();
	}

	initiateRow(data: any) {
		const group = this.fb.group({
			firstCol: [data && data.firstCol ? data.firstCol : '', [Validators.required, Validators.pattern(this.numericNumberReg), Validators.min(1)]],
			secondCol: [data && data.secondCol ? data.secondCol : '', [Validators.required, Validators.pattern(this.numericNumberReg), Validators.min(1)]],
			thirdCol: [data && data.thirdCol ? data.thirdCol : '', [Validators.required, Validators.pattern(this.numericNumberReg), Validators.min(this.min)]]
		});

		return group;
	}

	get f(): { [key: string]: AbstractControl } {
		return this.addGameFormGroup.controls;
	}
	handleConformationBonusamountChange() {
		this.addGameFormGroup.get('ConformationBonusamount')?.valueChanges.subscribe(value => {
		  const bonusControl = this.addGameFormGroup.get('bonusPercentage');
		  if (value) {
			bonusControl?.enable();
		  } else {
			bonusControl?.disable();
			this.addGameFormGroup.patchValue({
                bonusPercentage: "0"
            });
		  }
		  bonusControl?.updateValueAndValidity();
		});
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

	addDynValidation(fieldArray: any, index: any, field: any) {
		return (this.addGameFormGroup.get(fieldArray) as FormArray).at(index).get(field) || null
	}

	toChecktouchedOrNot(data: any) {
		if (data)
			return data.errors && data.dirty || data.touched
		else
			return false
	}

	toCheckReq(data: any) {
		if (data?.errors?.['required'])
			return true
		else
			return false
	}

	toCheckMin(data: any) {
		if (data?.errors?.['min'])
			return true
		else
			return false
	}

	toCheckPattern(data: any) {
		if (data?.errors?.['pattern'])
			return true
		else
			return false
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

	addGame() {
		// 	console.log(`scrolling to fees`);
		// let el:HTMLElement = document.getElementById('fees') as HTMLElement;
		// el.scrollIntoView();
		let formData = this.addGameFormGroup.getRawValue()
		this.dataLoader = true;

		Object.keys(this.dynamicFieldsErr).map((val: any) => {
			this.dynamicFieldsErr[val] = ''
		})
		this.toValidateDynamicFileds(formData)
		let dynErr = false;
		Object.values(this.dynamicFieldsErr).map(val => { if (!!val) dynErr = true })
		this.toggleValidation ? formData.isGameType = "free" : formData.isGameType = "paid"
		
		if (!this.toCheckValidOrNot(formData) || this.addGameFormGroup.invalid || dynErr) {
			this.addGameFormGroup.markAllAsTouched()
			// this.toastService.error('All fields are required')
			this.toastService.error('given details are incorrect')
			return;
		}


		if (this.id) {
		// formData.isGameType = "free" ? this.toggleValidation = true : this.toggleValidation = false
			formData.game_id = this.id;
			this.adminService.updateGame(formData).then((resp: any) => {
				this.toastService.success(resp.title, '');
				this.navigateTo()
				this.dataLoader = false;
			}, (error) => {
				console.log(error)
				this.dataLoader = false;
				this.toastService.error(error);
			});
		} else {
			localStorage.setItem("tabIndex", JSON.stringify(1))
			this.adminService.addGame(formData).then((resp: any) => {
				if (resp.error === false) {
					// this.addGameFormGroup.reset()
					this.toastService.success(resp.title, '');
					this.navigateTo();

				}
				this.dataLoader = false;
			}, (error) => {
				console.log(error)
				this.dataLoader = false;
				this.toastService.error(error);
			});
		}

	}

	toGetMinDate() {
		return this.addGameFormGroup.getRawValue().registrationStartDate || this.minDate
	}

	toCheckValidOrNot(data: any) {
		let isValid = true;
		let comp = ["jaldiFive",
			'fourCorners',
			'firstLine',
			'secondLine',
			'thirdLine',
			'fullHousie']

		let constNot = [
			'multipleWinners',
			'ConformationBonusamount',
			'conformationLeague',
			"multipleEntry",
			"multipleWinners"

		]

		if(this.toggleValidation){
			return isValid;
		}

		Object.keys(data).map(val => {
			if (!data[val] && !(comp.includes(val)) && !(constNot.includes(val))) {
				isValid = false;
			} else if (comp.includes(val)) {
				data[val].map((el: any) => {
					Object.keys(el).map(dd => {
						if (!el[dd]) {
							isValid = el[dd] == 0 ? true : false
						}
					})
				})
			}
		})

		return isValid
	}

	ammountChange(event: any) {
		let finalValue: any = 0
		let formData = this.addGameFormGroup.getRawValue()
		let { fees, totalTickets } = formData
		fees = fees.toString();
		totalTickets = totalTickets.toString();
		if (fees && fees.match(this.numericNumberReg) && totalTickets && totalTickets.match(this.numericNumberReg)) {
			finalValue = formData.fees * formData.totalTickets;
			finalValue = 80 / 100 * (finalValue)
			this.addGameFormGroup.patchValue({ totalWinnings: Math.round(finalValue) });
		}
	}

	toCheckMInDate(val: String) {
		let formData = this.addGameFormGroup.getRawValue();
		if (val == 'registerClose' && formData?.registrationStartDateTime) {
			return this.AddMinutesToDate(formData?.registrationStartDateTime, 5)
		} else if (val == 'gameStart' && formData?.registrationCloseDateTime) {
			return this.AddMinutesToDate(formData.registrationCloseDateTime, 5)
		} else {
			this.nowDate.setSeconds(0o0)
			return this.nowDate;
		}

	}

	AddMinutesToDate(date: any, minutes: any) {
		let t = new Date(new Date(date).getTime() + minutes * 60000);
		t.setSeconds(0o0);
		return t;
	}

	toCheckAmmountVal() {
		let totalKeys = [
			'jaldiPrizeAmount',
			'cornerPrizeAmount',
			'firstLinePrizeAmount',
			'secondLinePrizeAmount',
			'thirdLinePrizeAmount',
			'fullHousiePrizeAmount',
		]
		let finalVal: any = false;
		totalKeys.forEach(val => {
			finalVal = this.addGameFormGroup.get(val)?.touched || this.addGameFormGroup.get(val)?.dirty;
		})
		return finalVal
	}

	toCheckCountVal() {
		let winnersKey = [
			'jaldiWinners',
			'cornerWinners',
			'firstLineWinners',
			'secondLineWinners',
			'thirdLineWinners',
			'fullHousieWinners',
		]
		let finalVal: any = false;
		winnersKey.forEach(val => {
			finalVal = this.addGameFormGroup.get(val)?.touched || this.addGameFormGroup.get(val)?.dirty;
		})
		// console.log({finalVal,data:this.addGameFormGroup.errors});
		return finalVal
	}


	toValidateDynamicFileds(formData: any) {
		Object.keys(formData).forEach(val => {
			if (val === 'jaldiFive') {
				this.toReturnTicketAmmCount(formData[val], formData['jaldiWinners'], formData['jaldiPrizeAmount'], 'jaldiFive')
			} else if (val === 'firstLine') {
				this.toReturnTicketAmmCount(formData[val], formData['firstLineWinners'], formData['firstLinePrizeAmount'], 'firstLine')
			} else if (val === 'fourCorners') {
				this.toReturnTicketAmmCount(formData[val], formData['cornerWinners'], formData['cornerPrizeAmount'], 'fourCorners')
			} else if (val === 'fullHousie') {
				this.toReturnTicketAmmCount(formData[val], formData['fullHousieWinners'], formData['fullHousiePrizeAmount'], 'fullHousie')
			} else if (val === 'secondLine') {
				this.toReturnTicketAmmCount(formData[val], formData['secondLineWinners'], formData['secondLinePrizeAmount'], 'secondLine')
			}
			else if (val === 'thirdLine') {
				this.toReturnTicketAmmCount(formData[val], formData['thirdLineWinners'], formData['thirdLinePrizeAmount'], 'thirdLine')
			}

		})

	}

	toReturnTicketAmmCount(groupAry: any, winners: String, ammount: String, errName: any) {
		let ticketCount = 0;
		let TotalAmm = 0;
		if (!!winners) {
			groupAry.map((val: any) => {
				let tickCoun: any = 0
				if (!!val.firstCol && !!val.secondCol || val.firstCol == 0 || val.secondCol == 0) {
					tickCoun = (Number(val.secondCol) - Number(val.firstCol)) + 1
					ticketCount += tickCoun
					if (!!val.thirdCol || val.thirdCol == 0) {
						TotalAmm += tickCoun * Number(val.thirdCol)
					}
				}
			})
		}

		if (ticketCount !== Number(winners)) {
			if (this.dynamicFieldsErr[errName]) {
				this.dynamicFieldsErr[errName] += " " + 'and' + " " + errName + " " + 'tickets count not match'
			} else {
				this.dynamicFieldsErr[errName] = errName + ' ' + 'tickets count not match'
			}
		}
		if (TotalAmm !== Number(ammount)) {
			if (this.dynamicFieldsErr[errName]) {
				this.dynamicFieldsErr[errName] += " " + 'and' + " " + errName + " " + 'tickets Amount not match'
			} else {
				this.dynamicFieldsErr[errName] = errName + ' ' + 'tickets Amount not match'
			}
		}
		// console.log({ ticketCount, TotalAmm });
		// console.log({ winners, ammount }, 'user input ');
		return { ticketCount, TotalAmm }
	}

}



@Component({
	selector: 'success',
	templateUrl: 'success.html',
})
export class success { }




const toReturnCountAndSum = (data: any) => {
	let keys = ['firstCol', 'secondCol'];
	data.filter((val: any) => Object.keys(val).find((el: any) => keys.includes(el)))
}


function matchValidator(
	control: AbstractControl | null,
	controlTwo: AbstractControl | null,
	controlThre: AbstractControl | null
): ValidatorFn {
	return () => {
		if (!control?.value || !controlTwo?.value) return null
		let totalFees = 80 / 100 * (control.value * controlTwo.value)
		// if (controlThre?.value > totalFees)
		// 	return { match_error: `Value does greater then ${totalFees}` };
		return null;
	};
}

function toCheckTotalAmount(addForm: FormGroup): ValidatorFn {
	return () => {
		let totalKeys = [
			'jaldiPrizeAmount',
			'cornerPrizeAmount',
			'firstLinePrizeAmount',
			'secondLinePrizeAmount',
			'thirdLinePrizeAmount',
			'fullHousiePrizeAmount',
		]

		let winnersKey = [
			'jaldiWinners',
			'cornerWinners',
			'firstLineWinners',
			'secondLineWinners',
			'thirdLineWinners',
			'fullHousieWinners',
		]

		let formVal = addForm.getRawValue();
		if (toGetCount(formVal, totalKeys) !== Number(formVal.totalWinnings)) {
			return { totol_ammountErr: `The total amount should match to total winning amount` };
		}
		if (toGetCount(formVal, winnersKey) > Number(formVal.totalTickets)) {
			return { totol_tiketCount: `The winners are above the total ticket` };
		}
		if (!!formVal.jaldiFive[0].thirdCol) {
			// console.log(formVal.jaldiFive, 'jaldiFive value ');
			return null
		}

		return null
	};



}




function toGetCount(formVal: any, totalKeys: any) {
	let arrayVal = Object.keys(formVal).map(val => {
		if (totalKeys.includes(val)) {
			return formVal[val]
		}
	}).filter(val => !!val)
	let finalCount = arrayVal.length > 0 ? arrayVal.reduce((a, b) => Number(a) + Number(b)) : 0
	return Number(finalCount)
}