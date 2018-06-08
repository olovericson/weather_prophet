import { Component, OnInit } from '@angular/core';
import * as Plotly from 'plotly.js';
import {Config, Data, Layout} from 'plotly.js';

@Component({
  selector: 'app-forecast-graph',
  templateUrl: './forecast-graph.component.html'
})
export class ForecastGraphComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    Plotly.plot('plotlyDiv',
      [{
              x: [1, 2, 3, 4, 5],
              y: [1, 2, 4, 8, 16]
            }],
      { margin: { t: 0 } }
      );
  }

}
