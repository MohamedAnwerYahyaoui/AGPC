import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialProjectComponent } from './commercial-project.component';

describe('CommercialProjectComponent', () => {
  let component: CommercialProjectComponent;
  let fixture: ComponentFixture<CommercialProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommercialProjectComponent]
    });
    fixture = TestBed.createComponent(CommercialProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
