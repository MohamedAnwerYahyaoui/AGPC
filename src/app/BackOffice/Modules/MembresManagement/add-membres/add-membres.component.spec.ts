import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMembresComponent } from './add-membres.component';

describe('AddMembresComponent', () => {
  let component: AddMembresComponent;
  let fixture: ComponentFixture<AddMembresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMembresComponent]
    });
    fixture = TestBed.createComponent(AddMembresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
