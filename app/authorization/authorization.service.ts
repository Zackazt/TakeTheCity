import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthorizationService{

	constructor(private _http: Http){}

	getUserProfile(){
		var options = this.getRequestHeader();
		var userProfile;
		return this._http.get("https://itcert-testing.herokuapp.com/api/auth/account/me/", options)
			.map(res => res.json());
	}
	saveUserProfile(userProfile){
		localStorage.setItem('user_profile_username', userProfile.username);
		localStorage.setItem('user_profile_email', userProfile.email);
		localStorage.setItem('user_profile_id', userProfile.id);
	}
	getUserProfileUserName(){
		return localStorage.getItem("user_profile_username");
	}
	getUserProfileEmail(){
		return localStorage.getItem("user_profile_email");
	}
	getUserProfileId(){
		return localStorage.getItem("user_profile_id");
	}
	getToken(username, password){
		return this._http.post("https://takethecity.herokuapp.com/api/auth/token/", {"username": username, "password": password})
			.map(res => res.json());
	}
	saveToken(token){
		localStorage.setItem('id_token', token);
	}
	loggedIn() {
		return tokenNotExpired();
	}
	logOut(){
		localStorage.removeItem('id_token');
		localStorage.removeItem('user_profile_username');
		localStorage.removeItem('user_profile_email');
		localStorage.removeItem('user_profile_id');
		localStorage.removeItem('user_quiz_history');
	}
	getRequestHeader(){
		var userToken = localStorage.getItem("id_token");
		var options = new RequestOptions({
			headers: new Headers({
				'Authorization': "JWT " + userToken,
			})
		});
		return options;
	}
}