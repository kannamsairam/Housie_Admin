import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { Cache } from '../services/cache';
import { ToastService } from '../services/toast.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isActive: boolean = false;

  isModalOpen: boolean = false;
  isProfileModelOpen: boolean = false;
  formSubmitted: boolean = false;
  userPrevilages: any = []

  sideNavs: Array<any> = [
    {
      name: 'Quiz',
      path: '/quiz-management',
      compared: 'quiz',
      icon: 'fas  nav-icon fa-question'
    },
    {
      name: 'Sub Admins',
      path: '/admin-management',
      compared: 'subAdmin',
      icon: 'fas  nav-icon fa-user-shield'
    },
    {
      name: 'Users Management',
      path: '/user-management',
      compared: 'usersManagement',
      icon: 'fas  nav-icon fa-users'
    },
    {
      name: 'Users Wallet',
      path: '/user-wallet',
      compared: 'userWallet',
      icon: 'fas  nav-icon fa-address-card'
    },
    {
      name: 'Banner Management',
      path: '/banner-management',
      compared: 'bannerManagement',
      icon: 'fas  nav-icon fa-images'
    },

    // {
    //   name: 'Bonus Management',
    //   path: '/bonus-management',
    //   compared: 'bonusManagement',
    //   icon: 'fas   fa-percent nav-icon'
    // },
    {
      name: 'Withdrawn Requests',
      path: '/withdrown-transactions',
      compared: 'withdrawnRequest',
      icon: 'fas   fa-rupee-sign nav-icon'
    },
    {
      name: 'Reports',
      path: '/user-transaction',
      compared: 'reports',
      icon: 'fas  nav-icon fa-chart-line'

    },
    {
      name: 'Notification Management',
      path: '/notification-list',
      compared: 'notificationManagement',
      icon: 'fas  nav-icon fa-bell'
    },
    {
      name: 'TDS',
      path: '/tds',
      compared: 'tds',
      icon: 'fas  nav-icon fa-hand-holding-usd'
    },
    {
      name: 'Deposit & GST',
      path: '/deposit-gst',
      compared: 'deposit-gst',
      icon: 'fas  fa-percent nav-icon'
    }
  ];

  openModal() {
    this.isModalOpen = false;
    //this.changeDetectorRef.detectChanges();
    this.isModalOpen = true;
    // this.changeDetectorRef.detectChanges();
  }

  openProfileModel() {
    this.isProfileModelOpen = false;
    //this.changeDetectorRef.detectChanges();
    this.isProfileModelOpen = true;
    //this.changeDetectorRef.detectChanges();
  }


  constructor(private router: Router,
    private adminService: AdminService,
    public cache: Cache,
    //private changeDetectorRef: ChangeDetectorRef,
    private toastService: ToastService) { }

  logout() {
    this.cache.clear('user');
    this.router.navigate(["/login"]);
    return;
    if (this.formSubmitted) {
      return;
    }
    this.formSubmitted = true;

    this.adminService.logOut().then((resp: any) => {
      this.cache.clear('user');
      this.router.navigate(["/login"]);
      this.formSubmitted = false;
    }, (error) => {
      this.formSubmitted = false;
      this.toastService.error(error);
    });
    this.router.navigate(['/login'])
  }




  ngOnInit(): void {
    let userData: any = this.cache.get('user');
    if (!userData) this.router.navigate(["/login"]);
    let decoded: any = jwt_decode(userData.authorization);
    if (decoded && decoded.user) {
      this.userPrevilages = decoded.user;
    }
  }

  toCheckPermission(com: string) {
    // "role": "super admin"
    if (this.userPrevilages.role === "super admin")
      return true
    else
      return this.userPrevilages.admin_privileges.includes(com)
  }


  toUpdateUser() {
    alert(9)
  }

}
