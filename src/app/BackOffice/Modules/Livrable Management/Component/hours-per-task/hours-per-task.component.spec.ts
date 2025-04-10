import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoursPerTaskComponent } from './hours-per-task.component';

describe('HoursPerTaskComponent', () => {
  let component: HoursPerTaskComponent;
  let fixture: ComponentFixture<HoursPerTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HoursPerTaskComponent]
    });
    fixture = TestBed.createComponent(HoursPerTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
