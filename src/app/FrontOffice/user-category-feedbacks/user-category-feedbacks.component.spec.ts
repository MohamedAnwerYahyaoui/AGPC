import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCategoryFeedbacksComponent } from './user-category-feedbacks.component';

describe('UserCategoryFeedbacksComponent', () => {
  let component: UserCategoryFeedbacksComponent;
  let fixture: ComponentFixture<UserCategoryFeedbacksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCategoryFeedbacksComponent]
    });
    fixture = TestBed.createComponent(UserCategoryFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
