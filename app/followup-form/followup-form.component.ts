import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {FollowupFormService} from './followup-form.service';

@Component({
    selector: 'followup-form',
    templateUrl: './followup-form.component.html',
    styleUrls: ['./followup-form.component.css']
})

export class FollowupFormComponent {
	followupForm: FormGroup;

	// testIterator = 0;

	constructor(fb: FormBuilder, private followUpFormService: FollowupFormService){
		this.followupForm = fb.group({
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
	}

	submitFollowUpForm(){
		var newPersonObject = {
			"first_name":             this.followupForm.controls['firstName'].value,
	        "last_name":               this.followupForm.controls['lastName'].value,
	        "email":                      this.followupForm.controls['email'].value,
	        "needs": 					  this.followupForm.controls['needs'].value,
	        "accepted_christ":   this.followupForm.controls['acceptedChrist'].value,
	        "received_healing": this.followupForm.controls['receivedHealing'].value,
	        "which_outreach":          this.followupForm.controls['outreach'].value,
	        "street_number":       this.followupForm.controls['streetNumber'].value,
	        "street_name":           this.followupForm.controls['streetName'].value,
	        "zipcode":                  this.followupForm.controls['zipcode'].value,
	        "city_name":               this.followupForm.controls['cityName'].value,
	        "state_abbreviation":         this.followupForm.controls['state'].value,
		}

		if(newPersonObject.accepted_christ != true){
			newPersonObject.accepted_christ = false;
		}
		if(newPersonObject.received_healing != true){
			newPersonObject.received_healing = false;
		}

		var followUpFormObservable = this.followUpFormService.submitPerson(newPersonObject);
		followUpFormObservable.subscribe(data => {
			console.log(data);
			// this.testSubmit(newPersonObject);
		}); //Some sort of confirmation.
	}

	// testSubmit(newPersonObject){
	// 	var followUpFormObservable = this.followUpFormService.submitPerson(newPersonObject);
	// 	followUpFormObservable.subscribe(data => {
	// 		this.testIterator++;
	// 		console.log(this.testIterator);
	// 		this.submitFollowUpForm();
	// 	});
	// }
}