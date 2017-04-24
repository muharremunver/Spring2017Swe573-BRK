import { Component } from '@angular/core';
import { SpinnerService } from '../services/spinnerService/spinner.service';


@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html'
})
export class SpinnerComponent {

  public active: boolean;

  /**
   * Ctor.
   */
  public constructor(spinner: SpinnerService) {

    spinner.status.subscribe((status: boolean) => {
      this.active = status;
    });
  }

}