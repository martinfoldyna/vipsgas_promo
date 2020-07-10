import { NgModule } from '@angular/core';
import {NbButtonModule, NbCardModule, NbIconModule, NbMenuModule, NbSpinnerModule, NbUserModule} from '@nebular/theme';
import {DashboardModule} from './dashboard/dashboard.module';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import {MiscellaneousModule} from "./miscellaneous/miscellaneous.module";
import { PensionComponent } from './pension/pension.component';
import {FormsModule} from "@angular/forms";
import {NewsModule} from "./news/news.module";
import {VideosModule} from "./videos/videos.module";
import {OffersModule} from "./offers/offers.module";
import {ReferencesModule} from "./references/references.module";
import {NgxTinymceModule} from "ngx-tinymce";
import {CardsModule} from "./cards/cards.module";
import {LazyLoadImageModule} from "ng-lazyload-image";

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    MiscellaneousModule,
    NbCardModule,
    NbUserModule,
    FormsModule,
    NewsModule,
    VideosModule,
    OffersModule,
    ReferencesModule,
    NbButtonModule,
    NbIconModule,
    NgxTinymceModule,
    NbSpinnerModule,
    CardsModule,
    LazyLoadImageModule
  ],
  declarations: [
    PagesComponent,
    PensionComponent,
  ],

})
export class PagesModule {
}
