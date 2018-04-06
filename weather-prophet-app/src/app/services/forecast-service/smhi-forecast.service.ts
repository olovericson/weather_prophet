import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Location } from '../../location';
import {Forecast} from '../../forecast';
import {ForecastService} from './forecast-service';
import * as moment from 'moment';

@Injectable()
export class SmhiForecastService implements ForecastService {
  constructor(private http: HttpClient) { }

  get_forecast_for_location(location: Location): Observable<Forecast> {
    const url = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/' +
      (Math.round(location.lon * 1000) / 1000) +
      '/lat/' +
      (Math.round(location.lat * 1000) / 1000) +
      '/data.json';

    return this.http.get(url)
      .map(x => {
        function getParameterValue(y, t: string) {
          return y['parameters'].find(z => z.name === t)['values'][0];
        }

        return {
          timeSeries: x['timeSeries'].map(y => {
            const weatherSymbol = getParameterValue(y, 'Wsymb2');
            const date = moment(y['validTime']);

            return {
              validTime: date,
              temperature: getParameterValue(y, 't'),
              precipitation: getParameterValue(y, 'pmean'),
              imageUrl: `assets/images/smhi/${weatherSymbol}.png`
            };
          })
        };
      });
  }


}

