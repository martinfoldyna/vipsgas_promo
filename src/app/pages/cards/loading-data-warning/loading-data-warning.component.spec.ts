import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingDataWarningComponent } from './loading-data-warning.component';

describe('LoadingDataWarningComponent', () => {
  let component: LoadingDataWarningComponent;
  let fixture: ComponentFixture<LoadingDataWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingDataWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingDataWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
