import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.scss']
})
export class YoutubePlayerComponent implements OnInit {
  @Input('videoID') videoID: string;

  constructor() { }

  ngOnInit(): void {
  }


}
