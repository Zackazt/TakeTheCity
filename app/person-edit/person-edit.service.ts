import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import {AuthorizationService} from '../authorization/authorization.service';

@Injectable()
export class PersonEditService{


	constructor(private _http: Http, private authorizationService: AuthorizationService){}
	
	updatePerson(id, person){

		var options = this.authorizationService.getRequestHeader();
		return this._http.put("https://takethecity.herokuapp.com/api/person/update/" + id + "/", person, options)
			.map(res => res.json());
	}
}