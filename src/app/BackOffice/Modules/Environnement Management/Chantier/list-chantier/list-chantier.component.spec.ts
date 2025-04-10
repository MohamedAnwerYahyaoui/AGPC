import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChantierComponent } from './list-chantier.component';

describe('ListChantierComponent', () => {
  let component: ListChantierComponent;
  let fixture: ComponentFixture<ListChantierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListChantierComponent]
    });
    fixture = TestBed.createComponent(ListChantierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
