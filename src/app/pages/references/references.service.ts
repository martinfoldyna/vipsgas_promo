import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference} from "@angular/fire/firestore";
import {AngularFireStorage} from "@angular/fire/storage";
import {Reference} from "../../@core/data/reference";
import {Image} from "../../@core/data/image";
import {firestore} from "firebase/app";

@Injectable({
  providedIn: 'root'
})
export class ReferencesService {

  constructor(
    private _firestore: AngularFirestore,
    private fireStorage: AngularFireStorage
  ) { }

  createReference(reference: Reference): Promise<DocumentReference> {
    return this._firestore.collection('references').add(reference);
  }

  loadAllReferences(): Promise<Array<Reference>> {
    return new Promise((resolve, reject) => {
      this._firestore.collection('references').snapshotChanges().subscribe(response => {
        if(response) {
          resolve(response.map(a => {
            const data = a.payload.doc.data() as Reference;
            const id = a.payload.doc.id;
            return { id, ...data };
          }));
        } else {
          reject('Not found')
        }
      })
  })
  }

  getReferenceById(id: string): Promise<Reference> {
    return new Promise<Reference>((resolve, reject) => {
      this.loadAllReferences().then(references => {
        let reference: Reference = references.filter(filterReference => {
          return filterReference.id === id;
        })[0];
        if (reference) {
          resolve(reference);
        } else {
          reject('Reference nebyla nalezena');
        }
      }).catch(err => {
        reject(err);
      })
    })
  }

  updateReference(reference: Reference): Promise<void> {
    return this._firestore.collection('references').doc(reference.id).update(reference);
  }

  uploadImageToProduct(productID, image: Image): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fireStorage.upload(`references/${image.name}`, image.blob).then(response => {
        console.log(response);
        if (response) {
          response.ref.getDownloadURL().then(url => {
            this._firestore.collection('references').doc(productID).update(
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
}
