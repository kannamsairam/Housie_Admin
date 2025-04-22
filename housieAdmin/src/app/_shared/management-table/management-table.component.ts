import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Router } from '@angular/router';


@Component({
	selector: 'app-management-table',
	templateUrl: './management-table.component.html',
	styleUrls: ['./management-table.component.css']
})
export class ManagementTable implements OnInit {

	@Input() dashBoardData: any;
	@Input() columnTitles: any;
	@Output() buttonClicked: EventEmitter<any> = new EventEmitter<any>();

	p = 1;

	constructor(private router: Router) {
		console.log(this.dashBoardData, 'dashBoardData');
		console.log(this.columnTitles, 'columnTitles');

		
	}

	ngOnInit(): void {
		console.log(this.dashBoardData[this.dashBoardData.length - 1][this.dashBoardData[this.dashBoardData.length - 1].length - 1]);
		// $(".data-table").DataTable({
		// 	"responsive": true, "lengthChange": false, "autoWidth": false,
		// 	buttons: ["print", "colvis"]
		//   }).buttons().container().appendTo(".dataTables_wrapper .col-md-6:eq(0)");
	}

	getClickedButton(buttonName: any, index: number) {
		this.buttonClicked.emit({"buttonName": buttonName, "index": index});
	}
}
