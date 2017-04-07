import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {ContactManagementSystemService} from '../contact-management-system/contact-management-system.service';
import {AuthorizationService} from '../authorization/authorization.service';

@Component({
    selector: 'progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.css']
})

export class ProgressBarComponent implements OnInit{

	@Input() progressPercentage;

	constructor(){}

	ngOnInit(){



	}

}