import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivrableFormComponent } from './livrable-form.component';

describe('LivrableFormComponent', () => {
  let component: LivrableFormComponent;
  let fixture: ComponentFixture<LivrableFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LivrableFormComponent]
    });
    fixture = TestBed.createComponent(LivrableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
