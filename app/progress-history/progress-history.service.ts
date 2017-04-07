import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import {AuthorizationService} from '../authorization/authorization.service';

@Injectable()
export class ProgressHistoryService{

	progressHistory;

	constructor(private _http: Http, private authorizationService: AuthorizationService){}

	getProgressHistory(id){
		var options = this.authorizationService.getRequestHeader();
		return this._http.get("https://takethecity.herokuapp.com/api/progress/" + id + "/", options)
			.map(res => res.json());
	}

	setProgressHistory(data){
		this.progressHistory = data;
	}
	getLocalProgressHistory(){
		return this.progressHistory;
	}
	updateLocalProgressHistory(data){
		this.progressHistory.push(data);
		console.log(this.progressHistory);
	}
	hasProgressHistory(){
		if(this.progressHistory.length > 0)
			return true;
		return false;
	}


	
}