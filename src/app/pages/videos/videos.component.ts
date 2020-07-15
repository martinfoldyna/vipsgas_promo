import { Component, OnInit } from '@angular/core';
import { Video } from "../../@core/data/video";
import {VideosService} from "./videos.service";
import {GeneralService} from "../../@core/utils/general.service";
import {AuthService} from "../auth/auth.service";
import {NbDialogService, NbToastrService} from "@nebular/theme";
import {YoutubePlayerComponent} from "./youtube-player/youtube-player.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'ngx-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  video: Video;
  allVideos: Array<Video>;
  uploadingVideo: boolean = false;
  initVideo: boolean = false;
  deletingVideo: boolean = false;

  videoForm = new FormGroup({
    name: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required)
  })

  constructor(
    private videosService: VideosService,
    private generalService: GeneralService,
    public authService: AuthService,
    private dialogService: NbDialogService,
    private toastr: NbToastrService
  ) {
    this.video = {
      title: '',
    };

    this.allVideos = new Array<Video>();
  }

  ngOnInit() {
    this.retrieveVideos();

    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
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
      this.toastr.success('', 'Nové video bylo úspěšně nahráno.');
      this.videoForm.reset();
      this.retrieveVideos();
      this.uploadingVideo = false;
    }).catch(err => {
      this.uploadingVideo = false;
      console.log(err);
    });
  }

  retrieveVideos() {
    this.videosService.loadVideos().then(videos => {
      this.allVideos = videos;
      console.log(videos);
    }).catch(err => {
      console.log(err);
    })
  }

  deleteVideo(videoId: string) {
    this.deletingVideo = true;
    this.generalService.deleteItem('videos', videoId).then(response => {
      this.toastr.success('', 'Nové video bylo úspěšně smazáno.')
      this.retrieveVideos();
      this.deletingVideo = false;
    }).catch(err => {
      console.log(err);
    })
  }

  getVideoThumbnail() {
    let videoURL = this.video.url;
    if (videoURL.length > 2) {
      let videoID = videoURL.split('v=')[1];
      this.video.thumbnail = {src: `https://img.youtube.com/vi/${videoID}/0.jpg`}
      this.video.youtubeID = videoID;
    }
  }

  playVideo(videoID: string) {
    this.dialogService.open(YoutubePlayerComponent, {
      context: {
        videoID: videoID
      },
      backdropClass: 'custom-backdrop'
    })
  }

}
