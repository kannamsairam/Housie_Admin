import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { AdminService } from 'src/app/_shared/services/admin.service';
import { UploadService } from 'src/app/_shared/services/upload.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private uploadService: UploadService
  ) { }

  gameDetails: any;
  ticketInfo: any = [];
  numberDetails: any = [];
  ticketNumber: any;
  overAllView: any;
  numberInfo: any = []
  selectedNumber: any = 0;

  overAllViewData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
    18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
    35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68,
    69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85,
    86, 87, 88, 89, 90];

  displayData: any = {
    'jaldi': 'Fast 5',
    'firstrow': '1st Line',
    'secondrow': '2nd Line',
    'thirdrow': '3rd Line',
    'corners': '4 Corners',
    'fullHousie': 'Full Housie'
  }
  overAllDataCrossed: any = []
  ngOnInit(): void {
    let snapshot = this.activatedRoute.snapshot
    let data = snapshot.paramMap.get('id');
    let path = ''
    if (snapshot.routeConfig) {
      path = snapshot.routeConfig.path || ''
    }
    this.overAllView = path.includes("game-info")
    console.log(this.overAllView);

    this.gameDetails = data ? JSON.parse(data) : data;
    if (!this.overAllView) {
      this.getTicketData()
    }
    this.getOverAllNumbers()

  }

  navigateTo() {
    this.router.navigate(['contest-management']);
  }

  step = 0;
  setStep(index: number) {
    this.step = index;
  }


  getTicketData() {

    this.adminService.getusersTicketsByGameId(this.gameDetails).then((data: any) => {
      if (!!data && data?.details) {
        this.ticketInfo = data?.details.map((val: any) => this.uploadService.toCheckTicketReturn(val));
      }

      console.log(this.ticketInfo, 'ticket info');
    }).catch(error => {
      console.log(error)
    })
  }


  toCheckNum(num: any, crossed: any) {
    let match = false;
    if (crossed && crossed?.crossedNumbers[0]?.numbersCrossed) {
      match = crossed.crossedNumbers[0].numbersCrossed.find((el: any) => el == num)
    }
    return match ? "num-selected" : ''
  }


  toCheckBtn(num: any, crossed: any) {
    let match = false;
    if (crossed && crossed?.finalObj?.eventData) {
      match = crossed?.finalObj?.eventData.find((el: any) => el == num)
    }
    return match ? "num-selected" : ''
  }

  gatNumberDetails(data: any, index: number, num: any) {
    this.ticketNumber = index + 1;
    console.log({ data, num });

    let obj = data.finalObj;
    Object.keys(obj).map(val => {
      if (obj[val]?.value && obj[val]?.value === num) {
        let fieldVal: any = {
          jaldiWinner: 'Fast 5',
          cornerWinner: '4 Corners',
          firstRowWinner: '1st Line',
          secondRowWinner: '2nd Line',
          thirdRowWinner: '3rd Line',
          fullHousiWinner: 'Full Housie',
        };
        console.log(val);
        let finalObj = obj[val];
        finalObj.eventName = fieldVal[val]
        this.numberDetails = finalObj
      }

    })
  }

  toReturnText(item: any) {
    let finalVal = '';
    if (item && item.firstrow) {
      finalVal = '1st Line'
    } else if (item && item.secondrow) {
      finalVal = '2nd Line'
    } else if (item && item.thirdrow) {
      finalVal = '3rd Line'
    } else if (item && item.corners) {
      finalVal = '4 Corners'
    } else if (item && item.jaldi) {
      finalVal = 'Fast 5'
    }
    else if (item && item.fullHousie) {
      finalVal = 'Full Housie'
    }

    return finalVal;
  }

  getRandomizer(bottom: number, top: number, index: number) {
    let colors = ['num-color-a', 'num-color-b', 'num-color-c', 'num-color-d', 'num-color-e']
    let randomNUmb = Math.floor(Math.random() * (1 + top - bottom)) + bottom;
    return 'num-dtls' + " " + (colors[index] ? colors[index] : colors[randomNUmb]);
  }


  onNumberClick(num: number) {
    let data = {
      "gameId": this.gameDetails.game_id,
      "number": num
    }
    this.selectedNumber = num;
    this.adminService.getUsersByNumberCrossed(data).then((data: any) => {
      if (!!data && data?.details) {
        console.log(data.details);
        let finalData = data.details.map((val: any) => {
          val.tickets = val.ticket_details[0].tickets
          return this.uploadService.toCheckTicketReturn(val)

        })
        this.numberInfo = this.toGetFinalReqOut(finalData, num);
        
      }
    }).catch(error => {
      console.log(error)
    })
  }

  toReturnArray(numberInfo: any) {
    return Object.keys(numberInfo).filter(val => this.numberInfo[val].length > 0)
  }

  toReturnNumberArray(start: number, end: number) {
    return this.overAllViewData.slice(start, end)
  }

  getOverAllNumbers() {

    this.adminService.getOverAllNumbers({ gameId: this.gameDetails.game_id }).then((data: any) => {
      if (!!data && data?.details) {
        this.overAllDataCrossed = data.details.numbersSend
      }
    }).catch(error => {
      console.log(error)
    })


  }
  toReturnName(users: any) {
    return this.displayData?.[users]
  }

  toGetFinalReqOut(data: any[], num: Number) {
    let fieldVal: any = {
      jaldiWinner: 'Fast 5',
      cornerWinner: '4 Corners',
      firstRowWinner: '1st Line',
      secondRowWinner: '2nd Line',
      thirdRowWinner: '3rd Line',
      fullHousiWinner: 'Full Housie',
    };
    let finalData: any = [];
    data.forEach(val => {
      let eventData = val.finalObj.eventData
      if (eventData && eventData.includes(num)) {
        let eventObj = val.finalObj;
        Object.keys(eventObj).forEach(obj => {
          if (eventObj[obj].value === num) {
            finalData.push({
              name: val.user_details[0].username,
              number: num,
              eventName: fieldVal[obj],
              eventTime: eventObj[obj].createdAt
            })
          }
        })

      }
    })
    return  this.toGetGroupByKey(finalData)
  }

  toGetGroupByKey(data: any[]) {
    let result: any = data.reduce(function (r, a) {
      r[a.eventName] = r[a.eventName] || [];
      r[a.eventName].push(a);
      return r;
    }, Object.create(null));
    return result;
  }

}