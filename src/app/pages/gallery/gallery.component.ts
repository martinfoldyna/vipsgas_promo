import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {ImageSection} from "../../@core/data/image-section";
import {GalleryService} from "./gallery.service";
import {ImagesService} from "../../@core/utils/images.service";
import {GeneralService} from "../../@core/utils/general.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TinyMceConfig} from "../../@core/data/tinyMceConfig";
import {NbToastrService} from "@nebular/theme";

@Component({
  selector: 'ngx-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  creatingSection: boolean = false;
  section: ImageSection;
  allSections: Array<ImageSection>;

  galleryForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    thumbnail: new FormControl('', Validators.required)
  })

  constructor(
    public authService: AuthService,
    private galleryService: GalleryService,
    private imagesService: ImagesService,
    private generalService: GeneralService,
    private router: Router,
    private toastr: NbToastrService
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
      this.creatingSection = true;
      this.section.createdAt = Date.now();
      this.section.createdBy = this.authService.getUser();
      console.log(this.section);
      this.galleryService.addSection(this.section).then(response => {
        this.toastr.success('', 'Nová sekce byla úspěšně vytvořena.')
        this.galleryForm.reset();
        this.loadSections();
        this.creatingSection = true;
      }).catch(err => {
        this.toastr.danger(err ? JSON.stringify(err) : 'Během nahrávání sekce došlo k chybě.', 'Chyba')
        this.creatingSection = true;
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
      this.allSections = this.allSections.sort((a,b) => {
        if(a.name && b.name) {
          return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        } else {
          return 0;
        }

      });
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

  openDetail(section: ImageSection) {
    this.router.navigateByUrl('/pages/gallery/detail/' + section.sectionId)
  }
}
