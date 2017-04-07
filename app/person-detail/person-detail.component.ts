import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactManagementSystemService} from '../contact-management-system/contact-management-system.service';
import { CommonModule } from '@angular/common';
import {ProgressHistoryService} from '../progress-history/progress-history.service';

@Component({
    selector: 'person-detail',
    templateUrl: './person-detail.component.html',
    styleUrls: ['./person-detail.component.css']
})

export class PersonDetailComponent implements OnInit{

	person;
	personId;
	personContactInformation;
	personObservable;
	peopleDoneLoading = false;
	isUpdatingProgress = false;
	isViewingProgressHistory = false;
	editingContact = false;
	progressHistoryDoneLoading = false;
	prgHistoryHover = false;

	constructor(
		private _router: Router, 
		private _route: ActivatedRoute,
		private contactManagementSystemService: ContactManagementSystemService,
		private progressHistoryService: ProgressHistoryService){}

	ngOnInit(){

		// If we already have the people loaded, then grab the people from the people variable in the service.
		// Otherwise grab them from the API. I did this to minimize API calls, and to allow users to go to a
		// contact detail page without having to navigate through the application. They will be able to reach this
		// page via URL alone as well.

		if(this.contactManagementSystemService.getPeople()){  											// If we have people loaded already.
			this.getPersonId();																			// Set this.personId using the getPersonId function.
		}else{																							// Otherwise...
			var peopleListObservable = this.contactManagementSystemService.getContactList();			// Call the API and set the service variables...
			peopleListObservable.subscribe(data => {
				this.contactManagementSystemService.setPeople(data);
				this.getPersonId();
			});
		}
	}

	getPersonId(){
		this.personObservable = this._route.params.subscribe(params => {
				this.personId = params['id'];
				this.person = this.contactManagementSystemService.getPersonById(this.personId);
				this.contactManagementSystemService.setPerson(this.person);
				this.peopleDoneLoading = true;
			}
		);
	}
	ngOnDestroy(){
		this.personObservable.unsubscribe();
	}
	onUpdateProgressButtonClick(){
		this.isUpdatingProgress = !this.isUpdatingProgress;
		this.isViewingProgressHistory = false;
	}
	onViewProgressHistoryButtonClick(){
		this.isViewingProgressHistory = !this.isViewingProgressHistory;
		this.isUpdatingProgress = false;
	}
	hasUpdatedProgress(){
		this.isUpdatingProgress = false;
	}
	editContactDetailsButtonClick(){
		this.editingContact = true;
	}
	progressHistoryLoaded(){
		this.progressHistoryDoneLoading = true;
	}
	test(){
		console.log("sp");
		this.prgHistoryHover = true;
		
	}
}