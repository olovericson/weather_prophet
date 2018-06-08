import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LocationSearchComponent } from './location-search/location-search.component';
import { ForecastComponent } from './forecast/forecast.component';

import {LocationService} from './services/location-service/location.service';
import {SmhiForecastService} from './services/forecast-service/smhi-forecast.service';
import {YrForecastService} from './services/forecast-service/yr-forecast.service';
import { CreditsComponent } from './credits/credits.component';
import { AppRoutingModule } from './app-routing.module';
import { ForecastTableComponent } from './forecast-table/forecast-table.component';
import { ForecastVisualizationWrapperComponent } from './forecast-visualization-wrapper/forecast-visualization-wrapper.component';
import { ForecastGraphComponent } from './forecast-graph/forecast-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    LocationSearchComponent,
    ForecastComponent,
    CreditsComponent,
    ForecastTableComponent,
    ForecastVisualizationWrapperComponent,
    ForecastGraphComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    LocationService,
    SmhiForecastService,
    YrForecastService
  ],
  entryComponents: [
    ForecastTableComponent,
    ForecastGraphComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
