import { TestBed } from '@angular/core/testing';

import { TestEsbService } from './test-esb.service';

describe('TestEsbService', () => {
  let service: TestEsbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestEsbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
