import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from '../services/spinnerService/spinner.service';
import { HttpService, ContentTypes } from '../services/httpService/http.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {

	private _comments: Array<any> = [
		{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},
		{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},
		{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},
		{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},
	];
	private _userID:number;
	private _place:Object;

	private _fullName:string = "Bear Grylls";
	private _userName:string = "@beargrylls";
	private _webSite:string = "beargrylls.com";
	private _profilePic:string = "https://pbs.twimg.com/profile_images/697132535227117568/t7VqgKGd.jpg";

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
	        this._userID = Number(params.userID);
	        this._place = {
				name: params.placeName,
				latitude: params.placeLatitude,
				longitude: params.placeLongitude
	        };

	        // Get profile
	        let url = '/twitter/profile?id=' + this._userID;
    		this.httpService.get(url, ContentTypes.JSON).subscribe((result)=> {
    			
    			if(result.code == 200) {

    				this._fullName = result.data.name;
    				this._userName =  result.data.screen_name;
    				this._webSite = result.data.entities != null && result.data.entities.urls != null
    								? result.data.entities.urls[0]['url'] 
    								: '';
    				this._profilePic = result.data.profile_background_image_url;

    			}
      			this.spinner.hide();
	    	});
	    });
	}	

    /**
     *	Triggered when follow button is clicked.
     */
	followUser() {

		let url = '/twitter/follow';
		let body = {
			id: this._userID
		};

		this.httpService.post(url, body, ContentTypes.JSON).subscribe((result) => {

			console.log(result);
			//if(result.code == 200)

		});
	}

    /**
     *	Triggered when back button is clicked.
     */
	clickBackButton() {
        this.router.navigate(['/place'], {
    		queryParams : { 
    			latitude: this._place['latitude'],
    			longitude: this._place['longitude'],
    			name: this._place['name']
    		}
      	});
	}
}
