import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {Category} from '../../@core/data/category';
import {Observable} from 'rxjs';
import {News} from "../../@core/data/news";
import {Product} from "../../@core/data/product";
import {ImagesService} from "../../@core/utils/images.service";

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage, private imagesService: ImagesService) {
  }

  createProduct(data) {
    return new Promise<any>((resolve, reject) => {
      console.log(data);
      this.storage
        .upload(`products/${data.thumbnail.name}`, data.thumbnail.blob).then(response => {
          if(response.state === "success") {
            this.firestore
              .collection('products')
              .add({
                name: data.name,
                thumbnail: data.thumbnail.name,
                productCategory: data.productCategory,
              })
              .then(res => resolve(res), err => reject(err));
          } else {
            reject('Nastala chyba při nahrávání obrázku')
          }
      }).catch(err => {
        reject(err);
      });

    });
  }

  getImage(imageName): Promise<string> {
    return this.imagesService.getImage('products', imageName);
  }

  getProducts() {
    return this.firestore.collection('products').snapshotChanges();
  }

  getProductsByCategory(category): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.getProducts().subscribe(response => {
        if(response) {
          let files = response.filter(a => {
            const data = a.payload.doc.data() as Product;
            return data.productCategory === category;
          }).map(a => {
            const data = a.payload.doc.data() as Product;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
          console.log(files);
          resolve(files);
        } else {
          reject('Not found')
        }
      })
    })
  }
}
