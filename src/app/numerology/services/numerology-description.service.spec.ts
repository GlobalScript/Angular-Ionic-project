import { TestBed } from '@angular/core/testing';

import { NumerologyDescriptionService } from './numerology-description.service';

describe('NumerologyDescriptionService', () => {
  let service: NumerologyDescriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumerologyDescriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
