import { TestBed } from '@angular/core/testing';

import { ConstructionMaterialsService } from './construction-materials.service';

describe('ConstructionMaterialsService', () => {
  let service: ConstructionMaterialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConstructionMaterialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
