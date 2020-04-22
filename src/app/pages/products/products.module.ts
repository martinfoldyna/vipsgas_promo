import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductsComponent} from "./products.component";
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSpinnerModule
} from "@nebular/theme";
import {CardsModule} from "../cards/cards.module";
import {ProductsRoutingModule} from "./products-routing.module";
import {MiscellaneousModule} from "../miscellaneous/miscellaneous.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DashboardComponent } from './dashboard/dashboard.component';
import { TuvHeatersComponent } from './tuv-heaters/tuv-heaters.component';
import { TuvContainersComponent } from './tuv-containers/tuv-containers.component';
import { BoilerRegulationComponent } from './boiler-regulation/boiler-regulation.component';
import { HydraulicDistributorComponent } from './hydraulic-distributor/hydraulic-distributor.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductCardComponent } from './product-card/product-card.component';
import {CondensingBoilersComponent} from "./condensing-boilers/condensing-boilers.component";
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {ThemeModule} from "../../@theme/theme.module";

@NgModule({
  declarations: [ProductsComponent, DashboardComponent, CondensingBoilersComponent, TuvHeatersComponent, TuvContainersComponent, BoilerRegulationComponent, HydraulicDistributorComponent, AddProductComponent, ProductCardComponent, ProductDetailComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbInputModule,
    FormsModule,
    ReactiveFormsModule,
    CardsModule,
    ProductsRoutingModule,
    MiscellaneousModule,
    NbButtonModule,
    NbIconModule,
    NbSpinnerModule,
    NbAlertModule,
    ThemeModule,
    CKEditorModule,
  ]
})
export class ProductsModule { }
