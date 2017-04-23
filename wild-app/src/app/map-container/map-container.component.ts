import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'map-container',
  templateUrl: './map-container.component.html'
})
export class MapContainerComponent {

	private _latitude: number;
	private _longitude: number;

	
	/**
	 *	Inputs
	 */
	@Input() 
	set latitude(value: number) {
    	this._latitude = value;
    	this.latitudeChange.emit(value); 
	}
	get latitude(): number {
    	return this._latitude; 
	}

	@Input() 
	set longitude(value: number) {
    	this._longitude = value;
    	this.longitudeChange.emit(value); 
	}
	get longitude(): number {
    	return this._longitude; 
	}


	/**
	 *	Outputs
	 */
	@Output() latitudeChange: EventEmitter<number> = new EventEmitter<number>();
	@Output() longitudeChange: EventEmitter<number> = new EventEmitter<number>();



  	/**
  	 *	Triggered when map clicked.
  	 */
	mapClicked($event: MouseEvent) {

      	this.latitude = $event['coords'].lat,
      	this.longitude = $event['coords'].lng
  	}	
}
