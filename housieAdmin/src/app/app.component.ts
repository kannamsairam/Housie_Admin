import { Component } from '@angular/core';
import { flush } from '@angular/core/testing';
import { Router, NavigationEnd } from '@angular/router';
import { LocationStrategy } from '@angular/common';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	headerSideBarFlag: boolean = false;
	contentClass: string = '';

	constructor(private router: Router, private location: LocationStrategy) {

		history.pushState(null, '', window.location.href);
		this.location.onPopState(() => {
			history.pushState(null, '', window.location.href);
		});
		this.router.events.subscribe((url: any) => {
			if (url instanceof NavigationEnd) {
				if (url.urlAfterRedirects.indexOf('/login') !== -1 || url.urlAfterRedirects.indexOf('/forget-password') !== -1) {
					this.headerSideBarFlag = true;
					this.contentClass = '';
				} else {
					this.headerSideBarFlag = false;
					this.contentClass = 'content-wrapper';
				}
			}
		});
	}
}
