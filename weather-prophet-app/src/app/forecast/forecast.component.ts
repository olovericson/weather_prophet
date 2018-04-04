import { Component, OnInit, Input } from '@angular/core';
import { Location } from '../services/location-service/location';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  constructor() { }

  @Input() location: Location;
  ngOnInit() {
  }

}
