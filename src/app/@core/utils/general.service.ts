import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ImagesService } from './images.service';
import { Image } from '../data/image';
import { AngularFireStorage } from '@angular/fire/storage';
import { NgxImageCompressService } from 'ngx-image-compress';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor(
    private firestore: AngularFirestore,
    private imagesService: ImagesService,
    private fireStorage: AngularFireStorage,
    private imageCompress: NgxImageCompressService
  ) {}

  generateRandomString(): string {
    let alphabeta = [
      'A',
      'a',
      'B',
      'b',
      'C',
      'c',
      'D',
      'd',
      'E',
      'e',
      'F',
      'f',
      'G',
      'g',
      'H',
      'h',
      'I',
      'i',
      'J',
      'j',
      'K',
      'k',
      'L',
      'l',
      'M',
      'm',
      'N',
      'n',
      'O',
      'o',
      'P',
      'p',
      'Q',
      'q',
      'R',
      'r',
      'S',
      's',
      'T',
      't',
      'U',
      'u',
      'V',
      'v',
      'W',
      'w',
      'X',
      'x',
      'Y',
      'y',
      'Z',
      'z',
    ];
    let returnString = '';

    for (let i = 0; i <= 10; i++) {
      let randomNumber = Math.round(Math.random() * 10 + 1);
      returnString += alphabeta[randomNumber];
      returnString += randomNumber;
    }

    return returnString + Date.now() + '.jpg';
  }

  deleteItem(collection, itemID): Promise<void> {
    return this.firestore.doc(`${collection}/${itemID}`).delete();
  }

  setupFileReader(file) {
    return new Promise<{ name: string; blob: Blob; src: string }>(
      (resolve, reject) => {
        let reader = new FileReader();

        reader.onload = (e: any) => {
          let imageSize = this.imageCompress.byteCount(e.target.result) / 1024;
          console.log('imageSize:', imageSize);

          let quality = this.imagesService.translateQuality(imageSize);

          let fileName = this.generateRandomString();
          this.imagesService
            .compressFile(e.target.result, fileName, quality)
            .then((compressedImage) => {
              if (compressedImage) {
                resolve({
                  name: 'thumb_' + fileName,
                  blob: compressedImage.blob,
                  src: compressedImage.src,
                });
              }
            })
            .catch((err) => {
              reject(err);
            });
        };

        reader.readAsDataURL(file);
      }
    );
  }

  deleteAllImagesInDocument(images: Array<Image>, collection: string) {
    return new Promise((resolve, reject) => {
      for (let image of images) {
        const imageRef = this.fireStorage.ref(`${collection}/${image.name}`);
        imageRef?.delete().subscribe(
          (storageResponse) => {
            console.log(storageResponse);
            resolve('Všechny obrázky byly smazány');
          },
          (err) => reject(err)
        );
      }
    });
  }

  removeImageFromProduct(collection, docID, imageName, images): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection(collection)
        .doc(docID)
        .update({
          images: images.filter((image) => {
            return image.name !== imageName && image.thumbnail !== true;
          }),
        })
        .then((response) => {
          this.fireStorage
            .ref(`${collection}/${imageName}`)
            .delete()
            .subscribe(
              (storageResponse) => {
                resolve(storageResponse);
              },
              (err) => reject(err)
            );
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
