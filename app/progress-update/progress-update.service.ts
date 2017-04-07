import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import {AuthorizationService} from '../authorization/authorization.service';

@Injectable()
export class ProgressUpdateService{

	constructor(private _http: Http, private authorizationService: AuthorizationService){}

	mapProgressStepToLevel(level){
		if(level < 1)
			return "No Progress Yet";

		if(level == 1)
			return "Initial Contact Made ";

		if(level == 2)
			return "Donation Requested";

		if(level == 3)
			return "Donation Pending";

		if(level == 4)
			return "Donation Received";

		if(level == 5)
			return "Follow Up Contact Made";

		if(level == 6)
			return "In-Home Bible Study Launched";

		if(level == 9)
			return "In-Home Bible Study Completed or Referred To Local Church Or Ministry";

		if(level == 10)
			return "Began Involvement With Take The City Ministry";
	}
	
	mapProgressLevelToStep(step){
		if(step == "Donation Requested"){
			return {
				"progress_percentage": 26,
				"progress_level": 2
			};
		}else if(step == "Donation Pending"){
			return {
				"progress_percentage": 39,
				"progress_level": 3
			};
		}else if(step == "Donation Received"){
			return {
				"progress_percentage": 50,
				"progress_level": 4
			};
		}else if(step == "Follow Up Contact Made"){
			return {
				"progress_percentage": 63,
				"progress_level": 5
			};
		}else if(step == "In-Home Bible Study Launched"){
			return {
				"progress_percentage": 75,
				"progress_level": 6
			};
		}else if(step == "Referred To Local Church Or Ministry"){
			return {
				"progress_percentage": 88,
				"progress_level": 9
			};
		}else if(step == "In-Home Bible Study Completed"){
			return {
				"progress_percentage": 88,
				"progress_level": 9
			};
		}else if(step == "Began Involvement With Take The City Ministry"){
			return {
				"progress_percentage": 100,
				"progress_level": 10
			};
		}
	}
	submitNewProgress(id, step){
		var options = this.authorizationService.getRequestHeader();
		var progressObject = {
			"progress_step": step,
			"person": id
		}
		return this._http.post("https://takethecity.herokuapp.com/api/progress/add/", progressObject, options)
			.map(res => res.json());
	}
	updateUserProgress(id, update){
		var options = this.authorizationService.getRequestHeader();
		return this._http.put("https://takethecity.herokuapp.com/api/progress/update_percentage/" + id + "/", update, options)
			.map(res => res.json());
	}
}