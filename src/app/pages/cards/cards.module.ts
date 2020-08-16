import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCardComponent } from './category-card/category-card.component';
import {
    NbAlertModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbSpinnerModule
} from "@nebular/theme";
import {RouterModule} from "@angular/router";
import { UploadImagesComponent } from './upload-images/upload-images.component';
import {LazyLoadImageModule} from "ng-lazyload-image";
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import {ImageDetailComponent} from "./image-detail/image-detail.component";
import {EditCategoryComponent} from "../products/edit-category/edit-category.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoadingDataWarningComponent } from './loading-data-warning/loading-data-warning.component';
import {SafeHtmlPipe} from "../../@core/data/safe-html.pipe";
import {EditNewsComponent} from "../news/edit-news/edit-news.component";
import {NgxTinymceModule} from "ngx-tinymce";

@NgModule({
  declarations: [CategoryCardComponent, UploadImagesComponent, DeleteConfirmationComponent, ImageDetailComponent, EditCategoryComponent, LoadingDataWarningComponent, SafeHtmlPipe, EditNewsComponent],
  exports: [
    CategoryCardComponent,
    UploadImagesComponent,
    LoadingDataWarningComponent,
    SafeHtmlPipe,
  ],
  imports: [
    CommonModule,
    NbCardModule,
    RouterModule,
    NbIconModule,
    LazyLoadImageModule,
    NbButtonModule,
    NbInputModule,
    NbSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    NbAlertModule,
    NgxTinymceModule,

  ],
  entryComponents: [DeleteConfirmationComponent, ImageDetailComponent, EditCategoryComponent, EditNewsComponent]
})
export class CardsModule { }
