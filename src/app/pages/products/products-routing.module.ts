import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CondensingBoilersComponent} from "./condensing-boilers/condensing-boilers.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TuvHeatersComponent} from "./tuv-heaters/tuv-heaters.component";
import {TuvContainersComponent} from "./tuv-containers/tuv-containers.component";
import {BoilerRegulationComponent} from "./boiler-regulation/boiler-regulation.component";
import {HydraulicDistributorComponent} from "./hydraulic-distributor/hydraulic-distributor.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {ProductCategoryOverviewComponent} from "./product-category-overview/product-category-overview.component";
import {ProductsCategoryComponent} from "./products-category/products-category.component";

let routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'condensing-boilers',
    component: CondensingBoilersComponent,
  },
  {
    path: 'tuv-heaters',
    component: TuvHeatersComponent,
  },
  {
    path: 'tuv-containers',
    component: TuvContainersComponent,
  },
  {
    path: 'boiler-regulation',
    component: BoilerRegulationComponent,
  },
  {
    path: 'hydraulic-distributor',
    component: HydraulicDistributorComponent,
  },
  {
    path: 'category-overview',
    component: ProductCategoryOverviewComponent
  },
  {
    path: 'category/:id',
    component: ProductsCategoryComponent
  },
  {
    path: 'detail/:id',
    component: ProductDetailComponent,
  },
  {
    path: '',
    redirectTo: '/pages/products/dashboard',
  },
  {
    path: '**',
    redirectTo: '',
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule { }
