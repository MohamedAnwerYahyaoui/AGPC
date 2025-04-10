import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFournisseursComponent } from './list-fournisseurs.component';

describe('ListFournisseursComponent', () => {
  let component: ListFournisseursComponent;
  let fixture: ComponentFixture<ListFournisseursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFournisseursComponent]
    });
    fixture = TestBed.createComponent(ListFournisseursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
