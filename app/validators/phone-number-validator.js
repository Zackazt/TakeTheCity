import {FormControl, FormGroup} from "@angular/forms";

export class PhoneNumberValidators{

	static phoneNumberLength(formControl: FormControl){
		const numberLength = 10;
		if(formControl.value.length != numberLength){
			return {
				phoneNumberLength: {
					numberLength: numberLength
				}
			};
		}else{
			return null;
		}
	}
}
