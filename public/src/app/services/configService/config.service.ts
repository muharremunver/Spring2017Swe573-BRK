import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'


@Injectable()
export class ConfigService {

	private _config: Object;
 	
 	/*
 	 *	Ctor.
 	 */
 	constructor(private http: Http) {
 		
 	}
 	
 	/*
 	 *	Loads config file.
 	 */
 	public load() {

 		return new Promise((resolve, reject) => {

			this.http.get('../../../config.json')
			.map(res => res.json())
			.subscribe((data) => {
				
				this._config = data;
				resolve(true);
			});
 		});
 	}
 	
 	/*
 	 *	Returns value of specified key.
 	 */
 	public get(key: any) {

   		return this._config[key];
 	}
 }
