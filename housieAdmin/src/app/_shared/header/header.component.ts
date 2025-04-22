import { Component, OnInit, ChangeDetectorRef,Output, EventEmitter  } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { Cache } from '../services/cache';
import { ToastService } from '../services/toast.service';
import { AuthGuardService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isModalOpen: boolean = false;
  isProfileModelOpen: boolean = false;
  formSubmitted: boolean = false;
  userData:any;
  name:any;

  constructor(private router: Router,
    private adminService: AdminService,
    public cache: Cache,
    private authServices: AuthGuardService,
    private changeDetectorRef: ChangeDetectorRef,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.getUserProfile()
    this.userData = localStorage.getItem('userDeatils')
    let userDeatils = JSON.parse(this.userData)
    if(userDeatils){
      this.name = userDeatils.name
    }
  }

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

  openModal() {
    this.isModalOpen = false;
    this.changeDetectorRef.detectChanges();
    this.isModalOpen = true;
    this.changeDetectorRef.detectChanges();
  }

  openProfileModel() {
    this.isProfileModelOpen = false;
    this.changeDetectorRef.detectChanges();
    this.isProfileModelOpen = true;
    this.changeDetectorRef.detectChanges();
  }

  getUserProfile() {
    let userData = this.authServices.toGetUserDetails()
    this.adminService.getProfileById({ user_id: userData.userId }).then((resp: any) => {
      if (resp.details) {
        localStorage.setItem('userDetails', JSON.stringify(resp.details[0]))
        this.userData = resp.details[0]
        this.name = resp.details[0].name
      }
    }, (error) => {
      this.toastService.error(error);
    });
  }
}
