import { Component } from '@angular/core';
import { HttpService, ContentTypes } from '../services/httpService/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

	/*
	 *	Ctor.
	 */
	constructor(private http: HttpService) {

	}

	/*
	 *	Authenticates user to Twitter.
	 */
	login() {

		this.http.get('/twitter', ContentTypes.URLENCODED)
			.subscribe(data => {

	            console.log(data);
    	    });
	}

}
