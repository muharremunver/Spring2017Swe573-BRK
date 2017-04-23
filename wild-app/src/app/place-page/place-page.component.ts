import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-place-page',
  templateUrl: './place-page.component.html'
})
export class PlacePageComponent implements OnInit {

	latitude: number;
	longitude: number;
	header: string;
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
	        
	        this.latitude = Number(params.latitude);
	        this.longitude = Number(params.longitude);
	        this.header = params.name;
	    });
	}

    /**
     *	Triggered when back button is clicked.
     */
	clickBackButton() {

        this.router.navigate(['/places'], {
    		queryParams : { 
    			latitude: this.latitude,
    			longitude: this.longitude 
    		}
      	});
	}

}
