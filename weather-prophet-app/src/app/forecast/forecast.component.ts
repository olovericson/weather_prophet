import {Component, OnInit, Input, HostListener} from '@angular/core';
import { Location } from '../location';
import {SmhiForecastService} from '../services/forecast-service/smhi-forecast.service';
import {Forecast, TimeSeriesEntry} from '../forecast';
import * as moment from 'moment';
import {YrForecastService} from '../services/forecast-service/yr-forecast.service';
import {forkJoin} from 'rxjs/observable/forkJoin';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  constructor(private smhiForecastService: SmhiForecastService, private yrForecastService: YrForecastService) { }

  @Input() set location(value: Location) {
    if (value) {
      this.getForecast(value);
    }
    this._location = value;
  }

  get location(): Location {
    return this._location;
  }

  get forecasts(): any {
    if (this.smhiForecast && this.yrForecast) {
      const forecasts = this.smhiForecast.timeSeries.map(smhi => {
        moment.locale('sv');

        let yrForecast = this.yrForecast.timeSeries.find((y: TimeSeriesEntry) => {
          return y.validTime.getTime() === smhi.validTime.getTime();
        });

        if (!yrForecast) {
          yrForecast = this.longTermYrForecast.timeSeries.find((y: TimeSeriesEntry) => {
            return y.validTime.getTime() === smhi.validTime.getTime();
          });
        }

        if (!yrForecast) {
          yrForecast = {validTime: new Date(), imageUrl: 'no_image', precipitation: NaN, temperature: NaN};
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

  private _location: Location;

  smhiForecast: Forecast;
  yrForecast: Forecast;
  longTermYrForecast: Forecast;

  ngOnInit() {
  }

  getForecast(location: Location): void {
    this.smhiForecastService.get_forecast_for_location(location)
      .subscribe(forecast => this.smhiForecast = forecast);

    forkJoin([this.yrForecastService.get_forecast_for_location(location), this.yrForecastService.get_long_term_forecast_for_location(location)])
      .subscribe(forecast => {
        this.yrForecast = forecast[0];
        this.longTermYrForecast = forecast[1];
      });
  }

  formatDate(date: Date): string {
     moment.locale('sv');
      moment.updateLocale('sv', {
        calendar : {
          lastDay : '[Igår] LT',
          sameDay : '[Idag] LT',
          nextDay : '[Imorgon] LT',
          lastWeek : '[Förra] dddd LT',
          nextWeek : 'dddd LT',
          sameElse : 'Do MMM LT'
        }
      });

     return moment(date).local().calendar();
  }
}
