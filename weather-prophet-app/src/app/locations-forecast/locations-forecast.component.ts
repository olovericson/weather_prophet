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

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.locations = this.locationService.get_locations();
  }
}
