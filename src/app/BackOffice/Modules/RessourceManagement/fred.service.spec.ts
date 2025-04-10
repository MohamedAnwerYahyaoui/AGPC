import { TestBed } from '@angular/core/testing';

import { FredService } from './fred.service';

describe('FredService', () => {
  let service: FredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
