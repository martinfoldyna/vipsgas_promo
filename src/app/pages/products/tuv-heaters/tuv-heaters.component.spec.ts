import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuvHeatersComponent } from './tuv-heaters.component';

describe('TuvHeatersComponent', () => {
  let component: TuvHeatersComponent;
  let fixture: ComponentFixture<TuvHeatersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuvHeatersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuvHeatersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
