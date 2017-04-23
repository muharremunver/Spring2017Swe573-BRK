import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { Config } from '../../../../config';


@Injectable()
/**
 *	Service for config.
 */
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

		this._config = Config;
 	}
 	
 	/*
 	 *	Returns value of specified key.
 	 */
 	public get(key: any) {

   		return this._config[key];
 	}
 }
