import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routes } from './app.routes';
import { AgmCoreModule } from 'angular2-google-maps/core';


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

//Services
import { HttpService } from './services/httpService/http.service';
import { ConfigService } from './services/configService/config.service';
import { PlaceService } from './services/placeService/place.service';

//Pipes
import { SearchPipe } from './pipes/search/search.pipe';






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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB7f8eOx6FUR6s_OeA8KxwHX8-rTrKt1tE'
    }),
  ],
  providers: [
    ConfigService,
    HttpService,
    PlaceService,
    {provide: APP_BASE_HREF, useValue : '/' }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
