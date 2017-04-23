import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-place-page',
  templateUrl: './place-page.component.html'
})
export class PlacePageComponent implements OnInit {

	private _latitude: number;
	private _longitude: number;
	private _place:Object;
	comments: Array<any> = [
		{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},
		{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},
		{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},
	];

	/**
	 * Ctor.
	 */
    constructor( private route: ActivatedRoute, private router: Router) {}

    /**
     *	On init callback.
     */
  	ngOnInit() {

	    this.route
	      .queryParams
	      .subscribe(params => {
	        
	        this._latitude = Number(params.latitude);
	        this._longitude = Number(params.longitude);
	        this._place = {
				name: params.placeName,
				latitude: params.placeLatitude,
				longitude: params.placeLongitude
	        };
	        
	    });
	}

    /**
     *	Triggered when back button is clicked.
     */
	clickBackButton() {

        this.router.navigate(['/places'], {
    		queryParams : { 
    			latitude: this._latitude,
    			longitude: this._longitude 
    		}
      	});
	}

}
