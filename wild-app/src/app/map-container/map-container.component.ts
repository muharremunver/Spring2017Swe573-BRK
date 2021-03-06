import { Component, Input, Output, EventEmitter, OnInit, NgZone, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { AgmCoreModule, MapsAPILoader } from 'angular2-google-maps/core';
import {} from '@types/googlemaps';

declare var google: any;



@Component({
  selector: 'map-container',
  templateUrl: './map-container.component.html'
})
export class MapContainerComponent {

	private _latitude: number;
	private _longitude: number;
  	@ViewChild('searchElem') searchElementRef: ElementRef;
	
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
     *  Ctor.
	 */
  	constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone){}

	/**
	 *	Triggered when map clicked.
	 */
	private mapClicked($event: MouseEvent) {

      	this.latitude = $event['coords'].lat,
      	this.longitude = $event['coords'].lng
  	}

	/**
	 *	Sets current location of user to pin on map.
	 */
	public setCurrentPosition() {

    	if ("geolocation" in navigator) {
      		
      		navigator.geolocation.getCurrentPosition((position) => {

        			this._latitude = position.coords.latitude;
        			this._longitude = position.coords.longitude;
      			}
  			);
    	}
  	}

  	ngAfterViewInit() {

	  	// Initialize search functionality.
	    this.mapsAPILoader.load().then(() => {
	      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
	        types: ["address"]
	      });
	      autocomplete.addListener("place_changed", () => {
	        this.ngZone.run(() => {
	          
	          //get the place result
	          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

	          //verify result
	          if (place.geometry === undefined || place.geometry === null)
	            return;

	          this.latitude = place.geometry.location.lat();
	          this.longitude = place.geometry.location.lng();
	        });
	      });
	    });
  	}	
}
