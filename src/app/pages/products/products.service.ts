import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Category, DynamicCategory } from '../../@core/data/category';
import { Observable } from 'rxjs';
import { News } from '../../@core/data/news';
import { Product } from '../../@core/data/product';
import { ImagesService } from '../../@core/utils/images.service';
import { firestore } from 'firebase/app';
import { Image } from '../../@core/data/image';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    private _firestore: AngularFirestore,
    private fireStorage: AngularFireStorage,
    private imagesService: ImagesService
  ) {}

  createProduct(data: Product) {
    return new Promise<any>((resolve, reject) => {
      console.log(data);
      this.fireStorage
        .upload(`products/${data.thumbnail.name}`, data.thumbnail.blob)
        .then((response) => {
          if (response.state === 'success') {
            response.ref
              .getDownloadURL()
              .then((url) => {
                this._firestore
                  .collection('products')
                  .add({
                    name: data.name,
                    productCategory: data.productCategory,
                    description: data.description,
                    position: data.position,
                    thumbnail: {
                      name: data.thumbnail.name,
                      url: url,
                    },
                    images: [],
                  })
                  .then(
                    (res) => resolve(res),
                    (err) => reject(err)
                  );
              })
              .catch((err) => {
                reject(err);
              });
          } else {
            reject('Během nahrávání nahrávání obrázku došlo k chybě.');
          }
        })
        .catch((err) => {
          console.log('err on firestore');
          reject(err);
        });
    });
  }

  getImage(imageName): Promise<string> {
    return this.imagesService.getImage('products', imageName);
  }

  getProducts() {
    return this._firestore.collection('products').snapshotChanges();
  }

  getProductsByCategory(categoryID: string): Promise<Array<Product>> {
    return new Promise<any>((resolve, reject) => {
      this.getProducts().subscribe((response) => {
        if (response) {
          const files = response
            .filter((a) => {
              const data = a.payload.doc.data() as Product;
              return data.productCategory.id === categoryID;
            })
            .map((a) => {
              const data = a.payload.doc.data() as Product;
              const id = a.payload.doc.id;
              return { id, ...data };
            });
          resolve(files);
        } else {
          reject('Not found');
        }
      });
    });
  }

  getProductById(id): Promise<Product> {
    return new Promise<Product>((resolve, reject) => {
      this.getProducts().subscribe((response) => {
        if (response) {
          const product = response
            .filter((a) => {
              const docId = a.payload.doc.id;
              return docId === id;
            })
            .map((a) => {
              const data = a.payload.doc.data() as Product;
              const id = a.payload.doc.id;
              return { id, ...data };
            })[0];
          resolve(product);
        } else {
          reject('Not found');
        }
      });
    });
  }

  translateProductCategory(productCategory) {
    let returnValue = '';
    switch (productCategory) {
      case 'condensing-boilers': {
        returnValue = 'Kondenzační kotle';
        break;
      }
      case 'tuv-heaters': {
        returnValue = 'Průtokové ohřívače TUV';
        break;
      }
      case 'tuv-containers': {
        returnValue = 'Zásobníky TUV';
        break;
      }
      case 'boiler-regulation': {
        returnValue = 'Regulace kotlů';
        break;
      }
      case 'hydraulic-distributor': {
        returnValue = 'Hydraulické rozdělovače DIM ErP';
        break;
      }
      default: {
        returnValue = '';
        break;
      }
    }
    return returnValue;
  }

  updateProductThumbnail(product: Product): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fireStorage
        .upload(
          `products/${product.newThumbnail.name}`,
          product.newThumbnail.blob
        )
        .then((response) => {
          if (response.state === 'success') {
            response.ref
              .getDownloadURL()
              .then((url) => {
                resolve({
                  name: product.newThumbnail.name,
                  url: url,
                });
              })
              .catch((err) => reject(err));
          } else {
            reject('Během nahrávání nového obrázku došlo k chybě.');
          }
        })
        .catch((err) => reject(err));
    });
  }

  editProduct(product: Product): Promise<void> {
    return new Promise<any>((resolve, reject) => {
      if (product.newThumbnail) {
        this.updateProductThumbnail(product)
          .then((newThumbnail) => {
            this.fireStorage.ref(`products/${product.thumbnail.name}`).delete();
            delete product.newThumbnail;
            product.thumbnail = newThumbnail;

            this._firestore
              .collection('products')
              .doc(product.id)
              .update(product)
              .then((response) => resolve(response))
              .catch((err) => reject(err));
          })
          .catch((err) => reject(err));
      } else {
        this._firestore
          .collection('products')
          .doc(product.id)
          .update(product)
          .then((response) => resolve(response))
          .catch((err) => reject(err));
      }
    });
  }

  uploadImageToProduct(productID, image: Image): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fireStorage
        .upload(`products/${image.name}`, image.blob)
        .then((response) => {
          console.log(response);
          if (response) {
            response.ref.getDownloadURL().then((url) => {
              this._firestore
                .collection('products')
                .doc(productID)
                .update({
                  images: firestore.FieldValue.arrayUnion({
                    name: image.name,
                    url: url,
                  }),
                })
                .then((firestoreResponse) => {
                  resolve(firestoreResponse);
                });
            });
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  changeThumbnail(product: Product, thumbnail) {}

  removeImageFromProduct(collection, docID, imageName, images): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this._firestore
        .collection(collection)
        .doc(docID)
        .update({
          images: images.filter((image) => {
            return image.name !== imageName && image.thumbnail !== true;
          }),
        })
        .then((response) => {
          this.fireStorage
            .ref(`products/${imageName}`)
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
