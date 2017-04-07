import { Component} from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {ContactManagementSystemService} from '../contact-management-system/contact-management-system.service';
import {Router} from '@angular/router';
import {ProgressHistoryService} from '../progress-history/progress-history.service';

@Component({
    selector: 'log-contact',
    templateUrl: './log-contact.component.html',
    styleUrls: ['./log-contact.component.css']
})

export class LogContactComponent{

	logContactForm: FormGroup;
	contactType;
	details;

	constructor(
		fb: FormBuilder, 
		private contactManagementSystemService: ContactManagementSystemService,
		private _router: Router,
		private progressHistoryService: ProgressHistoryService){
		this.logContactForm = fb.group({
			contactDetails: ['', Validators.required],
			contactType: ['', Validators.required]
		});
	}

	submitLog(){
		var id = this.contactManagementSystemService.getPerson().id
		var log = {
			"person": id,
			"contact_type": this.contactType,
			"details": this.details
		};

		if(this.contactManagementSystemService.getPerson().progress_level == 0){  //If this is true, it will be the initial contact and we need to update their progress automatically.
			var submitContactLogObservable = this.contactManagementSystemService.submitContactLog(log);
			submitContactLogObservable.subscribe(data => {
				this.refreshContactList(data[0], id);
				this.initialContact(this.contactManagementSystemService.getPerson().id);
			});
		}else{
			var submitContactLogObservable = this.contactManagementSystemService.submitContactLog(log);
			submitContactLogObservable.subscribe(data => {
				this.refreshContactList(data[0], id);
			});
		}
	}
	updateLastTimeContacted(time){

	}
	initialContact(id){
		var initialContactLogObservable = this.contactManagementSystemService.initialContact(id);
		initialContactLogObservable.subscribe(data => {
			this.initialProgressUpdate(id);
		});
	}
	initialProgressUpdate(id){
		var initialProgressUpdateObservable = this.contactManagementSystemService.initialProgressUpdate(id);
		initialProgressUpdateObservable.subscribe(data => {
			this.contactManagementSystemService.updateLocalPeopleListAfterInitialContact(id);
			this.progressHistoryService.updateLocalProgressHistory(data[0]);
		});
	}
	refreshContactList(log, id){
		this.contactManagementSystemService.updateLocalPeopleListAfterLogSubmit(log, id);
		this.logContactForm.reset();
	}
}