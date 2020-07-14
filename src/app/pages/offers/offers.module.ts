import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OffersComponent} from "./offers.component";
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSpinnerModule
} from "@nebular/theme";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CardsModule} from "../cards/cards.module";



@NgModule({
  declarations: [OffersComponent],
    imports: [
        CommonModule,
        NbInputModule,
        FormsModule,
        ReactiveFormsModule,
        NbCardModule,
        NbButtonModule,
        NbSpinnerModule,
        NbIconModule,
        NbAlertModule,
        CardsModule
    ]
})
export class OffersModule { }
