import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {Image} from "../../../@core/data/image";

@Component({
  selector: 'ngx-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent implements OnInit {
  @Input() allImages: [{ name: any; src: string; }];
  @Input() index: number;
  image: any;

  constructor(
    public dialogRef: NbDialogRef<ImageDetailComponent>,
  ) { }

  ngOnInit() {
    this.loadImage();
  }

  loadImage() {
    this.image = this.allImages[this.index];
  }

  close() {
    this.dialogRef.close();
  }

}
