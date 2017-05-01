import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from '../services/spinnerService/spinner.service';


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
	images: Array<any> = [
		{
			src: "http://babylon.com.tr/content/images/proxy-images/kilyos-galeri-40.jpg",             
			visible: true
		},
		{
			src:'https://cdn.getyourguide.com/niwziy2l9cvz/3Nl5nGC5fq2CQ0O42awIwq/0cff0ba6cc53c2e0f9c153e820fcc8d0/berlin-Brandenburg-Gate-1112x630.jpg',
            visible: false
		}
	];


	/**
	 * Ctor.
	 */
    constructor( private route: ActivatedRoute, private router: Router, private spinner: SpinnerService) {}

    /**
     *	On init callback.
     */
  	ngOnInit() {

	    this.route
	      .queryParams
	      .subscribe(params => {
	        
	        this.spinner.show();
	        this._latitude = Number(params.latitude);
	        this._longitude = Number(params.longitude);
	        this._place = {
				name: params.placeName,
				latitude: params.placeLatitude,
				longitude: params.placeLongitude
	        };

	        this.spinner.hide();
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
