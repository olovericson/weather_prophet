import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LocationsForecastComponent } from './locations-forecast/locations-forecast.component';
import { ForecastComponent } from './forecast/forecast.component';

import {LocationService} from './services/location-service/location.service';
import {SmhiForecastService} from './services/forecast-service/smhi-forecast.service';
import {YrForecastService} from './services/forecast-service/yr-forecast.service';

@NgModule({
  declarations: [
    AppComponent,
    LocationsForecastComponent,
    ForecastComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    LocationService,
    SmhiForecastService,
    YrForecastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
