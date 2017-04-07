import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {ContactManagementSystemService} from '../contact-management-system/contact-management-system.service';
import {AuthorizationService} from '../authorization/authorization.service';
import {ProgressUpdateService} from '../progress-update/progress-update.service';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {ProgressHistoryService} from '../progress-history/progress-history.service';

@Component({
    selector: 'progress-update',
    templateUrl: './progress-update.component.html',
    styleUrls: ['./progress-update.component.css']
})

export class ProgressUpdateComponent implements OnInit{

	updateProgressForm: FormGroup;
	@Output() hasUpdatedProgress = new EventEmitter();
	selectedOption = "Select Option";
	person;
	doneLoadingPerson = false;

	constructor(
		fb: FormBuilder,
		private contactManagementService: ContactManagementSystemService,
		private progressUpdateService:    ProgressUpdateService,
		private progressHistoryService: ProgressHistoryService
		){
		this.updateProgressForm = fb.group({
			progressStep: ['', Validators.nullValidator]
		});
	}

	ngOnInit(){
		this.person = this.contactManagementService.getPerson();
		this.doneLoadingPerson = true;
	}
	submitProgressUpdate(){
		var progressUpdateObservable = this.progressUpdateService.submitNewProgress(this.person.id, this.selectedOption);
		progressUpdateObservable.subscribe(data =>{
			console.log(data);
			this.progressHistoryService.updateLocalProgressHistory(data[0]);
			this.updatePerson();
		});
	}
	updatePerson(){
		var mappedUpdate = this.progressUpdateService.mapProgressLevelToStep(this.selectedOption);
		var updateUserObservable = this.progressUpdateService.updateUserProgress(this.person.id, mappedUpdate);
		updateUserObservable.subscribe(data =>{
			this.contactManagementService.updateLocalPeopleListAfterProgressUpdate(this.person.id, 
				mappedUpdate['progress_level'], mappedUpdate['progress_percentage']);
			this.hasUpdatedProgress.emit();
		});
	}

}