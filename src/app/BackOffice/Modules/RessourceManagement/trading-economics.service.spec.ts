import { TestBed } from '@angular/core/testing';

import { TradingEconomicsService } from './trading-economics.service';

describe('TradingEconomicsService', () => {
  let service: TradingEconomicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradingEconomicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
