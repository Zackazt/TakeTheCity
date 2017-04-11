import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import {AuthorizationService} from '../authorization/authorization.service';

@Injectable()
export class ContactManagementSystemService{

	people;
	person;

	constructor(
		private _http: Http, 
		private authorizationService: AuthorizationService){}

	//Methods specifically for getting and setting variables.
	setPerson(person){
		this.person = person;
	}
	getPerson(){
		return this.person;
	}
	getPersonById(id){
		for(var i = 0; i < this.people.length; i++){
			if(this.people[i].id == id){
				return this.people[i];
			}
		}
		return null;
	}
	setPeople(people){
		this.people = people;
	}
	getPeople(){
		return this.people;
	}

	//Methods specifically for making API calls.
	getContactList(){
		var options = this.authorizationService.getRequestHeader();
		return this._http.get("https://takethecity.herokuapp.com/api/person/", options)
			.map(res => res.json());
	}
	submitContactLog(log){
		var options = this.authorizationService.getRequestHeader();
		return this._http.post("https://takethecity.herokuapp.com/api/contact/add/", log, options)
			.map(res => res.json());
	}
	initialView(id){
		var options = this.authorizationService.getRequestHeader();
		return this._http.get("https://takethecity.herokuapp.com/api/person/view_contact/" + id + "/", options)
			.map(res => res.json());
	}
	initialContact(id){
		var options = this.authorizationService.getRequestHeader();
		var percentageUpdate = {
			"progress_percentage": 13,
			"progress_level": 1
		}
		return this._http.put("https://takethecity.herokuapp.com/api/progress/update_percentage/" + id + "/", percentageUpdate, options)
			.map(res => res.json());
	}
	initialProgressUpdate(id){
		var options = this.authorizationService.getRequestHeader();
		var progressUpdate = {
			"person": id,
			"progress_step": "Initial Contact Made"
		}
		return this._http.post("https://takethecity.herokuapp.com/api/progress/add/", progressUpdate, options)
			.map(res => res.json());
	}
	deletePerson(person){
		var options = this.authorizationService.getRequestHeader();
		return this._http.delete("https://takethecity.herokuapp.com/api/person/delete/" + person.id + "/", options)
			.map(res => res.json());
	}

	//Methods specifically for updating the local people list.
	updateLocalPeopleListAfterNewContactView(person){
		for(var i = 0; i < this.people.length; i++){
			if(this.people[i].id == person.id){
				this.people[i].is_new_contact = false;
			}
		}
	}
	updateLocalPeopleListAfterLogSubmit(log, id){
		for(var i = 0; i < this.people.length; i++){
			if(id == this.people[i].id){
				this.people[i].contacts.push(log);
			}
		}
	}
	updateLocalPeopleListAfterInitialContact(id){
		for(var i = 0; i < this.people.length; i++){
			if(id == this.people[i].id){
				this.people[i].progress_level = 1;
				this.people[i].progress_percentage = 13;
			}
		}
	}
	updateLocalPeopleListAfterProgressUpdate(id, level, percent){
		for(var i = 0; i < this.people.length; i++){
			if(id == this.people[i].id){
				this.people[i].progress_level = level;
				this.people[i].progress_percentage = percent;
			}
		}
	}
	updateLocalPeopleListAfterPersonDelete(person){
		for(var i = 0; i < this.people.length; i++){
			if(person.id == this.people[i].id){
				this.people.splice(i, 1);
			}
		}
		return this.people;
	}
	updateLocalPeopleListAfterContactUpdate(id, person){
		for(var i = 0; i < this.people.length; i++){
			if(id == this.people[i].id){
				this.people[i].first_name         =         person.first_name;
				this.people[i].last_name          =          person.last_name;
				this.people[i].email              =              person.email;
				this.people[i].needs              =              person.needs;
				this.people[i].street_name        =        person.street_name;
				this.people[i].street_number      =      person.street_number;
				this.people[i].accepted_christ    =    person.accepted_christ;
				this.people[i].received_healing   =   person.received_healing;
				this.people[i].which_outreach     =     person.which_outreach;
				this.people[i].zipcode            =            person.zipcode;
				this.people[i].city_name          =          person.city_name;
				this.people[i].state_abbreviation = person.state_abbreviation;
				this.people[i].phone_number       =       person.phone_number;
			}
		}
	}
	testReverseMethod(){
		console.log("Hapened");
		return this.people = this.people.reverse();
	}


	//Methods to return boolean values.
	havePeople(){
		if(this.people)
			return true;
		return false;
	}
}