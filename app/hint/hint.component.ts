import { Component, Input } from '@angular/core';


@Component({
    selector: 'hint',
    templateUrl: './hint.component.html',
    styleUrls: ['./hint.component.css']
})

export class HintComponent{
	@Input() hintText;
}