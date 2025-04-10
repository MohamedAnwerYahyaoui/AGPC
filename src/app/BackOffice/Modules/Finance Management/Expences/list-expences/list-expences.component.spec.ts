import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExpencesComponent } from './list-expences.component';

describe('ListExpencesComponent', () => {
  let component: ListExpencesComponent;
  let fixture: ComponentFixture<ListExpencesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListExpencesComponent]
    });
    fixture = TestBed.createComponent(ListExpencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
