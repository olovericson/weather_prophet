import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsForecastComponent } from './locations-forecast/locations-forecast.component'
import { ForecastComponent } from './forecast/forecast.component'

const routes: Routes = [
  { path: 'forecasts', component: LocationsForecastComponent },
  { path: 'forecasts/:country/:region/:place/lat/:lat/lng/:lng', component: ForecastComponent },
  { path: '', redirectTo: '/forecasts', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
