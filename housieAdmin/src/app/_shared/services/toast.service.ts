import { Injectable } from '@angular/core';
  
import { ToastrService } from 'ngx-toastr';
  
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  
  constructor(private toastr: ToastrService) { }
  
  success(message: string, title: string){
      this.toastr.success(message, '', {positionClass: 'toast-top-center'});
  }
  
  error(message: string){
      this.toastr.error(message, '', {positionClass: 'toast-top-center'});
  }
  
  info(message: string, title: string){
      this.toastr.info(message, '', {positionClass: 'toast-top-center'});
  }
  
  warning(message: string, title: string){
      this.toastr.warning(message, '', {positionClass: 'toast-top-center'});
  }
  
}