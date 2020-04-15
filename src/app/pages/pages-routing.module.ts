import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NotFoundComponent} from "./miscellaneous/not-found/not-found.component";
import {PensionComponent} from "./pension/pension.component";
import {ReferencesComponent} from "./references/references.component";
import {NewsComponent} from "./news/news.component";
import {patch} from "@nebular/theme";
import {VideosComponent} from "./videos/videos.component";

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'products',
      loadChildren: () => import('./products/products.module')
        .then(m => m.ProductsModule),
    },
    {
      path: 'pension',
      component: PensionComponent,
    },
    {
      path: 'references',
      component: ReferencesComponent,
    },
    {
      path: 'news',
      component: NewsComponent,
    },
    {
      path: 'videos',
      component: VideosComponent,
    },
    {
      path: 'gallery',
      loadChildren: () => import('./gallery/gallery.module')
        .then(m => m.GalleryModule)
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
