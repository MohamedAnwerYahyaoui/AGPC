import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateChantierComponent } from './update-chantier.component';

describe('UpdateChantierComponent', () => {
  let component: UpdateChantierComponent;
  let fixture: ComponentFixture<UpdateChantierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateChantierComponent]
    });
    fixture = TestBed.createComponent(UpdateChantierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
