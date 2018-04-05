import { Component, OnInit } from '@angular/core';
import {LocationService} from '../services/location-service/location.service';
import {Location} from '../location';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-locations-forecast',
  templateUrl: './locations-forecast.component.html',
  styleUrls: ['./locations-forecast.component.css']
})
export class LocationsForecastComponent implements OnInit {
  locations: Location[];
  selectedLocation: Location;
  locations$: Observable<Location[]>;
  private searchTerms = new Subject<string>();

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.locations$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.locationService.searchLocations(term)),
    );
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  onSelect(location: Location): void {
    this.selectedLocation = location;
  }
}
