import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Location } from './location';

@Injectable()
export class LocationService {

  constructor() { }

  get_locations = function(): Observable<Location[]> {
    return of([
      {name: 'Falun'},
      {name: 'Färnäs'},
      {name: 'Alfta'}
    ]);
  };
}
