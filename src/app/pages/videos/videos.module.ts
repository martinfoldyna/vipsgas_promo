import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideosComponent } from './videos.component';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbSpinnerModule,
  NbUserModule
} from "@nebular/theme";
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
    NbSpinnerModule,
    NbUserModule,
    NbIconModule,
    NbSelectModule,
  ]
})
export class VideosModule { }
