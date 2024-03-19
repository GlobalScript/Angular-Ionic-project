import { TestBed } from '@angular/core/testing';

import { MoodChartService } from './mood-chart.service';

describe('MoodChartService', () => {
  let service: MoodChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoodChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
