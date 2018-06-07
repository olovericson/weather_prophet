import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Forecast, TimeSeriesEntry} from "../forecast";
import * as moment from 'moment';

@Component({
  selector: 'app-forecast-table',
  templateUrl: './forecast-table.component.html',
  styleUrls: ['./forecast-table.component.css']
})
export class ForecastTableComponent implements OnInit, OnChanges {
  @Input() smhiForecast: Forecast;
  @Input() yrForecast: Forecast;
  @Input() longTermYrForecast: Forecast;
  @Input() loading: boolean;

  ngOnChanges(changes: SimpleChanges) {
    if (this.loading){
      this.forecasts = undefined;
    } else {
      this.doForecast();
    }

  }

  forecasts: any;

  doForecast(): void {
    if (this.smhiForecast && this.yrForecast){
      this.forecasts = this.smhiForecast.timeSeries.map(smhi => {
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
    }
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
