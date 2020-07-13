import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Image} from "../../../@core/data/image";
import {GeneralService} from "../../../@core/utils/general.service";
import {ImagesService} from "../../../@core/utils/images.service";
import {newArray} from "@angular/compiler/src/util";
import {NbToastrService} from "@nebular/theme";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'ngx-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent implements OnInit {
  @Output('loadDocument') loadDocument: EventEmitter<any> = new EventEmitter();

  @Input('dbCollection') dbCollection: string;
  @Input('documentID') documentID: string;

  newImages: Array<Image>;
  selectedImagesPreview: Array<Image>;
  uploadingImages: boolean;

  uploadImagesForm = new FormGroup({
    images: new FormControl('', Validators.required)
  })

  constructor(
    private generalService: GeneralService,
    private imagesService: ImagesService,
    private toastr: NbToastrService
  ) {
    this.selectedImagesPreview = new Array<Image>();
    this.newImages = new Array<Image>();
  }

  ngOnInit(): void {
  }

  onFileChange(event) {
    let files = event.target.files;
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
          this.newImages.push({name: this.generalService.generateRandomString(), blob: compressedImage.blob});
        }
      }).catch(err => {
        console.log(err);
      })
    }

    reader.readAsDataURL(file);
  }

  uploadImages(event) {
    event.preventDefault();
    this.uploadingImages = true;
    if(this.newImages.length > 0) {
      for (let i = 0; i < this.newImages.length; i++) {
        let image = this.newImages[i];
        console.log('collection: ' + this.dbCollection);
        console.log('docID: ' + this.documentID);
        this.imagesService.uploadImageToDocument(this.dbCollection, this.documentID, image).then(uploadImages => {
          console.log(uploadImages);
          this.uploadingImages = false;
          this.loadDocument.emit();
          this.toastr.success('', 'Obrázky byly nahrány.');

        }).catch(err => {
          console.log(err);
        })
      }
    }
  }

  removeFromList(index) {
    this.selectedImagesPreview.splice(index, 1);
  }

}
