import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireStorage} from "@angular/fire/storage";
import {Video} from "../../@core/data/video";

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  uploadVideo(video: Video) {
    if(video) {
      this.storage.upload(`videos/${video.title}`, video.thumbnail.blob).then()
    }
  }
}
