import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentialProjectComponent } from './residential-project.component';

describe('ResidentialProjectComponent', () => {
  let component: ResidentialProjectComponent;
  let fixture: ComponentFixture<ResidentialProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResidentialProjectComponent]
    });
    fixture = TestBed.createComponent(ResidentialProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
