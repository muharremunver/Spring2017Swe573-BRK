import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
})
export class PlaceListComponent {

	latitude: number;
	longitude: number;
	places: Array<any> = [
		{name: 'BRK'},{name: 'BRK'},{name: 'BRK'},{name: 'BRK'},{name: 'BRK'},{name: 'BRK'},{name: 'BRK'},{name: 'BRK'},
		{name: 'BRK'},{name: 'BRK'},{name: 'BRK'},{name: 'BRK'},{name: 'BRK'},{name: 'BRK'},{name: 'BRK'},{name: 'BRK'},
		{name: '333'},
	];
	tabs: Array<any> = [
		{text: 'List', header: 'Places'},
		{text: 'Map', header: 'Map'},
		{text: 'About', header: 'About'},
	];
	activeTab:any = this.tabs[0];

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
	        this.activeTab = this.tabs[0];
	    });
	}


	/**
	 *	Triggered when a tab is clicked.
	 */
	 clickTab(tab: any) {

	 	this.activeTab = tab;

	 }

	/**
	 *	Triggered when an item from list is selected.
	 */
	 selectPlace(place: any) {

        this.router.navigate(['/place'], {
			queryParams : { 
				name: place.name 
			}
      	});
	 }
}
