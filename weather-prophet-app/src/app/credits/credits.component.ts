import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {
  show = true;

  constructor() { }

  ngOnInit() {

  }

  close() {
    this.show = false;
  }
}
