import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthorizationService} from '../authorization/authorization.service';


@Component({
    selector: 'logout',
    template: `<p id="logout" (click)="logOutButtonClick()">Log-Out</p>`,
    styles: [`
	    #logout{
			color: white;
			float: right;
			margin-top: 20px;
			margin-right: 3%;
			cursor: pointer;
			padding: 5px;
			background-color: #50486B;
			border-radius: 10px;
		}
    `]
})

export class LogoutComponent{

	constructor(
		private _router:              Router, 
		private authorizationService: AuthorizationService){}

	logOutButtonClick(){
		this.authorizationService.logOut();
		this._router.navigate(['login']);
	}
}