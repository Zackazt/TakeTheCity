import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {AuthorizationService} from '../authorization/authorization.service';
import {Router} from '@angular/router';

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html'
})

export class LogInFormComponent {
	logInForm: FormGroup;
	loginFailed = false;

	constructor(fb: FormBuilder, private authorizationService: AuthorizationService, private _router: Router){
		this.logInForm = fb.group({
			username: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	logIn(){
		var logInObservable = this.authorizationService.getToken(
			this.logInForm.controls['username'].value,
			this.logInForm.controls['password'].value
		);
		logInObservable.subscribe(data => {
			this.loginFailed = false;
			this.authorizationService.saveToken(data.token);
			this._router.navigate(['dashboard'])
			// this.getUserProfileInformation();
		}, error => {
			console.log(error);
			this.loginFailed = true;
		});
	}

	getUserProfileInformation(){
		// var getProfileObservable = this.authorizationService.getUserProfile();
		// getProfileObservable.subscribe(data => {
		// 	this.authorizationService.saveUserProfile(data);
		// 	this._router.navigate(['quiz-widget']);
		// });
	}

}