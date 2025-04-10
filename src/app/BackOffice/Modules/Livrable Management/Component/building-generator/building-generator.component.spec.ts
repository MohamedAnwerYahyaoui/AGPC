import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingGeneratorComponent } from './building-generator.component';

describe('BuildingGeneratorComponent', () => {
  let component: BuildingGeneratorComponent;
  let fixture: ComponentFixture<BuildingGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuildingGeneratorComponent]
    });
    fixture = TestBed.createComponent(BuildingGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
