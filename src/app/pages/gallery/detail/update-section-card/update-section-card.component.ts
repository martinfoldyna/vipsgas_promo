import {Component, Input, OnInit} from '@angular/core';
import {ImageSection} from "../../../../@core/data/image-section";

@Component({
  selector: 'ngx-update-section-card',
  templateUrl: './update-section-card.component.html',
  styleUrls: ['./update-section-card.component.scss']
})
export class UpdateSectionCardComponent implements OnInit {
  @Input('section') section: ImageSection

  constructor() { }

  ngOnInit() {
  }

}
