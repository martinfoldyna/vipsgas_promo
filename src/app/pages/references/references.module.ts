import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReferencesComponent} from "./references.component";
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbSpinnerModule, NbUserModule} from "@nebular/theme";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxTinymceModule} from "ngx-tinymce";
import { ReferencesDetailComponent } from './reference-detail/references-detail.component';
import { ReferenceDashboardComponent } from './reference-dashboard/reference-dashboard.component';
import {ReferencesRoutingModule} from "./references-routing.module";
import {LazyLoadImageModule} from "ng-lazyload-image";
import {CardsModule} from "../cards/cards.module";
import {LightboxModule} from "@ngx-gallery/lightbox";



@NgModule({
  declarations: [ReferencesComponent, ReferencesDetailComponent, ReferenceDashboardComponent],
  imports: [
    ReferencesRoutingModule,
    CommonModule,
    NbInputModule,
    NbButtonModule,
    ReactiveFormsModule,
    NbCardModule,
    NgxTinymceModule,
    FormsModule,
    NbUserModule,
    NbSpinnerModule,
    NbIconModule,
    LazyLoadImageModule,
    CardsModule,
    LightboxModule,
  ]
})
export class ReferencesModule { }
