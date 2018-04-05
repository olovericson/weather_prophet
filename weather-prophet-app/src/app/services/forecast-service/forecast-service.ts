import {Location} from '../../location';
import {Forecast} from '../../forecast';
import {Observable} from 'rxjs/Observable';

export interface ForecastService {
  get_forecast_for_location(location: Location): Observable<Forecast>;
}
