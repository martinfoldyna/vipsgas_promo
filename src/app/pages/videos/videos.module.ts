import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideosComponent } from './videos.component';
import {NbButtonModule, NbCardModule, NbInputModule} from "@nebular/theme";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [VideosComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbInputModule,
    FormsModule,
    NbButtonModule,
    ReactiveFormsModule,
  ]
})
export class VideosModule { }
