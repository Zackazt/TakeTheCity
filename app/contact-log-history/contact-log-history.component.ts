import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {ContactManagementSystemService} from '../contact-management-system/contact-management-system.service';

@Component({
    selector: 'contact-log-history',
    templateUrl: './contact-log-history.component.html',
    styleUrls: ['./contact-log-history.component.css']
})

export class ContactLogHistoryComponent implements OnInit{

	person;
	doneLoading = false;

	constructor(private contactManagementSystemService: ContactManagementSystemService){}

	ngOnInit(){
		this.person = this.contactManagementSystemService.getPerson();
		this.doneLoading = true;
	}

	onContactHistoryClick(id){
		var detailRows = document.getElementsByClassName('detail-row');
		var detailRow = document.getElementById('detail-row-' + id);
		if(detailRow.classList.contains('hidden')){
			for(var i = 0; i < detailRows.length; i++){
				detailRows[i].classList.add('hidden');
			}
			detailRow.classList.remove('hidden');
		}else{
			detailRow.classList.add('hidden');
		}
	}
}