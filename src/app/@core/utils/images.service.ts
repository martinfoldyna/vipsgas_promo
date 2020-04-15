import {Injectable} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/storage";
import {NgxImageCompressService} from "ngx-image-compress";
import {ImageSection} from "../data/image-section";

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(
    private storage: AngularFireStorage,
    private imageCompress: NgxImageCompressService
  ) { }

  getImage(collection, imageName): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.storage.ref(`${collection}/${imageName}`).getDownloadURL().subscribe(image => {
        resolve(image);
      }, err => {
        reject(err);
      });
    })
  }

  deleteImage(collection, imageName): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.storage.ref(`${collection}/${imageName}`).delete().subscribe(image => {
        resolve(image)
      }, err => {
        reject(err);
      });
    })
  }

  dataURItoBlob(dataURI) {
    console.log('in dataURItoBlob')
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i ++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([int8Array], {type: 'image/jpeg'});
  }

  compressFile(image, fileName, quality): Promise<{blob: Blob, src: string}> {
    return new Promise(((resolve, reject) => {
      let sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024 * 1024);
      let sizeOfCompressedImage;
      let imgResultAfterCompress;

      console.log('Size in kilobytes now:', sizeOfOriginalImage);

      if (sizeOfOriginalImage > 11) {
        quality = 60;
      }
      this.imageCompress.compressFile(image, -1, quality, quality).then(result => {
        imgResultAfterCompress = result;
        let blob = this.dataURItoBlob(imgResultAfterCompress.split(',')[1]);

        sizeOfCompressedImage = this.imageCompress.byteCount(result) / (1024 * 1024);

        console.log('Size in kilobytes after compression:', sizeOfCompressedImage);

        resolve({blob: blob, src: result});
        if(!blob) {
          reject('error occured');
        }

      })
    }))
  }

  deleteAllImagesInSection(sectionId, sectionImages: {name: string; src: string}[]) {
    return new Promise<any>((resolve, reject) => {
      if(sectionImages) {
        for(let i = 0; i < sectionImages.length; i++) {
          let thisImage = sectionImages[i];
          this.deleteImage('gallery', thisImage.name).then(response => {
            console.log(response);
            if(sectionImages.length - 1 === i) {
              resolve('Všechny obrázky byly smazány.');
            }
          })
        }
      } else {
        reject('Sekce neobsahuje žádné obrázky.');
      }
    })
  }
}
