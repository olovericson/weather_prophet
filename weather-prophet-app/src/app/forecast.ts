export class Forecast {
  timeSeries: TimeSeriesEntry[];
}

class TimeSeriesEntry {
  validTime: Date;

  temperature: number;
  precipitation: number;
  imageUrl: string;
}
