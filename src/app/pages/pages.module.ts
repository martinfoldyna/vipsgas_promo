import { NgModule } from '@angular/core';
import {NbCardModule, NbMenuModule, NbUserModule} from '@nebular/theme';
import {DashboardModule} from './dashboard/dashboard.module';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import {MiscellaneousModule} from "./miscellaneous/miscellaneous.module";
import { PensionComponent } from './pension/pension.component';
import {NgxGalleryModule} from "ngx-gallery";
import { ReferencesComponent } from './references/references.component';
import { NewsComponent } from './news/news.component';
import {FormsModule} from "@angular/forms";
import {NewsModule} from "./news/news.module";
import {GalleryModule} from "./gallery/gallery.module";
import {VideosModule} from "./videos/videos.module";

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    MiscellaneousModule,
    NbCardModule,
    NgxGalleryModule,
    NbUserModule,
    FormsModule,
    NewsModule,
    VideosModule
  ],
  declarations: [
    PagesComponent,
    PensionComponent,
    ReferencesComponent,
  ],

})
export class PagesModule {
}
