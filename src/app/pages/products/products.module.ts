import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductsComponent} from "./products.component";
import {
  NbAccordionModule,
  NbAlertModule,
  NbButtonModule,
  NbCardModule, NbCheckboxModule, NbContextMenuModule,
  NbIconModule,
  NbInputModule, NbListModule, NbRadioModule,
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
import {NgxTinymceModule} from "ngx-tinymce";
import {LazyLoadImageModule} from "ng-lazyload-image";
import {NgxImageGalleryModule} from "ngx-image-gallery";
import {LightboxModule} from "@ngx-gallery/lightbox";
import { ProductCategoryOverviewComponent } from './product-category-overview/product-category-overview.component';
import { ProductsCategoryComponent } from './products-category/products-category.component';

@NgModule({
  declarations: [
    ProductsComponent,
    DashboardComponent,
    CondensingBoilersComponent,
    TuvHeatersComponent,
    TuvContainersComponent,
    BoilerRegulationComponent,
    HydraulicDistributorComponent,
    AddProductComponent,
    ProductCardComponent,
    ProductDetailComponent,
    ProductCategoryOverviewComponent,
    ProductsCategoryComponent,
  ],
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
    NgxTinymceModule,
    NbContextMenuModule,
    LazyLoadImageModule,
    NbCheckboxModule,
    NgxImageGalleryModule,
    LightboxModule.withConfig({
      hasBackdrop: false,
      panelClass: 'fullscreen'
    }),
    NbRadioModule,
    NbAccordionModule,
    NbListModule,
  ],

})
export class ProductsModule { }
