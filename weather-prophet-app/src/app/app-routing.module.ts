import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsForecastComponent } from './locations-forecast/locations-forecast.component'

const routes: Routes = [
  { path: 'forecasts', component: LocationsForecastComponent },
  { path: '', redirectTo: '/forecasts', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
