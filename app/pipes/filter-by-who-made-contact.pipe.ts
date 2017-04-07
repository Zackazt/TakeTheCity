import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'filterbywhomadecontact' })

export class FilterByWhoMadeContactPipe{
	transform(value){   
		console.log(value.user_who_made_contact);
		return value.sort(this.compare);
	}

	compare(a,b) {
		if (a.user_who_made_contact < b.user_who_made_contact)
		    return -1;
		if (a.user_who_made_contact > b.user_who_made_contact)
		    return 1;
		return 0;
	}                                   	                                               
}