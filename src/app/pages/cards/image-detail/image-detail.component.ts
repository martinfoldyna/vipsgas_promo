import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {Image} from "../../../../@core/data/image";

@Component({
  selector: 'ngx-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent implements OnInit {
  @Input() allImages: Array<Image>;
  @Input() index: number;
  image: any;

  constructor(
    protected dialogRef: NbDialogRef<ImageDetailComponent>,
  ) { }

  ngOnInit() {
    this.image = this.allImages[this.index];
  }

  close() {
    this.dialogRef.close();
  }

}
