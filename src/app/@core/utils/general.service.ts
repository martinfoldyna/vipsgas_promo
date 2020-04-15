import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {ImagesService} from "./images.service";

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(
    private firestore: AngularFirestore,
    private imagesService: ImagesService
  ) { }

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

  deleteItem(collection, item): Promise<void> {
    return this.firestore.doc(`${collection}/${item}`).delete();
  }

  setupFileReader(file) {
    return new Promise<{name: string, blob: Blob}>((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = (e: any) => {
        let fileName = this.generateRandomString();
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
}
