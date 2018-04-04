import { TestBed, inject } from '@angular/core/testing';

import { SmhiForecastService } from './smhi-forecast.service';

describe('SmhiForecastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmhiForecastService]
    });
  });

  it('should be created', inject([SmhiForecastService], (service: SmhiForecastService) => {
    expect(service).toBeTruthy();
  }));
});
