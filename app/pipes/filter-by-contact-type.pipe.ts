import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'filterbycontacttype' })

export class FilterByContactTypePipe{
	transform(value){   
		// var filteredArray = [];

		// for(var i = 0; i < value.length; i++){
		// 	value[i].contacts = value[i].contacts.sort(this.compare);
		// 	filteredArray.push(value[i]);
		// }

		return value.sort(this.compare);
	}

	compare(a,b) {
		if (a.contacts[a.contacts.length-1].contact_type < b.contacts[b.contacts.length-1].contact_type)
		    return -1;
		if (a.contacts[a.contacts.length-1].contact_type > b.contacts[b.contacts.length-1].contact_type)
		    return 1;
		return 0;
	}                                   	                                               
}