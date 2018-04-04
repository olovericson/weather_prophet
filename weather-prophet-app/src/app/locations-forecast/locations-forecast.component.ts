import { Component, OnInit } from '@angular/core';
import {LocationService} from '../services/location-service/location.service';
import {Location} from '../services/location-service/location';

@Component({
  selector: 'app-locations-forecast',
  templateUrl: './locations-forecast.component.html',
  styleUrls: ['./locations-forecast.component.css']
})
export class LocationsForecastComponent implements OnInit {
  locations: Location[];
  selectedLocation: Location;

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.locationService.get_locations()
      .subscribe(locations => this.locations = locations);
  }

  onSelect(location: Location): void {
    this.selectedLocation = location;
  }
}
