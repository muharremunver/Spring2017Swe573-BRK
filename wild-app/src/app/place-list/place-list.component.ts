import { Component, ViewContainerRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaceService } from '../services/placeService/place.service';
import { HttpService, ContentTypes } from '../services/httpService/http.service';
import { SearchPipe } from '../pipes/search/search.pipe'
import { SpinnerService } from '../services/spinnerService/spinner.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  providers: [ ToastsManager ]
})
export class PlaceListComponent {

	private _latitude: number;
	private _longitude: number;
	private _tabs: Array<any>;
	private _activeTab:any;
	private _places: Array<any>;
	

	/**
	 * Ctor.
	 */
    constructor( private route: ActivatedRoute, private router: Router, private placeService: PlaceService, 
    	private httpService: HttpService, private spinner: SpinnerService, 
    	private _toastr: ToastsManager, vcr: ViewContainerRef) {
    	
        this._toastr.setRootViewContainerRef(vcr);

    	this._tabs = [
			{text: 'List', header: 'Places'},
			{text: 'Map', header: 'Map'},
			{text: 'About', header: 'About'},
		];

		this._activeTab = this._tabs[0];
    }

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
	        this._activeTab = this._tabs[0];

	        // Fetch places.
            let url = '/places?lat=' + this._latitude + '&long=' + this._longitude;
		    this.httpService.get(url, ContentTypes.JSON).subscribe((result)=> {
    			
		    	if(result.code == 200) {
			      	this._places = result.data;
		      
		    	} else {

		    		this._toastr.error("Something went wrong!","Error!");
		    	}

		    	this.spinner.hide();

		    });
	    });
	}


	/**
	 *	Triggered when a tab is clicked.
	 */
	 clickTab(tab: any) {

	 	this._activeTab = tab;
	 }

	/**
	 *	Triggered when an item from list is selected.
	 */
	 selectPlace(place: any) {

        this.router.navigate(['/place'], {
			queryParams : { 
				placeName: place.name,
				placeLatitude: place.latitude,
				placeLongitude: place.longitude,
				latitude: this._latitude,
				longitude: this._longitude
			}
      	});
	 }
}
