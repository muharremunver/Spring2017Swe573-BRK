import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tweet-popup',
  templateUrl: './tweet-popup.component.html'
})
export class TweetPopupComponent{

	private _text:string;

	/**
	 *	Outputs
	 */
	@Output() sendTweetChange: EventEmitter<string> = new EventEmitter<string>();	

	/**
	 * Ctor.
	 */
    constructor() {}

	/**
	 *	Triggered when text of input area is changed.
	 */
	changeTweetText($event){

		// Force to 140 characters.
		if($event.target.value != null && $event.target.value.length > 139)
			this._text = $event.target.value.slice(0,139);
	}

	/**
	 *	Triggered when send tweet button is clicked.
	 */
	sendTweet($event){

		this.sendTweetChange.emit(this._text);
		this._text = '';
	}

}
