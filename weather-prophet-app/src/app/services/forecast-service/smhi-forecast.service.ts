import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Location } from '../../location';
import {Forecast} from '../../forecast';

@Injectable()
export class SmhiForecastService {

  constructor(private http: HttpClient) { }

  get_forecast_for_location(location: Location): Observable<Forecast> {
    const url = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/' +
      Math.round(location.lon) +
      '/lat/' +
      Math.round(location.lat) +
      '/data.json';

    return this.http.get(url)
      .map(x => {
        return {
          timeSeries: x['timeSeries']
        };
      });
  }
}

