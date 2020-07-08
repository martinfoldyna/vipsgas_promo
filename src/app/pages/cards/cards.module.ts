import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCardComponent } from './category-card/category-card.component';
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbSpinnerModule} from "@nebular/theme";
import {RouterModule} from "@angular/router";
import { UploadImagesComponent } from './upload-images/upload-images.component';
import {LazyLoadImageModule} from "ng-lazyload-image";
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import {ImageDetailComponent} from "./image-detail/image-detail.component";
import {EditCategoryComponent} from "../products/edit-category/edit-category.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [CategoryCardComponent, UploadImagesComponent, DeleteConfirmationComponent, ImageDetailComponent, EditCategoryComponent],
  exports: [
    CategoryCardComponent,
    UploadImagesComponent,
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
  ],
  entryComponents: [DeleteConfirmationComponent, ImageDetailComponent, EditCategoryComponent]
})
export class CardsModule { }
