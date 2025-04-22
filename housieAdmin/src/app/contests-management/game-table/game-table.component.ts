import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PeriodicElement } from '../contests-management.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastService } from 'src/app/_shared/services/toast.service';
import { AdminService } from 'src/app/_shared/services/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class GameTableComponent implements OnInit {

  @Input() dataSource: any;
  @Output() getGame: EventEmitter<any> = new EventEmitter<any>();
  @Input() tabIndex: any;
  tableHeader = ['Game Name', 'Total Winnings', 'Fees', 'Tickets', 'Reg. Start Date & Time', 'Reg. Close Date & Time', 'Game Start Date & Time'];
  columnsToDisplay = ['name', 'totalWinnings', 'fees', 'totalTickets'];
  expandedElement!: any;
  dataLoader: boolean;
  displayedColumns: string[] = ['no', 'Tickets', 'type', 'Time', 'Prize', 'action'];
  userDataSource: any = new MatTableDataSource<any>(ELEMENT_DATA);
  filterData: any = [{ 'jldi': 'Jald Five' },
  { 'firstLine': '1st Row' },
  { 'secondLine': '2nd Row' },
  { 'thirdLine': '3rd Row' },
  { 'corner': 'Four Corner' },
  { 'fullHousie': 'Full House' }]
  filterDataObj: any = Object.assign({}, ...this.filterData)
  date: any = new Date().toISOString();
  status: any;
  selectedValue: any;
  panelColor = new FormControl('jldi');
  @ViewChild(MatPaginator) paginator!: MatPaginator
  constructor(
    private router: Router,
    private adminService: AdminService,
    private toastService: ToastService,
  ) { this.dataLoader = false}


  ngAfterViewInit() {
    this.userDataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.expandedElement = null
    this.toLodaData();

    // this.userDataSource = [
    //   {
    //     n1: 1,
    //     name: "email tst",
    //     email: 'test@gamil.com',
    //     mobile: 8500920298,
    //     depositwallet: 100,

    //     winAmount: '100',
    //     bonusWallet: '939',
    //     credit_points: '993',

    //     action: ''


    //   }
    // ]
  }



  onEditGame(data: any) {
    let id = data._id
    this.router.navigate(['contest-management/edit-game', id]);
  }

  onUserView(userData: any, gameData: any) {
    this.router.navigate(['contest-management/user-info', JSON.stringify({ gameId: userData.gameId, userId: userData.userId })]);
  }

  toReturnType(data: any) {
    let fieldVal: any = {
      jaldiWinner: 'Jald Five',
      cornerWinner: 'Four Corner',
      firstRowWinner: '1st Row',
      secondRowWinner: '2nd Row',
      thirdRowWinner: '3rd Row',
      fullHousiWinner: 'Full House',
    };

    let showString: any = '';
    Object.keys(data).forEach((val: any) => {
      if (data[val] === 1) {
        showString = fieldVal[val]
      }

    })
    return showString
  }

  delete(id: any) {
    Swal.fire({
      title: 'Do you want to delete the game?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      // denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        //   Swal.fire('Saved!', '', 'success')
        this.adminService.deleteGame({ id: id }).then((resp: any) => {
          if (!resp.error) this.getGame.emit()
          this.toastService.success('Game deleted successfully', '');
        }, (error) => {
          this.toastService.error(error);
        });
      }
    })

  }

  cancel(id: any) {
    Swal.fire({
      title: 'Do you want to cancel the game?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'OK',
      // denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        //   Swal.fire('Saved!', '', 'success')
        this.adminService.cancelGame({ game_id: id }).then((resp: any) => {
          if (!resp.error) this.getGame.emit()
          this.toastService.success('Game cancelled successfully', '');
        }, (error) => {
          this.toastService.error(error);
        });
      }
    })

  }

  toLodaData(): any {
    // console.log("came ere")
    let tabIndex: any = localStorage.getItem('tabIndex')
    let tabVal = JSON.parse(tabIndex)
    // let data = this.dataSource;
    return;

  }

  selectedGame: any = ''
  onExpand(data: any) {
    if (this.selectedGame === data._id) return;
    this.selectedGame = data._id;
    this.adminService.getUsersByWinning({ game_id: data._id ,claimType:"jldi"}).then((data: any) => {
      if (!!data && data?.details) {
        console.log(data.details)
        this.userDataSource = data.details;
      }
    }).catch(error => {
      console.log(error)
    })
  }


  onChangeFilter(data: any, type: any = 'jldi') {
    if (this.selectedGame === data._id && !type) return;
    this.selectedGame = data._id;
    this.adminService.getUsersByWinning({ gameId: data._id, claimType: type == 'select' ? "all" : type }).then((data: any) => {
      console.log(data)
      if (!!data && data?.details) {
        this.userDataSource = data.details;
        console.log(this.userDataSource, 'final data this is')
      }
    }).catch(error => {
      console.log(error)
    })
  }

  onOverallView(gameId: any) {
    this.router.navigate(['contest-management/game-info', JSON.stringify({ game_id: gameId })]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userDataSource.filter = filterValue.trim().toLowerCase();

    if (this.userDataSource.paginator) {
      this.userDataSource.paginator.firstPage();
    }
  }

}

const ELEMENT_DATA: PeriodicElement[] = [];
