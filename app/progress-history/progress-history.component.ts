import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {ContactManagementSystemService} from '../contact-management-system/contact-management-system.service';
import {AuthorizationService} from '../authorization/authorization.service';
import {ProgressHistoryService} from './progress-history.service';

@Component({
    selector: 'progress-history',
    templateUrl: './progress-history.component.html',
    styleUrls: ['./progress-history.component.css']
})

export class ProgressHistoryComponent implements OnInit{

	progressHistory;
	hasLoadedProgressHistory = false;
	@Output() progressHistoryDoneLoading = new EventEmitter();

	constructor(
		private progressHistoryService: ProgressHistoryService, 
		private contactManagementSystemService: ContactManagementSystemService){}

	ngOnInit(){
		var progressHistoryObservable = this.progressHistoryService.getProgressHistory(this.contactManagementSystemService.getPerson().id);
		progressHistoryObservable.subscribe(data => {
			this.progressHistory = data;
			this.progressHistoryService.setProgressHistory(this.progressHistory);
			this.hasLoadedProgressHistory = true;
			this.progressHistoryDoneLoading.emit();
		});
	}
	changeDetect(){
		this.progressHistory = this.progressHistoryService.getLocalProgressHistory();
	}

}