import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LocationsForecastComponent } from './locations-forecast/locations-forecast.component';
import {LocationService} from './services/location-service/location.service';


@NgModule({
  declarations: [
    AppComponent,
    LocationsForecastComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    LocationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
