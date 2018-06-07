import {Component, OnInit, Input, HostListener} from '@angular/core';
import { ForecastLocation } from '../forecastLocation';
import {SmhiForecastService} from '../services/forecast-service/smhi-forecast.service';
import {Forecast, TimeSeriesEntry} from '../forecast';
import * as moment from 'moment';
import {YrForecastService} from '../services/forecast-service/yr-forecast.service';
import {forkJoin} from 'rxjs/observable/forkJoin';
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  constructor(
    private smhiForecastService: SmhiForecastService,
    private yrForecastService: YrForecastService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  smhiForecast: Forecast;
  yrForecast: Forecast;
  longTermYrForecast: Forecast;
  searchVal: string = "";
  place: string;
  region: string;
  country: string;
  loading:  boolean;

  ngOnInit() {
    this.route.params.subscribe(res => {
      console.log(res);
      this.getForecast();
    });
  }

  getForecast(): void {
    this.loading = true;
    this.place = this.route.snapshot.paramMap.get('place');
    this.region = this.route.snapshot.paramMap.get('region');
    this.country = this.route.snapshot.paramMap.get('country');


    const loc: ForecastLocation = {
      country: this.country,
      region: this.region,
      name: this.place,
      lat: +this.route.snapshot.paramMap.get('lat'),
      lon: +this.route.snapshot.paramMap.get('lng')
    };

    forkJoin([
      this.yrForecastService.get_forecast_for_location(loc),
      this.yrForecastService.get_long_term_forecast_for_location(loc),
      this.smhiForecastService.get_forecast_for_location(loc)
    ])
      .subscribe(forecast => {
        this.loading = false;
        console.log("forecasts fetched");
        this.yrForecast = forecast[0];
        this.longTermYrForecast = forecast[1];
        this.smhiForecast = forecast[2];
      });
  }
}
