import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, from, Subject, throwError } from 'rxjs';
import { mergeMap, switchMap, catchError } from "rxjs/operators";

import { Cache } from './cache';
import { AdminService } from './admin.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    cache!: Cache;
    adminService!: AdminService

    constructor(private injector: Injector) {
    }

   addAuthHeader(request: any) {
        if (this.cache.user.authorization) {
            request = request.clone({
                setHeaders: {
                    token: `${this.cache.user.authorization}`
                }
            });
        }
        return request;
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        this.adminService = this.injector.get(AdminService);
        this.cache = this.injector.get(Cache);
        // Handle request
        if (!request.url.includes("login")) {
            request = this.addAuthHeader(request);
        }
        return next.handle(request).pipe(
            catchError(error => {
                
                
                if (error.status === 401) {
                    if (request.url.includes("login")) {
                        console.log(error);
                    }

                    // return this.refreshToken().pipe(
                    //     mergeMap(() => {
                    //         request = this.addAuthHeader(request);
                    //         return next.handle(request);
                    //     }),
                    //     catchError((error) => {
                    //         this.adminService.logout();
                    //         return throwError(error);
                    //     })
                    // );
                }
                return throwError(error);
            })
        );
    }

}