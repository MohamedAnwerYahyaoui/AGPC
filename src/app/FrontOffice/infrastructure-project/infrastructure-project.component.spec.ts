import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfrastructureProjectComponent } from './infrastructure-project.component';

describe('InfrastructureProjectComponent', () => {
  let component: InfrastructureProjectComponent;
  let fixture: ComponentFixture<InfrastructureProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfrastructureProjectComponent]
    });
    fixture = TestBed.createComponent(InfrastructureProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
