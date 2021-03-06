import { Injectable } from '@angular/core';
import { HttpService, ContentTypes } from '../httpService/http.service';

@Injectable()
/**
 *	Service of place.
 */
export class PlaceService {

  /**
   *  Ctor.
   */
  constructor(private httpService: HttpService) { 
  }

	/**
	 * Returns list of camping areas near specified location.
	 */
	getPlaces(latitude:number, longitude: number): Array<any> {

		return new Array<any>();
	}

	/**
	 *	Gets detailed information of specified place.
	 */
	getPlace(placeID:number): Array<any> {
		return new Array<any>();
	}

}
