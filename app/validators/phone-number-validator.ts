import {FormControl, FormGroup} from "@angular/forms";

export class PhoneNumberValidators{

	static phoneNumberLength(formControl: FormControl){
		const numberLength = 10;
		console.log(formControl.value.toString().length);
		if(formControl.value.toString().length != numberLength){
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
