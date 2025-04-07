import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssuranceFormComponent } from './assurance-form.component';

describe('AssuranceFormComponent', () => {
  let component: AssuranceFormComponent;
  let fixture: ComponentFixture<AssuranceFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssuranceFormComponent]
    });
    fixture = TestBed.createComponent(AssuranceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
