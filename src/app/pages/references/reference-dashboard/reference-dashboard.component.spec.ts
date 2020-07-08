import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceDashboardComponent } from './reference-dashboard.component';

describe('ReferenceDashboardComponent', () => {
  let component: ReferenceDashboardComponent;
  let fixture: ComponentFixture<ReferenceDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenceDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
