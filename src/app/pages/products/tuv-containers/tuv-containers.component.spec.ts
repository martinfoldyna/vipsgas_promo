import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuvContainersComponent } from './tuv-containers.component';

describe('TuvContainersComponent', () => {
  let component: TuvContainersComponent;
  let fixture: ComponentFixture<TuvContainersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuvContainersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuvContainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
