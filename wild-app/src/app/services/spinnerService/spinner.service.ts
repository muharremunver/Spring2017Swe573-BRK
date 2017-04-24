import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject'

/**
 *	Spinner service.
 */
@Injectable()
export class SpinnerService {

    public status: Subject<boolean> = new Subject<boolean>() ;

    private _active: boolean = false;
    
    public get active(): boolean {
        return this._active;
    }

    public set active(state: boolean) {

        this._active = state;
        this.status.next(state);
    }

    /**
     *	Shows spinner.
     */
    public show(): void {
        this.active = true;
    }

    /**
     *	Hides spinner.
     */
    public hide(): void {
        this.active = false;
    }
}