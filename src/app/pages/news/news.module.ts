import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewsComponent} from "./news.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbUserModule} from "@nebular/theme";
import {DateFnsModule} from "ngx-date-fns";

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
  ]
})
export class NewsModule { }
