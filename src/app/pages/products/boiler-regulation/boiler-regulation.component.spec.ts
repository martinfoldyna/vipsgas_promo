import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoilerRegulationComponent } from './boiler-regulation.component';

describe('BoilerRegulationComponent', () => {
  let component: BoilerRegulationComponent;
  let fixture: ComponentFixture<BoilerRegulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoilerRegulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoilerRegulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
