import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';

import { Cache } from './cache';
import jwt_decode from "jwt-decode";

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private router: Router,
        private cache: Cache) {
    }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {

        if (this.isAuthanticated()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }

    CanActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {

        if (this.isAuthanticated()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }

    isAuthanticated() {
        let authorization = this.cache.user.authorization;
        if (authorization != '') {
            return false;
        } else {
            return true;
        }
    }

    toGetUserDetails() {
        let userData: any = this.cache.get('user');
        let decoded: any = jwt_decode(userData.authorization);
        return decoded.user

    }

    destroyTabIndex() {
        return this.router.url;
    }
}