import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsForecastComponent } from './locations-forecast.component';

describe('LocationsForecastComponent', () => {
  let component: LocationsForecastComponent;
  let fixture: ComponentFixture<LocationsForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationsForecastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
