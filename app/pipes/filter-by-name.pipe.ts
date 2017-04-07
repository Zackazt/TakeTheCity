import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'filterbyname' })

export class FilterByNamePipe{
	transform(value){   
		return value.sort(this.compare);
	}

	compare(a,b) {
		if (a.first_name < b.first_name)
		    return -1;
		if (a.first_name > b.first_name)
		    return 1;
		return 0;
	}                                   	                                               
}