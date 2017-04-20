import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Components
import { LoginComponent } from './login/login.component';



//Services
import { HttpService } from './services/httpService/http.service';
import { ConfigService } from './services/configService/config.service';




@NgModule({
  declarations: [
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    ConfigService,
    HttpService,
    {provide: APP_BASE_HREF, useValue : '/' }

  ],
  bootstrap: [LoginComponent]
})
export class AppModule { }
