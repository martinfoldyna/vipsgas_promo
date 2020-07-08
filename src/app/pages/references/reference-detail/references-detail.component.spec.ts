import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferencesDetailComponent } from './references-detail.component';

describe('ReferencesDetailComponent', () => {
  let component: ReferencesDetailComponent;
  let fixture: ComponentFixture<ReferencesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferencesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferencesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
