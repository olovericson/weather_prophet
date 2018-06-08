import {Component, OnChanges, ComponentFactoryResolver, ViewContainerRef, Input} from '@angular/core';
import { ForecastTableComponent } from '../forecast-table/forecast-table.component';
import { ForecastGraphComponent } from '../forecast-graph/forecast-graph.component';
import {Forecast} from "../forecast";

@Component({
  selector: 'app-forecast-visualization-wrapper',
  templateUrl: './forecast-visualization-wrapper.component.html'
})
export class ForecastVisualizationWrapperComponent implements OnChanges {
  @Input() smhiForecast: Forecast;
  @Input() yrForecast: Forecast;
  @Input() longTermYrForecast: Forecast;
  @Input() loading: boolean;
  @Input() visualization: string;


  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnChanges() {
    this.setComponent();
  }

  setComponent() {
    console.log("A change detected in wrapper!");
    console.log(this.visualization);
    if (this.visualization == "graph"){
      const componentFactory = this.componentFactoryResolver
        .resolveComponentFactory(ForecastGraphComponent);
      this.viewContainerRef.clear();
      const component = this.viewContainerRef.createComponent(componentFactory, this.viewContainerRef.length, this.viewContainerRef.parentInjector, []);

      component.changeDetectorRef.detectChanges();
    } else {
      const componentFactory = this.componentFactoryResolver
        .resolveComponentFactory(ForecastTableComponent);
      this.viewContainerRef.clear();
      const component = this.viewContainerRef.createComponent(componentFactory, this.viewContainerRef.length, this.viewContainerRef.parentInjector, []);

      component.instance.yrForecast = this.yrForecast;
      component.instance.longTermYrForecast = this.longTermYrForecast;
      component.instance.smhiForecast = this.smhiForecast;
      component.instance.loading = this.loading;

      component.changeDetectorRef.detectChanges();
    }

  }
}
