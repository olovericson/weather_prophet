import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Location } from '../../location';
import {Forecast} from '../../forecast';

@Injectable()
export class SmhiForecastService {
  private weatherSymbols = {
    '1':	'Clear sky',
    '2': 'Nearly clear sky',
    '3':	'Variable cloudiness',
    '4':	'Halfclear sky',
    '5':	'Cloudy sky',
    '6':	'Overcast',
    '7':	'Fog',
    '8':	'Light rain showers',
    '9':	'Moderate rain showers',
    '10':	'Heavy rain showers',
    '11':	'Thunderstorm',
    '12':	'Light sleet showers',
    '13':	'Moderate sleet showers',
    '14':	'Heavy sleet showers',
    '15':	'Light snow showers',
    '16':	'Moderate snow showers',
    '17':	'Heavy snow showers',
    '18':	'Light rain',
    '19':	'Moderate rain',
    '20':	'Heavy rain',
    '21':	'Thunder',
    '22':	'Light sleet',
    '23':	'Moderate sleet',
    '24':	'Heavy sleet',
    '25':	'Light snowfall',
    '26':	'Moderate snowfall',
    '27':	'Heavy snowfall'
  }

  constructor(private http: HttpClient) { }

  get_forecast_for_location(location: Location): Observable<Forecast> {
    const url = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/' +
      (Math.round(location.lon * 1000) / 1000) +
      '/lat/' +
      (Math.round(location.lat * 1000) / 1000) +
      '/data.json';

    return this.http.get(url)
      .map(x => {
        return {
          timeSeries: x['timeSeries'].map(y => {
            const weatherSymbol = y['parameters'].find(z => z.name === 'Wsymb2')['values'][0];
            return {
              parameters: y['parameters'],
              validTime: y['validTime'],
              temperature: y['parameters'].find(z => z.name === 't')['values'][0],
              cloudiness: this.weatherSymbols[weatherSymbol],
              imageUrl: `assets/images/smhi/${weatherSymbol}.png`
            };
          })
        };
      });
  }


}

