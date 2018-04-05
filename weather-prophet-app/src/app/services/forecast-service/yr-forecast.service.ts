import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Location} from '../../location';
import {Forecast} from '../../forecast';
import {ForecastService} from './forecast-service';
import 'x2js';
import * as X2JS from 'x2js';


@Injectable()
export class YrForecastService implements ForecastService {

  constructor(private http: HttpClient) {
  }

  get_long_term_forecast_for_location(location: Location): Observable<Forecast> {
    const url = this.getUrl(location, 'forecast');

    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    });

    return this.http.get(url, {
      headers: headers,
      responseType: 'text'
    })
      .map(x => {
        const x2js = new X2JS();

        const result = x2js.xml2js(x);
        const forecasts = result['weatherdata']['forecast']['tabular']['time'];

        return {
          timeSeries: forecasts.map(y => {
            return {
              validTime: new Date(y['_from']),
              temperature: y['temperature']['_value'],
              precipitation: y['temperature']['_value'],
              imageUrl: `assets/images/smhi/${y['symbol']['_number']}.png`
            };
          })
        };
      });
  }

  get_forecast_for_location(location: Location): Observable<Forecast> {
    const url = this.getUrl(location, 'forecast_hour_by_hour');

    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    });

    return this.http.get(url, {
      headers: headers,
      responseType: 'text'
    })
      .map(x => {
        const x2js = new X2JS();

        const result = x2js.xml2js(x);
        const forecasts = result['weatherdata']['forecast']['tabular']['time'];

        return {
          timeSeries: forecasts.map(y => {
            return {
              validTime: new Date(y['_from']),
              temperature: y['temperature']['_value'],
              precipitation: y['precipitation']['_value'],
              imageUrl: `assets/images/yr/${y['symbol']['_var']}.png`
            };
          })
        };
      });
  }

  private getUrl(location: Location, forecast: string) {
    return 'https://www.yr.no/sted/' +
      location.country + '/' +
      location.region + '/' +
      location.name + '/' +
      forecast + '.xml';
  }
}