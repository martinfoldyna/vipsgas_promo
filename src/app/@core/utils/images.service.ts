import {Injectable} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/storage";
import {NgxImageCompressService} from "ngx-image-compress";
import {ImageSection} from "../data/image-section";
import {Image} from "../data/image";
import {firestore} from "firebase/app";
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(
    private fireStorage: AngularFireStorage,
    private _firestore: AngularFirestore,
    private imageCompress: NgxImageCompressService
  ) { }

  getImage(collection, imageName): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.fireStorage.ref(`${collection}/${imageName}`).getDownloadURL().subscribe(image => {
        resolve(image);
      }, err => {
        reject(err);
      });
    })
  }

  deleteImage(collection, imageName): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fireStorage.ref(`${collection}/${imageName}`).delete().subscribe(image => {
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

  translateQuality(imageSize) {
    let quality;

    if (imageSize < 1200) {
      quality = 100;
    } else if (imageSize > 1200 && imageSize < 2000) {
      quality = 90;
    } else if (imageSize > 2000 && imageSize < 4000) {
      quality = 65;
    } else if (imageSize > 4000) {
      quality = 55;
    } else {
      quality = 85;
    }

    return quality;
  }

  translateRatio(imageSize) {
    let ratio;

    if (imageSize < 1200) {
      ratio = 95;
    } else if (imageSize > 1200 && imageSize < 2000) {
      ratio = 90;
    } else if (imageSize > 2000 && imageSize < 4000) {
      ratio = 80;
    } else if (imageSize > 4000) {
      ratio = 75;
    } else {
      ratio = 85;
    }

    return ratio;
  }

  compressFile(image, fileName, quality): Promise<{blob: Blob, src: string}> {
    return new Promise(((resolve, reject) => {
      let sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024);

      const finalQuality = this.translateQuality(sizeOfOriginalImage);
      const ratio = this.translateRatio(sizeOfOriginalImage)

      let sizeOfCompressedImage;
      let imgResultAfterCompress;

      console.log('Size in kilobytes now:', sizeOfOriginalImage);

      console.log('quality in Compress:', finalQuality)

        this.imageCompress.compressFile(image, -1, 80, finalQuality).then(result => {
          imgResultAfterCompress = result;
          let blob = this.dataURItoBlob(imgResultAfterCompress.split(',')[1]);

          sizeOfCompressedImage = this.imageCompress.byteCount(result) / (1024);

          console.log('Size in kilobytes after compression:', sizeOfCompressedImage);

          resolve({blob: blob, src: result});
          if (!blob) {
            reject('error occured');
          }

        })
    }))
  }

  uploadImageToDocument(collection, documentID, image: Image): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fireStorage.upload(`${collection}/${image.name}`, image.blob).then(response => {
        console.log(response);
        if (response) {
          response.ref.getDownloadURL().then(url => {
            this._firestore.collection(collection).doc(documentID).update(
              { images: firestore.FieldValue.arrayUnion({name: image.name, url: url})}
            ).then(firestoreResponse => {
              resolve(firestoreResponse);
            })
          });
        }

      }).catch(err => {
        reject(err);
      })
    })
  }

  deleteAllImagesInSection(collection, sectionImages: Array<Image>) {
    return new Promise<any>((resolve, reject) => {
      if (sectionImages) {
        for(let i = 0; i < sectionImages.length; i++) {
          let thisImage = sectionImages[i];
          this.deleteImage(collection, thisImage.name).then(response => {
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
