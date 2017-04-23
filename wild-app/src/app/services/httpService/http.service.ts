import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { ConfigService } from '../configService/config.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';


@Injectable()
export class HttpService {

	public _baseUri: string;

	/**
	 *	Ctor.
	 */
	constructor(private http: Http, private config: ConfigService) { 

		if(!this._baseUri) {

            this.config.load().then(() => {
                
                this._baseUri = config.get('baseUri');    
            });

			
        }
	}


    /**
     * Generates header by populating default values. 
     */
    private getHeader(contentType: ContentTypes): Headers {

        let headers = new Headers();

        if (contentType == ContentTypes.URLENCODED)
            headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        else
            headers.append('Content-Type', 'application/json; charset=UTF-8');
        

        headers.append('Accept', 'text/html, application/xhtml+xml, */*');

        return headers;
    }

    /**
     * Seializes given object.
     * @param obj
     */
    private serializeObj(obj: any) {

        var result: any = [];
        for (var property in obj) {
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        }

        return result.join("&");
    }

    /**
     * Extracts data from response.
     * @param res - Response.
     */
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    /**
     * Handles errors.
     * @param error
     */
    private handleError(error: Response | any) {

        let errMsg: any;

        if (error instanceof Response) {

            if (error.status == 401) {

                //this.router.navigate(["login"]);
                return Observable.of("");
            }

            const body = error.json() || '';
            errMsg = body.InnerException ? body.InnerException : body;

            if (errMsg.ExceptionType == "System.UnauthorizedAccessException") {

                return Observable.of("");
            }

        } else {
            errMsg = error.message ? error.message : error.toString();
        }

        return Observable.throw(errMsg);
    }

    /**
     * Performs http get operation with provided url.
     * @param url - URL.
     */
    public get(url: string, contentType?: ContentTypes): Observable<any> {

        //this.spinner.show();
        return this.http.get(this._baseUri + url, { headers: this.getHeader(contentType) })
            .map(this.extractData)
            .catch((err: any) => this.handleError(err))
            //.finally(() => this.spinner.hide());
    }

    /**
     * Performs http post operation with given params.
     * @param url - URL.
     * @param body - Body.
     * @param contentType - ContentType (JSON, UrlEncode vs).
     */
    public post(url: string, body: any, contentType?: ContentTypes): Observable<any> {

        //this.spinner.show();
        let options = new RequestOptions({ 
        	method: RequestMethod.Post,
        	headers: this.getHeader(contentType) 
        });

        let sBody = contentType == ContentTypes.URLENCODED ? this.serializeObj(body) : JSON.stringify(body);

        return this.http.post(this._baseUri + url, sBody, options)
            .map(this.extractData)
            .catch((err: any) => this.handleError(err))
            //.finally(() => this.spinner.hide());
    }


}

export const enum ContentTypes {
    JSON,
    URLENCODED
}
