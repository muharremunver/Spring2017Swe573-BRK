import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

	/**
	 *	Inputs
	 */
	@Input() Text: string = '';
	@Input() LeftButtonIcon: string = '';
	@Input() RightButtonIcon: string = '';
	@Input() IsLeftButtonVisible: boolean = true;

	/**
	 *	Outputs
	 */
	@Output() LeftButtonClick = new EventEmitter();
	@Output() RightButtonClick = new EventEmitter();

	/**
	 * Triggered when left button is clicked.
	 */
	clickLeftButton() {

		this.LeftButtonClick.emit();
	}

	/**
	 * Triggered when right button is clicked.
	 */
	clickRightButton() {

		this.RightButtonClick.emit();
	}

}
