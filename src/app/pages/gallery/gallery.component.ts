import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {ImageSection} from "../../@core/data/image-section";
import {GalleryService} from "./gallery.service";
import {ImagesService} from "../../@core/utils/images.service";
import {GeneralService} from "../../@core/utils/general.service";

@Component({
  selector: 'ngx-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  uploadingSection: boolean = false;
  section: ImageSection;
  allSections: Array<ImageSection>;


  constructor(
    private authService: AuthService,
    private galleryService: GalleryService,
    private imagesService: ImagesService,
    private generalService: GeneralService,
  ) {
    this.allSections = new Array<ImageSection>();
    this.section = {
      name: '',
    }
  }

  ngOnInit() {
    this.loadSections();
  }

  onFileChange(event) {
    let file = event.target.files[0];
    this.setupFileReader(file).then(response => {
      this.section.thumbnail = response;
    }).catch(err => {
      console.log(err);
    });
  }

  setupFileReader(file) {
    return new Promise<{name: string, blob: Blob}>((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = (e: any) => {
        let fileName = this.generalService.generateRandomString();
        this.imagesService.compressFile(e.target.result, fileName, 50).then(compressedImage => {
          if(compressedImage) {
            resolve({name: 'thumb_' + fileName, blob: compressedImage.blob});
          }
        }).catch(err => {
          reject(err);
        })
      }

      reader.readAsDataURL(file);
    })
  }

  addSection() {
    if (this.section) {
      this.section.createdAt = Date.now();
      this.section.createdBy = this.authService.getUser();
      console.log(this.section);
      this.galleryService.addSection(this.section).then(response => {
        console.log(response);
        this.loadSections();
      }).catch(err => {
        console.log(err);
      })
    } else {
      console.log('section is not defined');
    }
  }

  generateSectionId() {
    let finalString =  this.section.name.replace(/\s+/g, '-').toLowerCase();
    finalString = finalString.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    this.section.sectionId = finalString;
    return this.section.sectionId
  }

  loadSections() {
    this.galleryService.loadSections().then(response => {
      console.log(response);
      this.allSections = response;
      for (let selection of this.allSections) {
        console.log(selection);
        this.imagesService.getImage('gallery', selection.thumbnail.name).then(image => {
          selection.thumbnail.image = image;
        })
      }
    }).catch(err => {
      console.log(err);
    })
  }

  deleteSection(section: ImageSection) {
    this.generalService.deleteItem('gallery', section.id).then(response => {
      this.imagesService.deleteAllImagesInSection(section.sectionId, section.images).then(response => {
        console.log(response);
      }).catch(err =>{
        console.log(err);
      })
      this.loadSections();
    })
  }
}
