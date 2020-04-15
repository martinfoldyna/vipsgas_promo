import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HydraulicDistributorComponent } from './hydraulic-distributor.component';

describe('HydraulicDistributorComponent', () => {
  let component: HydraulicDistributorComponent;
  let fixture: ComponentFixture<HydraulicDistributorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HydraulicDistributorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HydraulicDistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
