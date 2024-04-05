import {TestBed} from '@angular/core/testing';

import {BalanceChartService} from './balance-chart.service';

describe('BalanceChartService', () => {
  let service: BalanceChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BalanceChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
