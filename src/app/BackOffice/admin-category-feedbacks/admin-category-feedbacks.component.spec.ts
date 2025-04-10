import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryFeedbacksComponent } from './admin-category-feedbacks.component';

describe('AdminCategoryFeedbacksComponent', () => {
  let component: AdminCategoryFeedbacksComponent;
  let fixture: ComponentFixture<AdminCategoryFeedbacksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCategoryFeedbacksComponent]
    });
    fixture = TestBed.createComponent(AdminCategoryFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
