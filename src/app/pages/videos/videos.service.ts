import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireStorage} from "@angular/fire/storage";
import {Video} from "../../@core/data/video";
import {firestore} from "firebase";
import {ImageSection} from "../../@core/data/image-section";

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  uploadVideo(video: Video) {
    return new Promise<any>((resolve, reject) => {
      if(video) {
        this.storage.upload(`videos/${video.title}`, video.thumbnail.blob).then(image => {
          if(image.state === 'success') {
            image.ref.getDownloadURL().then(url => {
              this.firestore.collection('videos').add({
                title: video.title,
                url: video.url,
                thumbnail: {
                  name: video.thumbnail.name,
                  src: url
                },
                createdBy: video.createdBy,
                createdAt: video.createdAt
              }).then(uploadedVideo => {
                resolve(uploadedVideo);
              }).catch(err => {
                reject(err);
              })
            });


          }

        })
      }
    })
  }

  loadVideos(): Promise<Video[]> {
    return new Promise<Video[]>((resolve, reject) => {
      this.firestore.collection('videos').snapshotChanges().subscribe(response => {
        if(!response) {
          reject('Nastala chyba během načítání videí.')
        }
        let videos: Array<Video> = response.filter(item => {
          let data = item.payload.doc.data() as Video;
          console.log(data);
          return data;
        }).map(item => {
          const data = item.payload.doc.data() as Video;
          const id = item.payload.doc.id;
          return { id, ...data };
        });
        console.log(videos);
        resolve(videos);
      }, err => {
        reject(err);
      })
    })
  }
}
