import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import {AuthorizationService} from '../authorization/authorization.service';

@Injectable()
export class PersonDetailService{
	constructor(private _http: Http, private authorizationService: AuthorizationService){}

	getContactList(){
		var options = this.authorizationService.getRequestHeader();

		return this._http.get("https://takethecity.herokuapp.com/api/person/", options)
			.map(res => res.json());
	}

	viewContact(id){
		var options = this.authorizationService.getRequestHeader();

		return this._http.get("https://takethecity.herokuapp.com/api/person/view_contact/" + id + "/", options)
			.map(res => res.json());
	}
}