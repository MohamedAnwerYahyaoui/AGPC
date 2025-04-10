import { TestBed } from '@angular/core/testing';

import { CategoryFeedbackService } from './category-feedback.service';

describe('CategoryFeedbackService', () => {
  let service: CategoryFeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryFeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
