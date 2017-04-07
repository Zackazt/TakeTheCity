import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'namesearch' })

export class NameSearchPipe{
	transform(value, term){                                                             // Value is an array of all of the objects in the ngFor loop.
		var filteredNames = [];                                                         // Instantiate an empty array to later retun.
		for(var i = 0; i < value.length; i++){                                          // Loop through the value array.
			var stringContactDetails = value[i].first_name + " " + value[i].last_name   // Concatenate the searchable contact details. For now it's just first and last names.
			var stringContactDetails = stringContactDetails.toLowerCase();              // Connvert details to lowercase for comparrison.
			var lowerCaseTerm = term.toLowerCase();                                     // Convert term to lowercase for comparrison.
			if(stringContactDetails.includes(lowerCaseTerm)){                           // If the current object in the value array contains the substring 'term'
				filteredNames.push(value[i]);                                           // Add it to the filteredNames array.
			}
		}
		return filteredNames;                                                           // Return the filtered array.
	}
}