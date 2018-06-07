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

  @Input() set forecastLocation(value: ForecastLocation) {
    this.doneLoading = false;
    this._forecastLocation = undefined;
    if (value) {
      this.getForecast(value);
    }
    this._forecastLocation = value;
  }

  doneLoading: boolean;

  get forecastLocation(): ForecastLocation {
    return this._forecastLocation;
  }

  get forecasts(): any {
    if (this.smhiForecast && this.yrForecast) {
      console.log(this.smhiForecast);
      console.log(this.yrForecast);
      this.doneLoading = true;
      const forecasts = this.smhiForecast.timeSeries.map(smhi => {
        let yrForecast = this.yrForecast.timeSeries.find((y: TimeSeriesEntry) => {
          return y.validTime.isSame(smhi.validTime);
        });

        if (!yrForecast) {
          yrForecast = this.longTermYrForecast.timeSeries.find((y: TimeSeriesEntry) => {
            return y.validTime.isSame(smhi.validTime);
          });
        }

        if (!yrForecast) {
          yrForecast = {validTime: moment(), imageUrl: 'assets/images/no_image.png', precipitation: NaN, temperature: NaN};
        }
        return {
          time: smhi.validTime,
          entries: [smhi, yrForecast]
        };
      });

      return forecasts;
    }
    return undefined;
  }

  private _forecastLocation: ForecastLocation;

  smhiForecast: Forecast;
  yrForecast: Forecast;
  longTermYrForecast: Forecast;

  ngOnInit() {
    this.getForegast();
  }

  getForegast(): void {
    const loc: ForecastLocation = {
      country: this.route.snapshot.paramMap.get('country'),
      region: this.route.snapshot.paramMap.get('region'),
      name: this.route.snapshot.paramMap.get('place'),
      lat: +this.route.snapshot.paramMap.get('lat'),
      lon: +this.route.snapshot.paramMap.get('lng')
    };

    this.getForecast(loc);
  }

  getForecast(location: ForecastLocation): void {
    forkJoin([
      this.yrForecastService.get_forecast_for_location(location),
      this.yrForecastService.get_long_term_forecast_for_location(location),
      this.smhiForecastService.get_forecast_for_location(location)
    ])
      .subscribe(forecast => {
        this.yrForecast = forecast[0];
        this.longTermYrForecast = forecast[1];
        this.smhiForecast = forecast[2];
      });
  }

  formatDate(date: Date): string {
      moment.locale('sv');
      moment.updateLocale('sv', {
        calendar : {
          lastDay : '[Igår] H:mm',
          sameDay : '[Idag] H:mm',
          nextDay : '[Imorgon] H:mm',
          lastWeek : '[Förra] dddd H:mm',
          nextWeek : 'dddd H:mm',
          sameElse : 'Do MMM H:mm'
        }
      });

     return moment(date).local().locale('sv').calendar();
  }
}
