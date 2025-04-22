import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concat } from 'rxjs';
import { Cache } from '../_shared/services/cache';
import { AdminService } from '../_shared/services/admin.service';
import { ToastService } from '../_shared/services/toast.service';
import jwt_decode from "jwt-decode";
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	dataSource: any[] = []
	dataSource1: any[] = []
	chartData: any = [


	];

	chartLabels: any = [
		'January',
		'February',
		'March',
		'April'
	];

	chartOptions = {
		responsive: true
	};

	// client: any = clients; 
	dashBoardData: any;
	dataLoader: boolean;
	userPrevilages: any = []

	constructor(private router: Router,
		private adminService: AdminService,
		public cache: Cache,
		private toastService: ToastService) {

		this.dashBoardData = {
			"totalUsers": 0,
			"games": 0,
			"banners": 0,
			"transactions": 0,
			"kycPending": 0,
			"admins": 0,
			// "questions": 0,
			"quiz": 0,
			"withdrawn": 0
		}

		this.dataLoader = false;
	}

	ngOnInit(): void {
		this.getCounts();
		this.getGame();
		this.getuserTransactions();


		//toget user data;
		let userData: any = this.cache.get('user');

		let decoded: any = jwt_decode(userData.authorization);
		if (decoded && decoded.user) {
			this.userPrevilages = decoded?.user?.admin_privileges ? decoded?.user?.admin_privileges : ['admin'];
		}


		console.log({ userPrevilages: this.userPrevilages.admin_privileges });

	}

	getCounts() {
		if (this.dataLoader) {
			return;
		}
		this.dataLoader = true;

		this.adminService.getCounts().then((resp: any) => {
			if (resp.details) {
				console.log(resp.details.users);

				if (resp.details.users) {
					this.dashBoardData.totalUsers = resp.details.users;
				}
				if (resp.details.games) {
					this.dashBoardData.games = resp.details.games;
				}
				/*if (resp.details.questions) {
					this.dashBoardData.questions = resp.details.questions;
				}*/
				if (resp.details.quiz) {
					this.dashBoardData.quiz = resp.details.quiz;
				}
				if (resp.details.admins) {
					this.dashBoardData.admins = resp.details.admins;
				}
				if (resp.details.banners) {
					this.dashBoardData.banners = resp.details.banners;
				}
				if (resp.details.kycPending) {
					this.dashBoardData.kycPending = resp.details.kycPending;
				}
				if (resp.details.transactions) {
					this.dashBoardData.transactions = resp.details.transactions;
				}
				if (resp.details.withdrawn) {
					this.dashBoardData.withdrawn = resp.details.withdrawn;
				}
			}
			this.dataLoader = false;
		}, (error) => {
			this.dataLoader = false;
			this.toastService.error(error);
		});
	}

	getGame() {
		this.adminService.getGame().then((resp: any) => {
			if (resp.details) {
				this.dataSource = resp.details.filter((val: any) => val.status === 'active');
				this.dataSource.map((item) => {
					let remainingTime: any = this.dateDiff(item.gameStartDateTime)
					item.remainingTime = remainingTime
				})
				this.dataSource = this.dataSource.splice(0,5)
			}
		}, (error) => {
			this.dataLoader = false;
			this.toastService.error(error);

		});
	}


	finalArray: any = {}

	getuserTransactions() {
		this.adminService.getuserTransactions().then((resp: any) => {
			var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
			let finalObj: any = {}
			if (resp.details) {
				this.dataSource1 = resp.details.filter((i: any) => {
					return i.status == 'accept'
				})
				console.log(this.dataSource1, "11")
				this.dataSource1.forEach((games) => {
					const date = new Date(games.createdAt).getMonth() + 1
					if (new Date().getMonth() - 3 < date) {
						if (finalObj[date]) {
							finalObj[date].push(games);
						} else {
							finalObj[date] = [games];
						}
					}
				})
				Object.keys(finalObj).map(val => {
					this.toGetSumData(finalObj[val], "bonus")
					this.toGetSumData(finalObj[val], 'credit')
					this.toGetSumData(finalObj[val], "debit")
				})
			}
			console.log(this.finalArray, 'data hello');
			this.chartData = Object.keys(this.finalArray).map((val: any) => {
				return {
					data: this.finalArray[val],
					label: val
				}
			})
			this.chartLabels = Object.keys(finalObj).map((el: any) => mL[el - 1])
			this.dataLoader = false;
		}, (error) => {
			this.dataLoader = false;
			this.toastService.error(error);
		});
	}

	dateDiff(t: any) {
		let today: any = new Date();
		let gameDate: any = new Date(t);
		let diffMs = Math.abs((today - gameDate)); // milliseconds
		let diffDays = Math.floor(diffMs / 86400000); // days
		let diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
		let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
		if (diffDays) {
			return diffDays + "days left";
		} else {
			return (diffHrs > 10 ? diffHrs : '0' + diffHrs) + ":" + (diffMins > 10 ? diffMins : '0' + diffMins) + ":" + '00';
		}
	}

	toGetSumData(data: any, type: any) {
		let value: any = 0
		let groupArray: any = data.filter((val: any) => val.type === type)?.map((el: any) => el.amount)
		if (groupArray && groupArray.length) {
			value = groupArray.reduce((a: any, b: any) => a + b);
		}
		if (this.finalArray[type]) {
			this.finalArray[type].push(value)
		} else {
			this.finalArray[type] = [value]
		}
	}

}
