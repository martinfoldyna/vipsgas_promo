import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductCategoryOverviewComponent } from './product-category-overview/product-category-overview.component';
import { ProductsCategoryComponent } from './products-category/products-category.component';

let routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'category/:id',
    component: ProductsCategoryComponent,
  },
  {
    path: 'detail/:id',
    component: ProductDetailComponent,
  },
  {
    path: 'category-overview',
    component: ProductCategoryOverviewComponent,
  },
  {
    path: '',
    redirectTo: '/pages/products/dashboard',
  },
  {
    path: '**',
    redirectTo: '/pages/products/dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
