import { Component, OnInit } from '@angular/core';
import { Video } from "../../@core/data/video";
import {VideosService} from "./videos.service";
import {GeneralService} from "../../@core/utils/general.service";

@Component({
  selector: 'ngx-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  video: Video

  constructor(
    private videosService: VideosService,
    private generalService: GeneralService
  ) {
    this.video = {
      title: '',
    };
  }

  ngOnInit() {
  }

  onFileChange(event) {
    let file = event.target.files[0];
    this.generalService.setupFileReader(file).then(compressedImage => {
      this.video.thumbnail = compressedImage;
    }).catch(err => {
      console.log(err);
    })
  }

  uploadVideo() {
    this.videosService.uploadVideo(this.video);
  }

}
