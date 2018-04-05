import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Location } from '../../location';

@Injectable()
export class LocationService {

  constructor() { }

  get_locations = function(): Observable<Location[]> {
    return of([
      {name: 'Falun', region: 'Dalarna', country: 'Sweden', lat: 60.60168006, lon: 15.62356712},
      {name: 'Färnäs', region: 'Dalarna', country: 'Sweden', lat: 61.00051429, lon: 14.62753867},
      {name: 'Alfta', region: 'Gävleborg', country: 'Sweden', lat: 61.34445718, lon: 16.05605412}
    ]);
  };
}
