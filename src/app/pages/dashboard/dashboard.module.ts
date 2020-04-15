import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {NbCardModule} from "@nebular/theme";
import {CardsModule} from "../cards/cards.module";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    NbCardModule,
    CardsModule
  ]
})
export class DashboardModule { }
