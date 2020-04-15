import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from "@angular/fire/firestore";
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {News} from "../../@core/data/news";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private firestore: AngularFirestore) { }

  addNews(data): Promise<any> {
    return this.firestore.collection('news').add(data);
  }

  getNews(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firestore.collection<News>('news').snapshotChanges();

  }

}
