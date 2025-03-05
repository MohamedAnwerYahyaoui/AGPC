import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChantierComponent } from './add-chantier.component';

describe('AddChantierComponent', () => {
  let component: AddChantierComponent;
  let fixture: ComponentFixture<AddChantierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddChantierComponent]
    });
    fixture = TestBed.createComponent(AddChantierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
