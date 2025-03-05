import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBudgetComponent } from './update-budget.component';

describe('UpdateBudgetComponent', () => {
  let component: UpdateBudgetComponent;
  let fixture: ComponentFixture<UpdateBudgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateBudgetComponent]
    });
    fixture = TestBed.createComponent(UpdateBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
