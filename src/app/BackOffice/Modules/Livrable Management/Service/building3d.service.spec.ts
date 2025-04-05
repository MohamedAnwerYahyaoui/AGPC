import { TestBed } from '@angular/core/testing';

import { Building3dService } from './building3d.service';

describe('Building3dService', () => {
  let service: Building3dService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Building3dService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
