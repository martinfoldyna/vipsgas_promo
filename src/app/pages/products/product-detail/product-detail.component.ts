import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLinkActive} from "@angular/router";
import {ProductsService} from "../products.service";
import {Product} from "../../../@core/data/product";
import {TinymceOptions} from "ngx-tinymce";
import {AuthService} from "../../auth/auth.service";
import {GeneralService} from "../../../@core/utils/general.service";
import {ImagesService} from "../../../@core/utils/images.service";
import {TinyMceConfig} from "../../../@core/data/tinyMceConfig";
import {GALLERY_IMAGE} from "ngx-image-gallery";
import {Gallery, GalleryItem, GalleryRef, ImageItem} from '@ngx-gallery/core';
import {Image, Thumbnail} from "../../../@core/data/image";
import {Location} from "@angular/common";
import {DeleteConfirmationComponent} from "../../cards/delete-confirmation/delete-confirmation.component";
import {NbDialogService, NbToastrService} from "@nebular/theme";
import {ImageDetailComponent} from "../../cards/image-detail/image-detail.component";
import {NgxImageCompressService} from "ngx-image-compress";

@Component({
  selector: 'ngx-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  id: string;
  product: Product;
  productLoaded: boolean = true;
  productCategory: {name?: string; url?: string};
  config;
  editingProduct: boolean = false;
  html = ``;
  deletingProduct: boolean = false;
  uploadNewImages: boolean = false;
  newImages: Array<Image>;
  selectedImagesPreview: Array<Image>;
  detailChangeThumbnail: boolean = false;
  thumbnail: Thumbnail;
  galleryItems: Array<GalleryItem>;
  uploadingImages: boolean = false;
  newThumbnailSrc: string;
  productImages: Array<Image>;

  tinyMceConfig = TinyMceConfig;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    public authService: AuthService,
    private generalService: GeneralService,
    private imagesService: ImagesService,
    private gallery: Gallery,
    private location: Location,
    private dialogService: NbDialogService,
    private toastr: NbToastrService,
    private imageCompress: NgxImageCompressService
  ) {
    this.product = { name: '' }
    this.productCategory  = {name: ''};
    this.newImages = new Array<Image>();
    this.selectedImagesPreview = new Array<any>();
    this.galleryItems = new Array<GalleryItem>();
  }

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct() {
    this.productLoaded = false;
    this.id = this.route.snapshot.paramMap.get('id');
    if(!this.id) {
      this.location.back();
    }

    this.productsService.getProductById(this.id).then(product => {
      if(product) {

        this.product = product;
        this.product.thumbnail.thumbnail = true;
        this.productImages = [product.thumbnail, ...product.images.sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)];
        console.log(this.productImages);

        if (product.productCategory) {
          this.productCategory = {
            name: this.productsService.translateProductCategory(product.productCategory),
            url: '/pages/products/' + product.productCategory
          };
        } else {
          this.productCategory = {
            name: 'Zpět',
            url: '/pages/products/dashboard'
          }
        }


        this.productLoaded = true;
      } else {
        this.router.navigateByUrl('/pages/products/dashboard')
      }
    })
  }

  logHtml(editor) {
    editor.on('keyUp', (e) => {
      console.log(this.html);
    })
  }

  onFileChange(event) {
    let files = event.target.files;
    console.log(files);
    for (let i = 0; i < files.length; i++) {

      // this.setupFileReader(i, files[i]);
      this.generalService.setupFileReader(files[i]).then(file => {
        this.newImages.push({name: this.product.id + "_" + files[i].name, blob: file.blob});
      }).catch(err => {

      })
    }
  }

  onThumbnailChange(event) {
    let thumbnail = event.target.files[0];
    this.generalService.setupFileReader(thumbnail).then(file => {
      this.newThumbnailSrc = file.src
      this.product.newThumbnail = ({name: this.product.id + '_' + thumbnail.name, blob: file.blob})
    }).catch(err => {

    })
  }

  // setupFileReaderThumbnail(file) {
  //   let reader = new FileReader();
  //
  //   reader.onload = (e: any) => {
  //     console.log("in file reader")
  //
  //     const imageSize = this.imageCompress.byteCount(e.target.result) / (1024);
  //     let quality = this.imagesService.translateQuality(imageSize);
  //
  //     console.log('quality:', quality);
  //     this.imagesService.compressFile(e.target.result, file.image, quality).then(compressedImage => {
  //
  //       if (compressedImage) {
  //         this.product.newThumbnail = ({name: file.name, blob: compressedImage.blob})
  //       }
  //     }).catch(err => {
  //       console.log(err);
  //     })
  //   }
  //
  // }

  // setupFileReader(fileIndex, file) {
  //   let reader = new FileReader();
  //
  //   reader.onload = (e: any) => {
  //     const imageSize = this.imageCompress.byteCount(e.target.result) / (1024);
  //     console.log('imageSize:', imageSize)
  //
  //     const quality = this.imagesService.translateQuality(imageSize);
  //
  //     console.log('quality:', quality);
  //
  //     this.imagesService.compressFile(e.target.result, file.name, quality).then(compressedImage => {
  //       this.selectedImagesPreview.push({url: compressedImage.src, index: fileIndex});
  //       if(compressedImage) {
  //
  //       }
  //     }).catch(err => {
  //       console.log(err);
  //     })
  //   }
  //
  //   reader.readAsDataURL(file);
  // }

  uploadImages() {
      this.uploadingImages = true;
      if(this.newImages.length > 0) {
        for (let i = 0; i < this.newImages.length; i++) {
          let image = this.newImages[i];
          this.productsService.uploadImageToProduct(this.product.id, image).then(uploadImages => {
            console.log(uploadImages);
            this.uploadingImages = false;
            this.loadProduct();
            this.selectedImagesPreview = new Array<Image>();
          }).catch(err => {
          })
        }
      }
  }

  deleteProduct() {
    this.deletingProduct = true;

    this.dialogService.open(DeleteConfirmationComponent, {
      context: {
        product: this.product
      },
      backdropClass: 'custom-backdrop'
    }).onClose.subscribe(confirmation => {
      if (confirmation) {
        this.generalService.deleteItem('products', this.id).then(result => {
          if(this.product.images && this.product.images.length > 0) {
            this.generalService.deleteAllImagesInDocument(this.product.images, 'products').then(response => {
              this.deletingProduct = false;
              this.toastr.success('', `Produkt ${this.product.name} byl úspěšně smazán.`)
              this.router.navigateByUrl(this.productCategory.url);
            }).catch(err => {
              console.log(err);
              this.toastr.danger('Nastala chyba', err);
            })
          } else {
            this.deletingProduct = false;
            this.router.navigateByUrl(this.productCategory.url);
            this.toastr.success('', `Produkt ${this.product.name} byl úspěšně smazán.`)

          }
        }).catch(err => {
          this.toastr.danger('Nastala chyba', err);
        });
      }
    });
  }

  removeFromList(index) {
    this.selectedImagesPreview.splice(index, 1);
    this.newImages.splice(index, 1);
  }

  editProduct() {
    this.productsService.editProduct(this.product).then(response => {console.log(response); this.editingProduct = false}).catch(err => {console.log(err);});
  }

  openImage(allImages, index) {
    this.dialogService.open(ImageDetailComponent, {
      context: {
        allImages: allImages,
        index: index
      },
      backdropClass: 'custom-backdrop'
    })
  }

  deleteImageFromProduct(imageName: string) {
    this.productsService.removeImageFromProduct('products', this.product.id, imageName, this.product.images).then(response => {
      console.log(response);
      this.loadProduct();
    }).catch(err => console.log(err));
  }

}
