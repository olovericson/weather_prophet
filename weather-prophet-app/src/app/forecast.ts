import * as moment from 'moment';

export class Forecast {
  timeSeries: TimeSeriesEntry[];
}

export class TimeSeriesEntry {
  validTime: moment.Moment;

  temperature: number;
  precipitation: number;
  imageUrl: string;
}
