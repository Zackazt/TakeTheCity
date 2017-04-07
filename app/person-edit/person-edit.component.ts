import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {PersonEditService} from './person-edit.service';
import {ContactManagementSystemService} from '../contact-management-system/contact-management-system.service';

@Component({
    selector: 'person-edit',
    templateUrl: './person-edit.component.html',
    styleUrls: ['./person-edit.component.css']
})

export class PersonEditComponent {
	editContactForm: FormGroup;
	person;

	constructor(
		fb: FormBuilder, 
		private personEditService: PersonEditService,
		private contactManagementSystemService: ContactManagementSystemService){
		this.editContactForm = fb.group({
			firstName:       ['',      Validators.required],
			lastName:        ['',      Validators.required],
			email:           ['',      Validators.required],
			needs:           ['',      Validators.required],
			acceptedChrist:  ['', Validators.nullValidator],
			receivedHealing: ['', Validators.nullValidator],
			outreach:        ['',      Validators.required],
			streetNumber:    ['',      Validators.required],
			streetName:      ['', 	   Validators.required],
			cityName:        ['',	   Validators.required],
			state:           ['',	   Validators.required],
			zipcode:         ['',	   Validators.required],
		});
		this.person = this.contactManagementSystemService.getPerson();
		this.initializeInput();
	}

	initializeInput(){
		this.editContactForm.controls['firstName'   ].setValue(this.person.first_name);
		this.editContactForm.controls['lastName'    ].setValue(this.person.last_name);
		this.editContactForm.controls['email'       ].setValue(this.person.email);
		this.editContactForm.controls['needs'       ].setValue(this.person.needs);
		this.editContactForm.controls['outreach'    ].setValue(this.person.which_outreach);
		this.editContactForm.controls['streetNumber'].setValue(this.person.street_number);
		this.editContactForm.controls['streetName'  ].setValue(this.person.street_name);
		this.editContactForm.controls['cityName'    ].setValue(this.person.city_name);
		this.editContactForm.controls['state'       ].setValue(this.person.state_abbreviation);
		this.editContactForm.controls['zipcode'     ].setValue(this.person.zipcode);

		if(this.person.accepted_christ)
			this.editContactForm.controls['acceptedChrist'].setValue(true);

		if(this.person.received_healing)
			this.editContactForm.controls['receivedHealing'].setValue(true);
	}

	submitEditContactForm(){
		var updatedPersonObject = {
			"first_name":             this.editContactForm.controls['firstName'].value,
	        "last_name":               this.editContactForm.controls['lastName'].value,
	        "email":                      this.editContactForm.controls['email'].value,
	        "needs": 					  this.editContactForm.controls['needs'].value,
	        "accepted_christ":   this.editContactForm.controls['acceptedChrist'].value,
	        "received_healing": this.editContactForm.controls['receivedHealing'].value,
	        "which_outreach":          this.editContactForm.controls['outreach'].value,
	        "street_number":       this.editContactForm.controls['streetNumber'].value,
	        "street_name":           this.editContactForm.controls['streetName'].value,
	        "zipcode":                  this.editContactForm.controls['zipcode'].value,
	        "city_name":               this.editContactForm.controls['cityName'].value,
	        "state_abbreviation":         this.editContactForm.controls['state'].value,
		}

		if(!updatedPersonObject.accepted_christ){
			updatedPersonObject.accepted_christ = false;
		}else{
			updatedPersonObject.accepted_christ = true;
		}
		
		if(!updatedPersonObject.received_healing){
			updatedPersonObject.received_healing = false;
		}else{
			updatedPersonObject.received_healing = true;
		}

		var editContactFormObservable = this.personEditService.updatePerson(this.person.id, updatedPersonObject);
		editContactFormObservable.subscribe(data => {
			console.log(data);
			this.contactManagementSystemService.updateLocalPeopleListAfterContactUpdate(this.person.id, updatedPersonObject);
		});
	}
}