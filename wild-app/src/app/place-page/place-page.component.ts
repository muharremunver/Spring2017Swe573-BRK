import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from '../services/spinnerService/spinner.service';
import { HttpService, ContentTypes } from '../services/httpService/http.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';



@Component({
  selector: 'app-place-page',
  templateUrl: './place-page.component.html'
})
export class PlacePageComponent implements OnInit {

	private _latitude: number;
	private _longitude: number;
	private _place:Object;
	private _comments: Array<any> = [];
	private _images: Array<any> = [];

	private _isTweetPopupVisible:boolean;


	/**
	 * Ctor.
	 */
    constructor( private route: ActivatedRoute, private router: Router, private spinner: SpinnerService, 
    	private httpService: HttpService, private _toastr: ToastsManager, vcr: ViewContainerRef) {

    	this._toastr.setRootViewContainerRef(vcr);
    }

    /**
     *	On init callback.
     */
  	ngOnInit() {

	    this.route
	      .queryParams
	      .subscribe(params => {
	        
	        this.spinner.show();
	        this._latitude = Number(params.placeLatitude);
	        this._longitude = Number(params.placeLongitude);
	        this._place = {
				name: params.placeName,
				latitude: params.placeLatitude,
				longitude: params.placeLongitude,
				locationLatitude: params.latitude,
				locationLongitude: params.longitude
	        };

	        // Get tweets
	        let url = '/places/detail?lat=' + this._latitude + '&long=' + this._longitude;
    		this.httpService.get(url, ContentTypes.JSON).subscribe((result)=> {
    			
    			if(result.code == 200) {
    				this._comments = result.data.tweets;
    				this._images = result.data.media;

    				if(this._images && this._images.length > 0){
    					this._images[0]['visible'] = true;
    				}
    			} else {
    				this._toastr.error("Something went wrong!","Error!");
    			}

      			this.spinner.hide();
	    	});
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

	/**
	 *	Triggered when twitter icon is clicked.
	 */
	clickTweetButton(){

		this._isTweetPopupVisible = !this._isTweetPopupVisible;
	}

	/**
	 *	Triggered when send tweet button is clicked.
	 */
	sendTweet(text){

        let url = '/twitter/send';
        let body = {
        	text: text
        }

        this.clickTweetButton();
        this.spinner.show();
	    this.httpService.post(url, body, ContentTypes.JSON).subscribe((result)=> {

	    	if(result.code != 200)
	    		this._toastr.error("Something went wrong!","Error!");

      		this.spinner.hide();
	    });
	}

	/**
	 *	Triggered when a comment from list is selected.
	 */
	selectComment(tweet){

		this.router.navigate(['/profile'], {
			queryParams: {
				userID: tweet.user.id,
				placeName: this._place['name'],
				placeLatitude: this._place['latitude'],
				placeLongitude: this._place['longitude'],
				latitude: this._place['locationLatitude'],
				longitude: this._place['locationLongitude']
			}
		});
	}	
}
