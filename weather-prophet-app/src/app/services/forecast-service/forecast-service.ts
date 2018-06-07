import {ForecastLocation} from '../../forecastLocation';
import {Forecast} from '../../forecast';
import {Observable} from 'rxjs/Observable';

export interface ForecastService {
  get_forecast_for_location(location: ForecastLocation): Observable<Forecast>;
}
