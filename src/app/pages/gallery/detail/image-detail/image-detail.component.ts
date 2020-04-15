import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";

@Component({
  selector: 'ngx-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent implements OnInit {
  @Input() image: any;

  constructor(
    protected dialogRef: NbDialogRef<ImageDetailComponent>,
  ) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
