import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GalleryService} from "../gallery.service";
import {ActivatedRoute, Route, Router, Routes} from "@angular/router";
import {ImageSection} from "../../../@core/data/image-section";
import {AuthService} from "../../auth/auth.service";
import {ImagesService} from "../../../@core/utils/images.service";
import {ImageDetailComponent} from "../../cards/image-detail/image-detail.component";
import {NbDialogService, NbToastrService} from "@nebular/theme";
import {UpdateSectionCardComponent} from "./update-section-card/update-section-card.component";
import {TinyMceConfig} from "../../../@core/data/tinyMceConfig";

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  infoCardHeight: number;


  id:string;
  section: ImageSection;
  uploadNewImage: boolean = true;
  uploadingImage: boolean = false;
  newImages: Array<{name: string; blob: Blob}>;
  selectedImagesPreview: Array<any>;
  preloadingImages: boolean = true;
  showOverlay: boolean = false;
  editSection: boolean = true;
  updateSectionState: boolean = false;
  descriptionChanged:boolean = false;


  constructor(
    private galleryService: GalleryService,
    private imagesService: ImagesService,
    private route: ActivatedRoute,
    public authService: AuthService,
    private router: Router,
    private dialogService: NbDialogService,
    private toastr: NbToastrService
  ) {
    this.newImages = new Array<{name: string; blob: Blob}>();
    this.selectedImagesPreview = new Array<any>();
  }

  ngOnInit() {
    this.load();
    this.preloadTimeout();
    if (this.editSection) {
      this.uploadNewImage = false;
    }

    if(this.editSection && !this.authService.getUser()) {
      this.editSection = false;
    }

  }

  load() {
    this.selectedImagesPreview = new Array<any>();
    if(this.uploadingImage) {
      this.uploadingImage = false;
    }


    this.id = this.route.snapshot.paramMap.get('id');
    this.galleryService.loadSectionById(this.id).then(section => {
      this.section = section;
      if (this.section.images) {
        this.section.images = this.section.images.sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
      }
      console.log(this.section);
      this.imagesService.getImage('gallery', this.section.thumbnail.name).then(image => {
        this.section.thumbnail.image = image;
      })
    }).catch(err => {
      console.log(err);
      if(err) {
        this.router.navigateByUrl('/pages/gallery');
      }
    })
  }

  removeImageFromSelection(index) {
    console.log(index);
    this.selectedImagesPreview.map(imagePreview => {
      return imagePreview.index !== index;
    })
    console.log(this.selectedImagesPreview);
  }

  preloadTimeout() {
    setTimeout(() => {
      this.preloadingImages = false;
    }, 2000)
  }

  onFileChange(event) {
    let files = event.target.files;
    console.log(files);
    for (let i = 0; i < files.length; i++) {

      this.setupFileReader(i, files[i]);
    }
  }

  setupFileReader(fileIndex, file) {
    let reader = new FileReader();

    reader.onload = (e: any) => {
      this.imagesService.compressFile(e.target.result, file.name, 68).then(compressedImage => {
        this.selectedImagesPreview.push({url: compressedImage.src, index: fileIndex});
        if(compressedImage) {
          this.newImages.push({name: this.generateRandomString(), blob: compressedImage.blob});
        }
      }).catch(err => {
        console.log(err);
      })
    }

    reader.readAsDataURL(file);
  }

  upload(form) {
    this.uploadingImage = true;
    this.uploadImages().then(response => {
        this.toastr.success('', 'Obrázky byly úspěšně přidány.')
        this.selectedImagesPreview = new Array<any>();
        this.uploadingImage = false;
        form.reset();
        this.load();

    }).catch(err => {
      this.toastr.danger(err ? JSON.stringify(err) : 'Během nahrávání obrázků došlo k chybě.', 'Chyba')

    });
  }

  generateRandomString(): string {
    let alphabeta = ['A', 'a', 'B', 'b', 'C', 'c', 'D', 'd', 'E', 'e', 'F', 'f', 'G', 'g', 'H', 'h', 'I', 'i', 'J', 'j', 'K', 'k', 'L', 'l', 'M', 'm', 'N', 'n', 'O', 'o', 'P', 'p', 'Q', 'q', 'R', 'r', 'S', 's', 'T', 't', 'U', 'u', 'V', 'v', 'W', 'w', 'X', 'x', 'Y', 'y', 'Z', 'z']
    let returnString = "";

    for(let i = 0; i <= 10; i++) {
      let randomNumber = Math.round((Math.random() * 10) + 1);
      returnString += alphabeta[randomNumber];
      returnString += randomNumber;
    }

    return returnString + Date.now() + '.jpg';
  }

  uploadImages(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let uploadedImages = 0;
      if(this.newImages.length > 0) {
        for (let i = 0; i < this.newImages.length; i++) {
          let image = this.newImages[i];
          this.galleryService.uploadImagesToSection(this.section, image).then(uploadImages => {
            console.log(uploadImages);
            uploadedImages += 1;
            if(this.newImages.length - 1 === uploadedImages)
              resolve(true);
          }).catch(err => {
            reject(err);
          })
        }
      }
    })
  }

  deleteImage(imageName) {
    this.imagesService.deleteImage('gallery', imageName).then(imageFile => {
      this.galleryService.deleteImageNameFromCollection('gallery', this.section.id, imageName, this.section.images).then(response => {
        this.toastr.success('', 'Obrázek byl úspěšně smazán.')
        this.load();
      }, err => {
        this.toastr.danger(err ? JSON.stringify(err) : 'Během odstraňování obrázku došlo k chybě.', 'Chyba')
      })
    })
  }

  openImage(allImages, index) {
    this.dialogService.open(ImageDetailComponent, {context: {
        allImages: allImages,
        index: index
      }})
  }

  updateSection() {
    this.galleryService.updateSection('gallery', this.section).then(response => {
      this.toastr.success('', 'Sekce byla upravena.');
      this.updateSectionState = false;
      this.load();
    }).catch(err => {
      this.toastr.danger(err ? JSON.stringify(err) : 'Během upravování sekce došlo k chybě.', 'Chyba')
    })
  }

  removeSection() {
    this.galleryService.deleteSection(this.section).then(response => {
      console.log(response);
      this.toastr.success("", "Sekce byla smazána");
      this.router.navigateByUrl('/pages/gallery/');
    })
  }

}
