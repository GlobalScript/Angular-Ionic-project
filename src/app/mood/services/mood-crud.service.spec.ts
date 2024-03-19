import { TestBed } from '@angular/core/testing';

import { MoodCrudService } from './mood-crud.service';

describe('MoodCrudService', () => {
  let service: MoodCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoodCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
