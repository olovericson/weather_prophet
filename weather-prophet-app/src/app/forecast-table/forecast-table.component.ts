import { Component, OnInit, Input } from '@angular/core';
import {Forecast, TimeSeriesEntry} from "../forecast";
import moment = require("moment");

@Component({
  selector: 'app-forecast-table',
  templateUrl: './forecast-table.component.html',
  styleUrls: ['./forecast-table.component.css']
})
export class ForecastTableComponent implements OnInit {
  @Input() smhiForecast: Forecast;
  @Input() yrForecast: Forecast;
  @Input() longTermYrForecast: Forecast;

  doneLoading: boolean = false;

  get forecasts(): any {
    if (this.smhiForecast && this.yrForecast) {
      console.log(this.smhiForecast);
      console.log(this.yrForecast);
      this.doneLoading = true;
      const forecasts = this.smhiForecast.timeSeries.map(smhi => {
        let yrForecast = this.yrForecast.timeSeries.find((y: TimeSeriesEntry) => {
          return y.validTime.isSame(smhi.validTime);
        });

        if (!yrForecast) {
          yrForecast = this.longTermYrForecast.timeSeries.find((y: TimeSeriesEntry) => {
            return y.validTime.isSame(smhi.validTime);
          });
        }

        if (!yrForecast) {
          yrForecast = {validTime: moment(), imageUrl: 'assets/images/no_image.png', precipitation: NaN, temperature: NaN};
        }
        return {
          time: smhi.validTime,
          entries: [smhi, yrForecast]
        };
      });

      return forecasts;
    }
    return undefined;
  }


  constructor() { }

  ngOnInit() {
  }

  formatDate(date: Date): string {
    moment.locale('sv');
    moment.updateLocale('sv', {
      calendar : {
        lastDay : '[Igår] H:mm',
        sameDay : '[Idag] H:mm',
        nextDay : '[Imorgon] H:mm',
        lastWeek : '[Förra] dddd H:mm',
        nextWeek : 'dddd H:mm',
        sameElse : 'Do MMM H:mm'
      }
    });

    return moment(date).local().locale('sv').calendar();
  }
}
