export class Forecast {
  timeSeries: TimeSeriesEntry[];
}

export class TimeSeriesEntry {
  validTime: Date;

  temperature: number;
  precipitation: number;
  imageUrl: string;
}
