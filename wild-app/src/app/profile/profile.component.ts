import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {

	comments: Array<any> = [
		{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},
		{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},
		{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},
		{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},{text: 'BRK'},
	];
	fullName:string = "Bear Grylls";
	userName:string = "@beargrylls";
	webSite:string = "beargrylls.com";
	profilePic:string = "https://pbs.twimg.com/profile_images/697132535227117568/t7VqgKGd.jpg";


}
