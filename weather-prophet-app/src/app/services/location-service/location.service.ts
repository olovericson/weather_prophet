import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ForecastLocation } from '../../forecastLocation';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LocationService {

  constructor(private http: HttpClient) { }

  get_locations = function(): Observable<ForecastLocation[]> {
    return of([
      {name: 'Falun', region: 'Dalarna', country: 'Sweden', lat: 60.60168006, lon: 15.62356712},
      {name: 'Färnäs', region: 'Dalarna', country: 'Sweden', lat: 61.00051429, lon: 14.62753867},
      {name: 'Alfta', region: 'Gävleborg', country: 'Sweden', lat: 61.34445718, lon: 16.05605412}
    ]);
  };

  searchLocations(term: string): Observable<ForecastLocation[]> {
    if (!term.trim()) {
      return of([]);
    }

    const url = `http://api.geonames.org/searchJSON?formatted=true&q=${term}&maxRows=5&lang=en&username=weather_prophet&style=full&country=se`;
    return this.http.get(url).map(x => {
      return x['geonames'].map(y => {
        return {
          name: y['name'],
          country: y['countryName'],
          region: y['adminName1'],
          lat: y['lat'],
          lon: y['lng']
        };
      });
    });
  }
}
