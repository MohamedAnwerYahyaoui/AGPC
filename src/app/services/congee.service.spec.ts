import { TestBed } from '@angular/core/testing';

import { CongeeService } from './congee.service';

describe('CongeeService', () => {
  let service: CongeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CongeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
