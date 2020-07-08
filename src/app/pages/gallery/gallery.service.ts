import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireStorage} from "@angular/fire/storage";
import {ImageSection} from "../../@core/data/image-section";
import { firestore } from 'firebase/app';
import {Product} from "../../@core/data/product";
import {ImagesService} from "../../@core/utils/images.service";

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  selectedSection: ImageSection

  constructor(
    private firestore: AngularFirestore,
    private fireStorage: AngularFireStorage
  ) {
    this.selectedSection = {
      name: ''
    }
  }

  addSection(data: ImageSection) {
    return new Promise<any>((resolve, reject) => {
      this.loadSectionById(data.sectionId).then(section => {
        console.log('uploading');
        if (section && section.length > 0) {
          reject('Tato sekce už existuje');
        } else {
          this.fireStorage.upload(`gallery/${data.thumbnail.name}`, data.thumbnail.blob).then(image => {
            if(image.state === 'success') {
              this.firestore.collection('gallery').add({
                name: data.name,
                thumbnail: {
                  name: data.thumbnail.name
                },
                sectionId: data.sectionId,
                section: true,
                description: data.description,
                createdAt: data.createdAt,
                createdBy: data.createdBy
              }).then(response => {
                resolve(response);
              }).catch(err => {
                reject(err);
              })
            } else {
              reject('Nastala chyba během nahrávání obrázku');
            }
          }).catch(err => {
            reject(err);
          })
        }
      })
    })
  }

  loadSections() {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('gallery').snapshotChanges().subscribe(response => {
        if(!response) {
          reject('Nastala chyba během načítání sekcí obrázků.')
        }
        let sections = response.filter(item => {
          let data = item.payload.doc.data() as ImageSection;

          return data.section;
        }).map(item => {
          const data = item.payload.doc.data() as ImageSection;
          const id = item.payload.doc.id;
          return { id, ...data };
        });
        resolve(sections);
      }, err => {
        reject(err);
      })
    })
  }

  uploadImagesToSection(section, image: {name: string; blob: Blob}): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fireStorage.upload(`gallery/${image.name}`, image.blob).then(response => {
        console.log(response);
        if (response) {
          response.ref.getDownloadURL().then(url => {
            this.firestore.collection('gallery').doc(section.id).update(
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

  loadSectionById(sectionId) {
    return new Promise<any>((resolve, reject) => {
      this.loadSections().then(responseSections => {
        let allSections: Array<ImageSection> = responseSections;
        this.selectedSection = allSections.filter(section => {
          return section.sectionId === sectionId;
        })[0];

        // if(this.selectedSection) {
        //   this.firestore.collection('gallery').doc(this.selectedSection.id).collection('images').valueChanges().subscribe(allImageNames => {
        //     this.selectedSection.images = allImageNames;
        //     resolve(this.selectedSection);
        //   });
        // }
        resolve(this.selectedSection);
      }).catch(err => {
        reject(err);
      })
    })
  }

  deleteImageNameFromCollection(collection, docID, imageName, images): Promise<any> {
      return this.firestore.collection(collection).doc(docID).update({
        images: images.filter(image => {
          return image.name !== imageName
        })
      })
  }

  updateSection(collection: string, section: ImageSection): Promise<any> {
    return this.firestore.collection(collection).doc(section.id).set(section)
  }
}
