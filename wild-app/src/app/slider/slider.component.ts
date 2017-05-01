import { Component, Input } from '@angular/core';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html'
})
export class SliderComponent {
	
    SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };


	/**
	 *	Input Properties.
	 */
	@Input() Content:Array<any>;


	/**
	 *	Triggered when swipe action happens.
	 */
    swipe(currentIndex: number, action = this.SWIPE_ACTION.RIGHT) {
        
        if (currentIndex > this.Content.length || currentIndex < 0) 
        	return;

        let nextIndex = 0;

        
        if (action === this.SWIPE_ACTION.RIGHT) {

            const isLast = currentIndex === this.Content.length - 1;
            nextIndex = isLast ? 0 : currentIndex + 1;
        }

        
        if (action === this.SWIPE_ACTION.LEFT) {
            
            const isFirst = currentIndex === 0;
            nextIndex = isFirst ? this.Content.length - 1 : currentIndex - 1;
        }

        this.Content.forEach((x, i) => x.visible = (i === nextIndex));
    }
}