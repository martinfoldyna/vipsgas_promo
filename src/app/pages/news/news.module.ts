import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewsComponent} from "./news.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSpinnerModule,
  NbUserModule
} from "@nebular/theme";
import {DateFnsModule} from "ngx-date-fns";
import {NgxTinymceModule} from "ngx-tinymce";
import {CardsModule} from "../cards/cards.module";

@NgModule({
  declarations: [NewsComponent],
    imports: [
        CommonModule,
        FormsModule,
        NbCardModule,
        NbUserModule,
        NbInputModule,
        NbButtonModule,
        ReactiveFormsModule,
        DateFnsModule,
        NbIconModule,
        NgxTinymceModule,
        NbAlertModule,
        NbSpinnerModule,
        CardsModule
    ]
})
export class NewsModule { }
