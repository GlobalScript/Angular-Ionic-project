import { TestBed } from '@angular/core/testing';

import { NotebookCrudService } from './notebook-crud.service';

describe('NotebookCrudService', () => {
  let service: NotebookCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotebookCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
