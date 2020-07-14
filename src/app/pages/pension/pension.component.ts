import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {ImageSection} from "../../@core/data/image-section";
import {TinyMceConfig} from "../../@core/data/tinyMceConfig";
import {PensionData} from "../../@core/data/pensionData";
import {ImageDetailComponent} from "../cards/image-detail/image-detail.component";
import {NbDialogService, NbToastrService} from "@nebular/theme";
import {AuthService} from "../auth/auth.service";
import {GeneralService} from "../../@core/utils/general.service";
import {Image} from "../../@core/data/image";

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
  uploadNewImages: boolean = false;

  //importing firestore, because is not necessary to have servicee for one action - fetching the description
  constructor(
    private firestore: AngularFirestore,
    private dialogService: NbDialogService,
    public authService: AuthService,
    private toastr: NbToastrService,
    private generalService: GeneralService
  ) { }

  ngOnInit() {

    this.loadData();
  }



  loadData() {
    this.loadingContent = true;

    this.firestore.collection('pension').snapshotChanges().subscribe(response => {
      this.data = response.map(item => {
        const data = item.payload.doc.data() as PensionData;
        const id = item.payload.doc.id;
        return {id, ...data};
      })[0];

      // this.data.images = this.data.images.sort((a,b) => a.name > b.name ? 1 : -1)

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
    allImages = this.data.images
    this.dialogService.open(ImageDetailComponent, {context: {
        allImages: allImages,
        index: index
      }})
  }

  deleteImage(image: Image) {
    this.generalService.removeImageFromProduct('pension', this.data.id, image.name, this.data.images).then(response => {
      this.toastr.success('', 'Obrázek byl odtraněn');
      this.loadData();
    }).catch(err => {
      this.toastr.danger(err ? 'Během odstraňování obrázku došlo k chybě.' : JSON.stringify(err), 'Chyba')
    })
  }

}
