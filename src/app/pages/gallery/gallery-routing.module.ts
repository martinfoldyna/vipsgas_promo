import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {GalleryComponent} from "./gallery.component";
import {DetailComponent} from "./detail/detail.component";

const routes: Routes = [
  {
    path: '',
    component: GalleryComponent,
  },
  {
    path: 'detail/:id',
    component: DetailComponent
  }, {
    path: '**',
    redirectTo: '/pages/gallery'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GalleryRoutingModule { }
