import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {AuthorizationService} from '../authorization/authorization.service';
declare var jQuery:any;

@Component({
    selector: 'login-modal',
    templateUrl: './login-modal.component.html'
})

export class LoginModalComponent {
	logInForm: FormGroup;
	loginFailed = false;

	constructor(
		fb: FormBuilder, 
		private authorizationService: AuthorizationService){
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
			jQuery('#loginModal').modal('hide');
			console.log("logged in");
		}, error => {
			console.log(error);
			this.loginFailed = true;
		});
	}
}