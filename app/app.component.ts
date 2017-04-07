import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthorizationService} from './authorization/authorization.service';
declare var jQuery:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(
  	private _router: Router,
  	private authorizationService: AuthorizationService){

  }

  universalClick(){
  	if(!this.authorizationService.loggedIn()){
  		jQuery('#loginModal').modal('show');
  	}
  }
}
