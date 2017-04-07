import { Injectable } 		   from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthorizationService} from './authorization.service';

 
@Injectable()
export class AuthorizationGuard implements CanActivate{

	constructor(private authorizationService: AuthorizationService, private _router: Router){}

	canActivate(){
		if(this.authorizationService.loggedIn()){
			return true;
		}
		this._router.navigate(['login']);
		return false;
	}
}
