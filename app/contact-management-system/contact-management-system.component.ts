import { Component } from '@angular/core';
import {ContactManagementSystemService} from './contact-management-system.service';
import {Router} from '@angular/router';

@Component({
    selector: 'contact-management-system',
    templateUrl: './contact-management-system.component.html',
    styleUrls: ['./contact-management-system.component.css']
})

export class ContactManagementSystemComponent {

	hasSelectedPerson = false;
	person;

	constructor(private contactManagementSystemService: ContactManagementSystemService, private _router: Router){}

	selectedPerson($event){
		this.person = $event.person;
	}

}