import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {ImageSection} from "../../@core/data/image-section";
import {TinyMceConfig} from "../../@core/data/tinyMceConfig";
import {PensionData} from "../../@core/data/pensionData";
import {ImageDetailComponent} from "../cards/image-detail/image-detail.component";
import {NbDialogService, NbToastrService} from "@nebular/theme";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'ngx-pension',
  templateUrl: './pension.component.html',
  styleUrls: ['./pension.component.scss']
})
export class PensionComponent implements OnInit {
  // galleryOptions: NgxGalleryOptions[];
  // galleryImages: NgxGalleryImage[];
  editContent: boolean = false;
  data: PensionData;
  loadingContent: boolean = false;
  tinyMceConfig = TinyMceConfig;
  galleryImages;

  //importing firestore, because is not necessary to have servicee for one action - fetching the description
  constructor(
    private firestore: AngularFirestore,
    private dialogService: NbDialogService,
    public authService: AuthService,
    private toastr: NbToastrService
  ) { }

  ngOnInit() {

    this.galleryImages = [
      {
        small: './../../../assets/images/pension/01.jpg',
        url: './../../../assets/images/pension/01.jpg',
      },
      {
        small: './../../../assets/images/pension/02.jpg',
        url: './../../../assets/images/pension/02.jpg',
      },
      {
        small: './../../../assets/images/pension/03.jpg',
        url: './../../../assets/images/pension/03.jpg',
      },
      {
        small: './../../../assets/images/pension/04.jpg',
        url: './../../../assets/images/pension/04.jpg',
      },
      {
        small: './../../../assets/images/pension/05.jpg',
        url: './../../../assets/images/pension/05.jpg',
      },
      {
        small: './../../../assets/images/pension/06.jpg',
        url: './../../../assets/images/pension/06.jpg',
      },
      {
        small: './../../../assets/images/pension/07.jpg',
        url: './../../../assets/images/pension/07.jpg',
      },
      {
        small: './../../../assets/images/pension/08.jpg',
        url: './../../../assets/images/pension/08.jpg',
      },
      {
        small: './../../../assets/images/pension/09.jpg',
        url: './../../../assets/images/pension/09.jpg',
      },
      {
        small: './../../../assets/images/pension/10.jpg',
        url: './../../../assets/images/pension/10.jpg',
      },
      {
        small: './../../../assets/images/pension/11.jpg',
        url: './../../../assets/images/pension/11.jpg',
      },
      {
        small: './../../../assets/images/pension/12.jpg',
        url: './../../../assets/images/pension/12.jpg',
      },
      {
        small: './../../../assets/images/pension/13.jpg',
        url: './../../../assets/images/pension/13.jpg',
      },
      {
        small: './../../../assets/images/pension/14.jpg',
        url: './../../../assets/images/pension/14.jpg',
      },
      {
        small: './../../../assets/images/pension/15.jpg',
        url: './../../../assets/images/pension/15.jpg',
      },
      {
        small: './../../../assets/images/pension/16.jpg',
        url: './../../../assets/images/pension/16.jpg',
      },
      {
        small: './../../../assets/images/pension/17.jpg',
        url: './../../../assets/images/pension/17.jpg',
      },
      {
        small: './../../../assets/images/pension/18.jpg',
        url: './../../../assets/images/pension/18.jpg',
      },
      {
        small: './../../../assets/images/pension/19.jpg',
        url: './../../../assets/images/pension/19.jpg',
      },
      {
        small: './../../../assets/images/pension/20.jpg',
        url: './../../../assets/images/pension/20.jpg',
      },
    ];
    this.loadDescription();
  }

  loadDescription() {
    this.loadingContent = true;

    this.firestore.collection('pension').snapshotChanges().subscribe(response => {
      this.data = response.map(item => {
        const data = item.payload.doc.data() as PensionData;
        const id = item.payload.doc.id;
        return {id, ...data};
      })[0];

      this.loadingContent = false;
    }, err => {
      console.log(err);
    })
  }

  updateContent() {
    this.firestore.collection('pension').doc(this.data.id).update({
      description: this.data.description
    }).then(response => {
      this.toastr.success('', 'Obsah byl upraven.');
      this.editContent = false;
    }).catch(err => {
      this.toastr.danger(err ? JSON.stringify(err) : 'Během nahrávání obsahu došlo k chybě.', 'Chyba')

    })
  }

  openImage(allImages, index) {
    this.dialogService.open(ImageDetailComponent, {context: {
        allImages: allImages,
        index: index
      }})
  }

}
