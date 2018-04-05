import {Component, OnInit, Input, HostListener} from '@angular/core';
import { Location } from '../location';
import {SmhiForecastService} from '../services/forecast-service/smhi-forecast.service';
import {Forecast} from '../forecast';
import * as moment from 'moment';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  constructor(private forecastService: SmhiForecastService) { }

  @Input() set location(value: Location) {
    if (value) {
      this.getForecast(value);
    }
    this._location = value;
  }

  get location(): Location {
    return this._location;
  }

  private _location: Location;

  forecast: Forecast;

  ngOnInit() {
  }

  getForecast(location: Location): void {
    this.forecastService.get_forecast_for_location(location)
      .subscribe(forecast => this.forecast = forecast);
  }

  formatDate(date: Date): string {
     moment.locale('sv');
      moment.locale('sv', {
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
