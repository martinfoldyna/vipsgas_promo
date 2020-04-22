import { Component, OnInit } from '@angular/core';
import { Video } from "../../@core/data/video";
import {VideosService} from "./videos.service";
import {GeneralService} from "../../@core/utils/general.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'ngx-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  video: Video;
  allVideos: Array<Video>;
  uploadingVideo: boolean = false;

  constructor(
    private videosService: VideosService,
    private generalService: GeneralService,
    private authService: AuthService,
  ) {
    this.video = {
      title: '',
    };

    this.allVideos = new Array<Video>();
  }

  ngOnInit() {
    this.retrieveVideos();
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
    this.uploadingVideo = true;
    this.video.createdBy = this.authService.getUser();
    this.video.createdAt = Date.now();
    this.videosService.uploadVideo(this.video).then(video => {
      console.log(video);
      this.uploadingVideo = false;
    }).catch(err => {
      this.uploadingVideo = false;
      console.log(err);
    });
  }

  retrieveVideos() {
    this.videosService.loadVideos().then(videos => {
      this.allVideos = videos;
    }).catch(err => {
      console.log(err);
    })
  }

  deleteVideo(videoId: string) {
    this.generalService.deleteItem('videos', videoId).then(response => {
      console.log(response);
      this.retrieveVideos();
    }).catch(err => {
      console.log(err);
    })
  }

}
