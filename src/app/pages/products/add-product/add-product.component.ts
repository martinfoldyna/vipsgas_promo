import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product, ProductTypeOptions} from "../../../@core/data/product";
import {AuthService} from "../../auth/auth.service";
import {ProductsService} from "../products.service";
import {ImagesService} from "../../../@core/utils/images.service";
import {TinymceOptions} from "ngx-tinymce";
import {TinyMceConfig} from "../../../@core/data/tinyMceConfig";
import {DynamicCategory} from "../../../@core/data/category";
import {ImageCompress} from "ngx-image-compress/lib/image-compress";
import {NgxImageCompressService} from "ngx-image-compress";

@Component({
  selector: 'ngx-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  //TODO: Add formControl

  @Output('loadProducts') loadProducts: EventEmitter<any> = new EventEmitter();

  @Input('productCategory') productCategory: DynamicCategory;
  @Input('productTypeOptions') productTypeOptions: ProductTypeOptions;

  public product: Product;
  public uploadingProduct: boolean = false;
  public loadingCategory: boolean = true;
  public tinyMceConfig = TinyMceConfig;

  constructor(
    public authService: AuthService,
    private productsService: ProductsService,
    private imagesService: ImagesService,
    private imageCompress: NgxImageCompressService
  ) {
    this.product = {
      name: '',
    };
  }

  ngOnInit() {
  }

  onFileChange(event) {
    this.setupFileReader(event.target.files[0]);
  }

  setupFileReader(file) {
    let reader = new FileReader();

    reader.onload = (e: any) => {
      let imageSize = this.imageCompress.byteCount(e.target.result);

      const quality = this.imagesService.translateQuality(imageSize);

      console.log('quality:', quality);
      this.imagesService.compressFile(e.target.result, file.name, quality).then(compressedImage => {
        if(compressedImage) {
          this.product.thumbnail = {name: file.name, blob: compressedImage.blob};
        }
      }).catch(err => {
        console.log(err);
      })
    }

    reader.readAsDataURL(file);
  }

  addProduct() {
    this.uploadingProduct = true;
    this.product.productCategory = {
      id: this.productCategory.id,
      name: this.productCategory.name
    };
    console.log(this.product);
    this.productsService.createProduct(this.product).then(result => {
      console.log(result);
      this.loadProducts.emit()
      this.uploadingProduct = false;
    })
  }
}
