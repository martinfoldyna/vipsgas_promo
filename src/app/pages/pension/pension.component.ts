import { Component, OnInit } from '@angular/core';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from "ngx-gallery";

@Component({
  selector: 'ngx-pension',
  templateUrl: './pension.component.html',
  styleUrls: ['./pension.component.scss']
})
export class PensionComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor() { }

  ngOnInit() {
    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [
      {
        small: './../../../assets/images/pension/01.jpg',
        medium: './../../../assets/images/pension/01.jpg',
        big: './../../../assets/images/pension/01.jpg'
      },
      {
        small: './../../../assets/images/pension/02.jpg',
        medium: './../../../assets/images/pension/02.jpg',
        big: './../../../assets/images/pension/02.jpg'
      },
      {
        small: './../../../assets/images/pension/03.jpg',
        medium: './../../../assets/images/pension/03.jpg',
        big: './../../../assets/images/pension/03.jpg'
      },
      {
        small: './../../../assets/images/pension/04.jpg',
        medium: './../../../assets/images/pension/04.jpg',
        big: './../../../assets/images/pension/04.jpg'
      },
      {
        small: './../../../assets/images/pension/05.jpg',
        medium: './../../../assets/images/pension/05.jpg',
        big: './../../../assets/images/pension/05.jpg'
      },
      {
        small: './../../../assets/images/pension/06.jpg',
        medium: './../../../assets/images/pension/06.jpg',
        big: './../../../assets/images/pension/06.jpg'
      },
      {
        small: './../../../assets/images/pension/07.jpg',
        medium: './../../../assets/images/pension/07.jpg',
        big: './../../../assets/images/pension/07.jpg'
      },
      {
        small: './../../../assets/images/pension/08.jpg',
        medium: './../../../assets/images/pension/08.jpg',
        big: './../../../assets/images/pension/08.jpg'
      },
      {
        small: './../../../assets/images/pension/09.jpg',
        medium: './../../../assets/images/pension/09.jpg',
        big: './../../../assets/images/pension/09.jpg'
      },
      {
        small: './../../../assets/images/pension/10.jpg',
        medium: './../../../assets/images/pension/10.jpg',
        big: './../../../assets/images/pension/10.jpg'
      },
      {
        small: './../../../assets/images/pension/11.jpg',
        medium: './../../../assets/images/pension/11.jpg',
        big: './../../../assets/images/pension/11.jpg'
      },
      {
        small: './../../../assets/images/pension/12.jpg',
        medium: './../../../assets/images/pension/12.jpg',
        big: './../../../assets/images/pension/12.jpg'
      },
      {
        small: './../../../assets/images/pension/13.jpg',
        medium: './../../../assets/images/pension/13.jpg',
        big: './../../../assets/images/pension/13.jpg'
      },
      {
        small: './../../../assets/images/pension/14.jpg',
        medium: './../../../assets/images/pension/14.jpg',
        big: './../../../assets/images/pension/14.jpg'
      },
      {
        small: './../../../assets/images/pension/15.jpg',
        medium: './../../../assets/images/pension/15.jpg',
        big: './../../../assets/images/pension/15.jpg'
      },
      {
        small: './../../../assets/images/pension/16.jpg',
        medium: './../../../assets/images/pension/16.jpg',
        big: './../../../assets/images/pension/16.jpg'
      },
      {
        small: './../../../assets/images/pension/17.jpg',
        medium: './../../../assets/images/pension/17.jpg',
        big: './../../../assets/images/pension/17.jpg'
      },
      {
        small: './../../../assets/images/pension/18.jpg',
        medium: './../../../assets/images/pension/18.jpg',
        big: './../../../assets/images/pension/18.jpg'
      },
      {
        small: './../../../assets/images/pension/19.jpg',
        medium: './../../../assets/images/pension/19.jpg',
        big: './../../../assets/images/pension/19.jpg'
      },
      {
        small: './../../../assets/images/pension/20.jpg',
        medium: './../../../assets/images/pension/20.jpg',
        big: './../../../assets/images/pension/20.jpg'
      },
    ];
  }

}
