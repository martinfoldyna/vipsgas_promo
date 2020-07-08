import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery.component';
import { DetailComponent } from './detail/detail.component';
import {GalleryRoutingModule} from "./gallery-routing.module";
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbSpinnerModule,
  NbUserModule
} from "@nebular/theme";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DateFnsModule} from "ngx-date-fns";
import { ImageDetailComponent } from '../cards/image-detail/image-detail.component';
import { UpdateSectionCardComponent } from './detail/update-section-card/update-section-card.component';
import {LazyLoadImageModule} from "ng-lazyload-image";
import {LightboxModule} from "@ngx-gallery/lightbox";
import {NgxTinymceModule} from "ngx-tinymce";

@NgModule({
  declarations: [GalleryComponent, DetailComponent, UpdateSectionCardComponent],
    imports: [
        CommonModule,
        GalleryRoutingModule,
        NbCardModule,
        NbSpinnerModule,
        ReactiveFormsModule,
        FormsModule,
        NbInputModule,
        NbButtonModule,
        NbUserModule,
        DateFnsModule,
        NbIconModule,
        LazyLoadImageModule,
        NbAlertModule,
        LightboxModule,
        NgxTinymceModule
    ],
  entryComponents: [UpdateSectionCardComponent]
})
export class GalleryModule { }
