import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RessourceManagementComponent } from './ressource-management.component';

describe('RessourceManagementComponent', () => {
  let component: RessourceManagementComponent;
  let fixture: ComponentFixture<RessourceManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RessourceManagementComponent]
    });
    fixture = TestBed.createComponent(RessourceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
