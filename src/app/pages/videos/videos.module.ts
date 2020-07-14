import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideosComponent } from './videos.component';
import {
  NbButtonModule,
  NbCardModule, NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbSpinnerModule,
  NbUserModule
} from "@nebular/theme";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { YoutubePlayerComponent } from './youtube-player/youtube-player.component';
import {YouTubePlayerModule} from "@angular/youtube-player";
import {CardsModule} from "../cards/cards.module";

@NgModule({
  declarations: [VideosComponent, YoutubePlayerComponent],
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
        YouTubePlayerModule,
        NbDialogModule.forChild(),
        CardsModule,
    ],
  entryComponents: [
    YoutubePlayerComponent
  ]
})
export class VideosModule { }
