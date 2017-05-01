import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from '../services/spinnerService/spinner.service';
import { HttpService, ContentTypes } from '../services/httpService/http.service';

@Component({
  selector: 'app-place-page',
  templateUrl: './place-page.component.html'
})
export class PlacePageComponent implements OnInit {

	private _latitude: number;
	private _longitude: number;
	private _place:Object;
	private _comments: Array<any> = [];
	private _images: Array<any> = [
		{
			src: "http://babylon.com.tr/content/images/proxy-images/kilyos-galeri-40.jpg",             
			visible: true
		},
		{
			src:'https://cdn.getyourguide.com/niwziy2l9cvz/3Nl5nGC5fq2CQ0O42awIwq/0cff0ba6cc53c2e0f9c153e820fcc8d0/berlin-Brandenburg-Gate-1112x630.jpg',
            visible: false
		}
	];

	private _isTweetPopupVisible:boolean;


	/**
	 * Ctor.
	 */
    constructor( private route: ActivatedRoute, private router: Router, private spinner: SpinnerService, 
    	private httpService: HttpService) {}

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

	        // Get tweets
	        let url = '/places/detail?lat=' + this._latitude + 'long=' + this._longitude;
    		this.httpService.get(url, ContentTypes.JSON).subscribe((result)=> {
    			
    			if(result.code == 200)
    				this._comments = result.data;

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

      		this.spinner.hide();
	    });
	}

	/**
	 *	Triggered when a comment from list is selected.
	 */
	selectComment(tweet){

		this.router.navigate(['/profile'], {
			queryParams: {
				userID: tweet.user.id
			}
		});
	}	
}
