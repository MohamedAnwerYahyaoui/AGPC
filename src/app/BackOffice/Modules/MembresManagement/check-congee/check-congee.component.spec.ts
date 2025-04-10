import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckCongeeComponent } from './check-congee.component';

describe('CheckCongeeComponent', () => {
  let component: CheckCongeeComponent;
  let fixture: ComponentFixture<CheckCongeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckCongeeComponent]
    });
    fixture = TestBed.createComponent(CheckCongeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
