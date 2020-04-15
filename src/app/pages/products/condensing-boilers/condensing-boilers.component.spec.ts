import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondensingBoilersComponent } from './condensing-boilers.component';

describe('CondensingBoilersComponent', () => {
  let component: CondensingBoilersComponent;
  let fixture: ComponentFixture<CondensingBoilersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondensingBoilersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondensingBoilersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
