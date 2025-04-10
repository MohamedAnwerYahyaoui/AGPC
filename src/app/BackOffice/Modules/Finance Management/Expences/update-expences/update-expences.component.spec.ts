import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExpencesComponent } from './update-expences.component';

describe('UpdateExpencesComponent', () => {
  let component: UpdateExpencesComponent;
  let fixture: ComponentFixture<UpdateExpencesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateExpencesComponent]
    });
    fixture = TestBed.createComponent(UpdateExpencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
