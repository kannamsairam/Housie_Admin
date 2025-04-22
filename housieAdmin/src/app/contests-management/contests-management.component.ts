import { Component, OnInit,OnDestroy , ViewChild} from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';
import { AdminService } from '../_shared/services/admin.service';
import { ToastService } from '../_shared/services/toast.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SharedLogic } from '../core/shared-logic'
import Swal from 'sweetalert2';
import { AuthGuardService } from '../_shared/services/auth.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
	selector: 'app-contests-management',
	templateUrl: './contests-management.component.html',
	styleUrls: ['./contests-management.component.css'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class ContestManagement implements OnInit {
	dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

	dashBoardData: any;
	columnTitles: any;
	participantsData: any;
	winnersData: any;
	questionData: any;
	viewGame: boolean = false;
	p = 1;
	dataLoader: boolean;
	allGammes: any;
	tabIndex: Number = 0;
	tabVal:any=0;

	constructor(private router: Router,
		private adminService: AdminService,
		private toastService: ToastService,
		private authServices: AuthGuardService,

	) {
		this.dataLoader = false;
	}

	ngOnInit(): void {
		this.getGame()
		let tabIndex:any =localStorage.getItem('tabIndex')
		this.tabVal=JSON.parse(tabIndex)
		this.tabIndex=JSON.parse(tabIndex)
	}

	ngOnDestroy(): void {
		let str = this.authServices.destroyTabIndex();
		if (!str.includes("contest-management")) {
			localStorage.removeItem('tabIndex');
		}
	}


	buttonClickedInChild(valueEmitted: any) {
		let clickedButton = valueEmitted;
		console.log(clickedButton, 'clickedButton');

		if (clickedButton.buttonName == "View") {
			this.viewGame = true;
		}

	}

	addGame() {
		this.router.navigate(['contest-management', 'add-game']);
	}

	userInfo() {
		this.router.navigate(['contest-management', 'user-info']);
	}

	@ViewChild(MatPaginator)
	paginator!: MatPaginator;
	@ViewChild(MatSort)
	sort!: MatSort;

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	getGame() {
		let stringTopass = "";
		if (this.dataLoader) {
			return;
		}
		this.dataLoader = true;
		let tab = Number(localStorage.getItem('tabIndex'))
		if (tab == 2) {
			console.log(tab)
			stringTopass = "completed";
		}
		if (tab== 1) {
			stringTopass = "active";
		}
		if (tab == 3) {
			stringTopass = "cancelled";
		}
		if (tab == 0) {
			stringTopass = "inprogress";
		}
		this.adminService.getGameByStatus({ status: stringTopass }).then(async (resp: any) => {

			this.dataLoader = false;
			this.dataSource = new MatTableDataSource<PeriodicElement>(resp.details);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;


		}, (error) => {
			this.dataLoader = false;
			this.toastService.error(error);

		});
	}

	onTabChanged(event: any) {
		this.tabIndex = event.index;
		let stringTopass = "";
		if (this.tabIndex == 2) {
			stringTopass = "completed";
		}
		if (this.tabIndex == 1) {
			stringTopass = "active";
		}
		if (this.tabIndex == 3) {
			stringTopass = "cancelled";
		}
		if (this.tabIndex == 0) {
			stringTopass = "inprogress";
		}
		if (this.dataLoader) {
			return;
		}
		this.adminService.getGameByStatus({ status: stringTopass }).then(async (resp: any) => {

			this.dataLoader = false;
			console.log('110===>>', resp.details)
			this.dataSource = new MatTableDataSource<PeriodicElement>(resp.details);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;

		}, (error) => {
			this.dataLoader = false;
			this.toastService.error(error);

		});
		localStorage.setItem("tabIndex", JSON.stringify(this.tabIndex))
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
}

export interface PeriodicElement {
	name: string;
	position: number;
	weight: number;
	symbol: string;
	description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];
