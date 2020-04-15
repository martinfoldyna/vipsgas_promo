import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCardComponent } from './category-card/category-card.component';
import {NbCardModule, NbIconModule} from "@nebular/theme";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [CategoryCardComponent],
    exports: [
        CategoryCardComponent
    ],
  imports: [
    CommonModule,
    NbCardModule,
    RouterModule,
    NbIconModule
  ]
})
export class CardsModule { }
