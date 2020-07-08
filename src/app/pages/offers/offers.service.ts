import { Injectable } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/storage";
import {Offer} from "../../@core/data/offer";
import {DomEvent} from "leaflet";
import off = DomEvent.off;
import {AngularFirestore} from "@angular/fire/firestore";
import {ImageSection} from "../../@core/data/image-section";

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(
    private fireStorage: AngularFireStorage,
    private firestore: AngularFirestore
  ) { }

  uploadOffer(offer: Offer) {
    return new Promise<any>((resolve, reject) => {
      this.fireStorage.upload(`offers/${offer.content.file.name}`, offer.content.file).then(contentResponse => {
        if(contentResponse) {
          contentResponse.ref.getDownloadURL().then(contentlURl => {
            this.fireStorage.upload(`offers/${offer.thumbnail.name}`, offer.thumbnail.blob).then(thumbnailResponse => {
              if(thumbnailResponse) {
                thumbnailResponse.ref.getDownloadURL().then(thumbnailURL => {
                  this.firestore.collection('offers').add({
                    thumbnail: {
                      name: offer.thumbnail.name,
                      url: thumbnailURL,
                    },
                    content: {
                      name: offer.content.file.name,
                      url: contentlURl,
                    }
                  }).then(firestoreResponse => {
                    resolve(firestoreResponse);
                  }).catch(err => {
                    reject(err);
                  })
                }).catch((err) => {
                  reject(err);
                })
              } else {
                reject('Během nahrávání obsahu došlo k problému. Zkuste to prosím později.')
              }
            }).catch(err => {
              reject(err);
            })
          }).catch(err => {
            reject(err);
          })
        } else {
          reject('Během nahrávání obsahu došlo k problému. Zkuste to prosím později.')
        }
      }).catch(err => {
        reject(err);
      })
    })
  }

  loadOffers() {
    return new Promise<Array<Offer>>((resolve, reject) => {
      this.firestore.collection('offers').snapshotChanges().subscribe(response => {
        if(!response) {
          reject('Nastala chyba během načítání dat.')
        }
        const offers = response.filter(item => {
          let data = item.payload.doc.data() as Offer;

          return data;
        }).map(item => {
          const data = item.payload.doc.data() as Offer;
          const id = item.payload.doc.id;
          return { id, ...data };
        });
        resolve(offers);
      }, err => {
        reject(err);
      })
    })
  }
}
