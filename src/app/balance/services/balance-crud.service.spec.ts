import { TestBed } from '@angular/core/testing';

import { BalanceCrudService } from './balance-crud.service';

describe('BalanceCrudService', () => {
  let service: BalanceCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BalanceCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
