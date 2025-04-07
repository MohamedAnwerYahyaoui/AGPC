import { TestBed } from '@angular/core/testing';

import { AssuranceService } from './assurance.service';

describe('AssuranceServiceService', () => {
  let service: AssuranceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssuranceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
