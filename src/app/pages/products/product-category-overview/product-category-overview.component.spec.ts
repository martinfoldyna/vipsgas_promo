import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryOverviewComponent } from './product-category-overview.component';

describe('ProductCategoryOverviewComponent', () => {
  let component: ProductCategoryOverviewComponent;
  let fixture: ComponentFixture<ProductCategoryOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCategoryOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategoryOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
