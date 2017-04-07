import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'name-search-box',
    templateUrl: './name-search-box.component.html',
    styleUrls: ['./name-search-box.component.css']
})

export class NameSearchBoxComponent implements OnInit{
	@Output() textUpdate = new EventEmitter();
	ngOnInit(){
		this.textUpdate.emit('');
	}
}