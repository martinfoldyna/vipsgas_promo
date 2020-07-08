import { Injectable } from '@angular/core';
import {DynamicCategory} from "../../@core/data/category";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireStorage} from "@angular/fire/storage";
import {GeneralService} from "../../@core/utils/general.service";
import {ImagesService} from "../../@core/utils/images.service";
import {Product} from "../../@core/data/product";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private _firestore: AngularFirestore,
    private fireStorage: AngularFireStorage,
    private generalService: GeneralService,
    private imagesService: ImagesService
  ) { }

  createCategory(data: DynamicCategory) {
    return new Promise<any>((resolve, reject) => {
      this.fireStorage.upload(`productCategories/${data.thumbnail.name}`, data.thumbnail.blob).then(response => {
        if(response.state === "success") {
          response.ref.getDownloadURL().then(url => {
            this._firestore
              .collection('productCategories')
              .add({
                name: data.name,
                thumbnail: {
                  name: data.thumbnail.name,
                  url: url
                },
                categoryPositions: data.categoryPositions,
                categoryTypes: data.categoryTypes
              })
              .then(res => resolve(res), err => reject(err));
          })
        } else {
          reject('Nastala chyba při nahrávání obrázku');
        }
      })
    })
  }

  retrieveCategories() {
    return this._firestore.collection('productCategories').snapshotChanges();
  }

  retrieveCategoryByID(id: string) {
    return new Promise<DynamicCategory>((resolve, reject) => {
      this.retrieveCategories().subscribe(response => {
        if (response) {
          const category = response.filter(a => {
            const docId = a.payload.doc.id;
            return docId === id;
          }).map(a => {
            const data = a.payload.doc.data() as DynamicCategory;
            const id = a.payload.doc.id;
            return { id, ...data };
          })[0]
          console.log(category);
          resolve(category);
        } else {
          reject('Not found');
        }
      });
    });
  }

  removeCategory(category: DynamicCategory): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.imagesService.deleteImage('productCategories', category.thumbnail.name).then(state => {
        console.log('imageState:', state);
        this.generalService.deleteItem('productCategories', category.id).then(response => {
          resolve(response);
        }).catch(err => {
          reject(err);
        })
      }).catch(err => {
        reject(err);
      })
    })
  }

  updateCategoryThumbnail(category: DynamicCategory): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fireStorage.upload(`productCategories/${category.newThumbnail.name}`, category.newThumbnail.blob).then(response => {
        if (response.state === "success") {
          response.ref.getDownloadURL().then(url => {

            resolve({
              name: category.newThumbnail.name,
              url: url,
            });
          }).catch(err => reject(err));
        } else {
          reject('Během nahrávání nového obrázku došlo k chybě.');
        }
      }).catch(err => reject(err));
    })
  }

  updateCategory(category: DynamicCategory): Promise<any> {
    return new Promise<any>((resolve, reject) => {

      if (category.newThumbnail) {
        this.updateCategoryThumbnail(category).then(newThumbnail => {
          this.fireStorage.ref(`productCategories/${category.thumbnail.name}`).delete();
          delete category.newThumbnail;
          category.thumbnail = newThumbnail;
          this._firestore.collection('productCategories')
            .doc(category.id).update(category).then(response => resolve(response)).catch(err => reject(err));
        }).catch(err => reject(err));
      } else {
        this._firestore.collection('productCategories')
          .doc(category.id).update(category).then(response => resolve(response)).catch(err => reject(err));
      }
    })
  }
}
