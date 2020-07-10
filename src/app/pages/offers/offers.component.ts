import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Offer} from "../../@core/data/offer";
import {ImagesService} from "../../@core/utils/images.service";
import {GeneralService} from "../../@core/utils/general.service";
import {OffersService} from "./offers.service";
import {rejects} from "assert";
import {DomEvent} from "leaflet";
import off = DomEvent.off;
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NbToastrService} from "@nebular/theme";

@Component({
  selector: 'ngx-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  offer: Offer;
  allOffers: Array<Offer>;
  uploadingOffer: boolean = false;

  offerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    thumbnail: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required)
  })


  /***
   * Přidat jeden text input na popis akce
   */

  constructor(
    public authService: AuthService,
    private imagesService: ImagesService,
    private generalService: GeneralService,
    private offersService: OffersService,
    private toastr: NbToastrService
  ) {
    this.offer = {
      thumbnail: {
        name: '',
      },
      content: {
        url: '',
      }
    }
  }

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers() {
    this.offersService.loadOffers().then(responseOffers => {
      this.allOffers = responseOffers;
    }).catch(err => {
      this.toastr.danger(err ? JSON.stringify(err) : 'Během načítání akcí došlo k chybě.', 'Chyba')
    })
  }

  onThumbnailChange(event) {
    let file = event.target.files[0];

    let reader = new FileReader();

    reader.onload = (e: any) => {
      let fileName = this.generalService.generateRandomString();
      this.imagesService.compressFile(e.target.result, fileName, 50).then(compressedImage => {
        if(compressedImage) {
          this.offer.thumbnail = {name: 'thumb_' + fileName, blob: compressedImage.blob};
        }
      }).catch(err => {
        console.log(err);
      })
    }

    reader.readAsDataURL(file);
  }

  onContentChange(event) {
    this.offer.content.file = event.target.files[0];
  }

  uploadOffer() {
    this.uploadingOffer = true;
    this.offersService.uploadOffer(this.offer).then(response => {
      this.uploadingOffer = false;
      this.loadOffers();
      this.toastr.success('', 'Nová akce byla přidána.')
    }).catch(err => {
      this.toastr.danger(err ? JSON.stringify(err) : 'Během nahrávání akcí došlo k chybě.', 'Chyba')
    })
  }

  removeOffer(offerID: string) {
    this.generalService.deleteItem('offers', offerID).then(response => {
      this.loadOffers();
      this.toastr.success('', 'Akce byla odstraněna')
    }).catch(err => {
      this.toastr.danger(err ? JSON.stringify(err) : 'Během odstraňování akce došlo k chybě.', 'Chyba')
    })
  }

}
