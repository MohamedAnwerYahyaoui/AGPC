import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCongeeComponent } from './list-congee.component';

describe('ListCongeeComponent', () => {
  let component: ListCongeeComponent;
  let fixture: ComponentFixture<ListCongeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCongeeComponent]
    });
    fixture = TestBed.createComponent(ListCongeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
