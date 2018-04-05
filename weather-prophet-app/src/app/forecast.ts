export class Forecast {
  timeSeries: TimeSeriesEntry[];
}

class TimeSeriesEntry {
  validTime: Date;
  parameters: TimeSeriesEntryParameter[];

  temperature: number;
  cloudiness: string;
  imageUrl: string;
}

class TimeSeriesEntryParameter {
  name: string;
  levelType: string;
  level: number;
  values: number[];
}
