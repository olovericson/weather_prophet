import { Component, OnInit, Input } from '@angular/core';
import {LocationService} from '../services/location-service/location.service';
import {ForecastLocation} from '../forecastLocation';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html'
})
export class LocationSearchComponent implements OnInit {
  locations$: Observable<ForecastLocation[]>;
  private searchTerms = new Subject<string>();
  private _searchValue: string;

  get searchValue() {
    return this._searchValue;
  }

  @Input() set searchValue(searchValue: string) {
    this._searchValue = this.searchValue;
    this.searchTerms.next(searchValue);
  };


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
