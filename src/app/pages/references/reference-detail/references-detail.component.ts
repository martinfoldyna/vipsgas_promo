import { Component, OnInit } from '@angular/core';
import { ReferencesService } from '../references.service';
import { Reference } from '../../../@core/data/reference';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { AuthService } from '../../auth/auth.service';
import { TinyMceConfig } from '../../../@core/data/tinyMceConfig';
import { GeneralService } from '../../../@core/utils/general.service';
import { ImagesService } from '../../../@core/utils/images.service';
import { ImageDetailComponent } from '../../cards/image-detail/image-detail.component';
import { Image } from '../../../@core/data/image';

@Component({
  selector: 'ngx-references-detail',
  templateUrl: './references-detail.component.html',
  styleUrls: ['./references-detail.component.scss'],
})
export class ReferencesDetailComponent implements OnInit {
  id: string;
  reference: Reference;
  referenceLoaded: boolean = false;
  updateReference: boolean = false;
  tinyMceConfig: any;
  siteTitle: string;
  uploadNewImages: boolean = false;

  constructor(
    private referenceService: ReferencesService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: NbToastrService,
    public authService: AuthService,
    private generalService: GeneralService,
    private imagesService: ImagesService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.loadReference();
    this.tinyMceConfig = TinyMceConfig;
  }

  loadReference() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (!this.id) {
      this.router.navigateByUrl('/pages/references');
    }
    this.referenceService
      .getReferenceById(this.id)
      .then((reference) => {
        if (reference) {
          this.reference = reference;
          this.referenceLoaded = true;
          this.siteTitle = reference.title;
          if (this.reference.images) {
            this.reference.images = this.reference.images?.sort((a, b) =>
              a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
            );
          }
        } else {
          this.toastr.warning(
            'Během načítání reference došlo k chybě.',
            'Chyba'
          );
        }
      })
      .catch((err) => {
        console.log(err);
        this.toastr.warning(err, 'Chyba');
        this.router.navigateByUrl('/pages/references');
      });
  }

  editReference() {
    this.referenceService
      .updateReference(this.reference)
      .then((response) => {
        this.toastr.success('', 'Reference byl upravena.');
        this.updateReference = false;
      })
      .catch((err) => {
        this.toastr.danger(
          err ? JSON.stringify(err) : 'Během úpravy reference došlo k chybě.',
          'Chyba'
        );
      });
  }

  deleteReference() {
    this.generalService
      .deleteItem('references', this.reference.id)
      .then((status) => {
        if (this.reference.images && this.reference.images.length > 0) {
          this.imagesService
            .deleteAllImagesInSection('references', this.reference.images)
            .then((response) => {
              this.toastr.success('', 'Refrence byla úspěšně odstraněna.');
              this.router.navigateByUrl('/pages/references/dashboard');
            })
            .catch((err) => {
              this.toastr.danger(
                err
                  ? JSON.stringify(err)
                  : 'Během odstraňování reference došlo k chybě.',
                'Chyba'
              );
            });
        } else {
          this.toastr.success('', 'Refrence byla úspěšně odstraněna.');
          this.router.navigateByUrl('/pages/references/dashboard');
        }
      });
  }

  openImage(allImages, index) {
    this.dialogService.open(ImageDetailComponent, {
      context: {
        allImages: allImages,
        index: index,
      },
      backdropClass: 'custom-backdrop',
    });
  }

  deleteImage(image: Image) {
    this.generalService
      .removeImageFromProduct(
        'references',
        this.reference.id,
        image.name,
        this.reference.images
      )
      .then((response) => {
        this.toastr.success('', 'Obrázek byl odstraněn');
        this.loadReference();
      })
      .catch((err) => {
        console.log(err);
        this.toastr.danger(
          err
            ? JSON.stringify(err)
            : 'Během odstraňování obrázku došlo k chybě.',
          'Chyba'
        );
      });
  }
}
