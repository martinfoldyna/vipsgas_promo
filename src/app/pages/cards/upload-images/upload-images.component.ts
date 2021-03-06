import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Image } from '../../../@core/data/image';
import { GeneralService } from '../../../@core/utils/general.service';
import { ImagesService } from '../../../@core/utils/images.service';
import { newArray } from '@angular/compiler/src/util';
import { NbToastrService } from '@nebular/theme';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { async } from 'rxjs-compat/scheduler/async';

@Component({
  selector: 'ngx-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss'],
})
export class UploadImagesComponent implements OnInit {
  @Output('loadDocument') loadDocument: EventEmitter<any> = new EventEmitter();

  @Input('dbCollection') dbCollection: string;
  @Input('documentID') documentID: string;
  @Input('dontChangeName') dontChangeName: boolean;

  newImages: Array<Image>;
  selectedImagesPreview: Array<Image>;
  uploadingImages: boolean;

  uploadImagesForm = new FormGroup({
    images: new FormControl('', Validators.required),
  });

  constructor(
    private generalService: GeneralService,
    private imagesService: ImagesService,
    private toastr: NbToastrService
  ) {
    this.selectedImagesPreview = new Array<Image>();
    this.newImages = new Array<Image>();
  }

  ngOnInit(): void {}

  onFileChange(event) {
    let files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.setupFileReader(i, files[i]);
    }
  }

  setupFileReader(fileIndex, file) {
    let reader = new FileReader();

    reader.onload = (e: any) => {
      this.imagesService
        .compressFile(e.target.result, file.name, 68)
        .then((compressedImage) => {
          let fileName = this.generalService.generateRandomString();
          this.selectedImagesPreview.push({
            url: compressedImage.src,
            index: fileIndex,
            name: fileName,
          });
          if (compressedImage) {
            this.newImages.push({
              name: file.name,
              blob: compressedImage.blob,
              index: fileIndex,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    reader.readAsDataURL(file);
  }

  uploadImages(event) {
    event.preventDefault();
    this.uploadingImages = true;
    if (this.newImages.length > 0) {
      console.log(this.newImages);
      this.newImages.forEach((image, index) => {
        console.log('image', image);
        console.log('index', index);
        this.imagesService
          .uploadImageToDocument(this.dbCollection, this.documentID, image)
          .then((uploadImages) => {
            this.uploadingImages = false;
            this.loadDocument.emit();
            this.toastr.success('', 'Obrázky byly nahrány.');
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  }

  removeFromList(imageIndex) {
    const fileName = this.selectedImagesPreview[imageIndex].name;
    this.selectedImagesPreview.splice(imageIndex, 1);
    this.newImages = this.newImages.filter((image) => {
      console.log('imageName', image.name);
      console.log('fileName', fileName);

      return image.name !== fileName;
    });
    console.log(this.newImages);
  }
}
