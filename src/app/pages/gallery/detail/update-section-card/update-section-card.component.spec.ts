import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSectionCardComponent } from './update-section-card.component';

describe('UpdateSectionCardComponent', () => {
  let component: UpdateSectionCardComponent;
  let fixture: ComponentFixture<UpdateSectionCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSectionCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSectionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
