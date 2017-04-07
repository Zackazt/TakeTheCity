import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import {AuthorizationService} from '../authorization/authorization.service';

@Injectable()
export class FollowupFormService{


	constructor(private _http: Http, private authorizationService: AuthorizationService){}
	
	submitPerson(person){

		var options = this.authorizationService.getRequestHeader();

		return this._http.post("https://takethecity.herokuapp.com/api/person/add/", person,  options)
			.map(res => res.json());
	}
}