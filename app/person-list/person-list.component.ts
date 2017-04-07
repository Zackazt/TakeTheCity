import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ContactManagementSystemService} from '../contact-management-system/contact-management-system.service';
import {ProgressUpdateService} from '../progress-update/progress-update.service';

@Component({
    selector: 'person-list',
    templateUrl: './person-list.component.html',
    styleUrls: ['./person-list.component.css']
})

export class PersonListComponent implements OnInit{
	
	people;
	peopleDoneLoading;

	constructor(
		private _router: Router, 
		private contactManagementSystemService: ContactManagementSystemService,
		private progressUpdateService: ProgressUpdateService)
	{
		this.peopleDoneLoading = false;
	}
	ngOnInit(){
		if(this.contactManagementSystemService.havePeople()){                               
			this.people = this.contactManagementSystemService.getPeople();                       
			this.peopleDoneLoading = true;
		}else{
			var peopleListObservable = this.contactManagementSystemService.getContactList();
			peopleListObservable.subscribe(data => {
				this.people = data;
				this.peopleDoneLoading = true;
				this.contactManagementSystemService.setPeople(this.people);
			});
		}
	}
	viewContact($event, person){
		if(person.is_new_contact){
			var viewContactObservable = this.contactManagementSystemService.initialView(person.id);
			viewContactObservable.subscribe(data => {
				this.removeNewContactHighlight($event);
				this.contactManagementSystemService.updateLocalPeopleListAfterNewContactView(person);
				this.openContactView(person);
			}, error => {
				console.log(error);
			});
		}else{
			this.openContactView(person);
		}
	}
	onDeleteButtonClick(person){
		if(this.confirmDelete(person)){
			this.peopleDoneLoading = false;
			var deletePersonObservable = this.contactManagementSystemService.deletePerson(person);
			deletePersonObservable.subscribe(data => {
				this.people = this.contactManagementSystemService.updateLocalPeopleListAfterPersonDelete(person);
				this.peopleDoneLoading = true;
			});
		}
	}
	removeNewContactHighlight($event){
		$event.srcElement.parentElement.classList.add("notNewPerson");
		$event.srcElement.parentElement.classList.remove("newPerson");
	}
	openContactView(person){
		this.contactManagementSystemService.setPerson(person);
		this._router.navigate(['contact', person.id]);
	}
	confirmDelete(person){
		return confirm("Are you sure you want to delete " + person.first_name + " " + person.last_name + "?")
	}
}