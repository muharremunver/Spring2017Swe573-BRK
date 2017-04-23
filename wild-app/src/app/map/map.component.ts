import { Component, Input } from '@angular/core';
import { Router} from '@angular/router';
import { AgmCoreModule } from 'angular2-google-maps/core';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html'
})
export class MapComponent {

	
  	
	  
	  markers:Array<any> = [];

    /**
     *  Inputs
     */    
    @Input() latitude: number = 41.12902134749509;
    @Input() longitude: number = 28.916015625; 

  	/**
  	 *	Ctor.
  	 */
  	constructor(private router: Router) {}

  	/**
  	 *	Triggered when map clicked.
  	 */
	  mapClicked($event: MouseEvent) {

	      this.latitude = $event['coords'].lat,
	      this.longitude = $event['coords'].lng
  	}

  	/**
  	 *	Opens list screen with specified location data.
  	 */
  	findPlaces() {
      
        this.router.navigate(['/places'], {
        		queryParams : { 
        			latitude: this.latitude,
        			longitude: this.longitude 
        		}
      	});
  	}
}
