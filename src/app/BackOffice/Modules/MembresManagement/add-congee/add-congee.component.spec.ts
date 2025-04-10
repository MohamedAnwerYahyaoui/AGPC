import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCongeeComponent } from './add-congee.component';

describe('AddCongeeComponent', () => {
  let component: AddCongeeComponent;
  let fixture: ComponentFixture<AddCongeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCongeeComponent]
    });
    fixture = TestBed.createComponent(AddCongeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
