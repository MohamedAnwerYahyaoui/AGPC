import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpencesComponent } from './add-expences.component';

describe('AddExpencesComponent', () => {
  let component: AddExpencesComponent;
  let fixture: ComponentFixture<AddExpencesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddExpencesComponent]
    });
    fixture = TestBed.createComponent(AddExpencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
