import { Injectable } from '@angular/core';
import { Location } from './location';

@Injectable()
export class LocationService {

  constructor() { }

  get_locations = function(): Location[] {
    return [
      {name: 'Falun'},
      {name: 'Färnäs'},
      {name: 'Alfta'}
    ];
  };
}
