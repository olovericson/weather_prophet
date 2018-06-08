import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationSearchComponent } from './location-search/location-search.component'
import { ForecastComponent } from './forecast/forecast.component'

const routes: Routes = [
  { path: 'forecasts', component: LocationSearchComponent },
  { path: 'forecasts/:country/:region/:place/lat/:lat/lng/:lng/:visualization', component: ForecastComponent },
  { path: 'forecasts/:country/:region/:place/lat/:lat/lng/:lng', component: ForecastComponent },
  { path: '', redirectTo: '/forecasts', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
