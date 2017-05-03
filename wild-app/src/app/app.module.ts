import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routes } from './app.routes';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import {ToastModule, ToastOptions} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



// Components
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { AppComponent } from './app/app.component';
import { PlaceListComponent } from './place-list/place-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MapContainerComponent } from './map-container/map-container.component';
import { AboutComponent } from './about/about.component';
import { PlacePageComponent } from './place-page/place-page.component';
import { ProfileComponent } from './profile/profile.component';
import { SliderComponent } from './slider/slider.component';

//Services
import { HttpService } from './services/httpService/http.service';
import { ConfigService } from './services/configService/config.service';
import { PlaceService } from './services/placeService/place.service';
import { SpinnerService } from './services/spinnerService/spinner.service';

//Pipes
import { SearchPipe } from './pipes/search/search.pipe';
import { SpinnerComponent } from './spinner/spinner.component';
import { TweetPopupComponent } from './tweet-popup/tweet-popup.component';

// Hammer js config
export class HammerConfig extends HammerGestureConfig  {
  overrides = <any>{
      'swipe': {velocity: 0.4, threshold: 20}
  }
}

// Configure toast.
export class CustomToastOption extends ToastOptions {
  animate = 'flyRight'; // you can override any options available
  newestOnTop = false;
  positionClass = "toast-top-full-width"
}



@NgModule({
  declarations: [
    LoginComponent,
    MapComponent,
    AppComponent,
    PlaceListComponent,
    NavbarComponent,
    MapContainerComponent,
    AboutComponent,
    PlacePageComponent,
    ProfileComponent,
    SearchPipe,
    SpinnerComponent,
    SliderComponent,
    TweetPopupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB7f8eOx6FUR6s_OeA8KxwHX8-rTrKt1tE'
    }),
    BrowserAnimationsModule,
    ToastModule.forRoot()
  ],
  providers: [
    ConfigService,
    HttpService,
    PlaceService,
    SpinnerService,
    {provide: APP_BASE_HREF, useValue : '/' },
    { 
      provide: HAMMER_GESTURE_CONFIG, 
      useClass: HammerConfig 
    },
    {provide: ToastOptions, useClass: CustomToastOption}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
