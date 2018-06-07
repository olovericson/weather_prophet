import { Component, OnInit } from '@angular/core';
import {LocationService} from '../services/location-service/location.service';
import {ForecastLocation} from '../forecastLocation';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-locations-forecast',
  templateUrl: './location-search.component.html'
})
export class LocationSearchComponent implements OnInit {
  locations$: Observable<ForecastLocation[]>;
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
}
