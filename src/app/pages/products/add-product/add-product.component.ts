import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product, ProductTypeOptions} from "../../../@core/data/product";
import {AuthService} from "../../auth/auth.service";
import {ProductsService} from "../products.service";
import {ImagesService} from "../../../@core/utils/images.service";
import {TinymceOptions} from "ngx-tinymce";
import {TinyMceConfig} from "../../../@core/data/tinyMceConfig";
import {DynamicCategory} from "../../../@core/data/category";

@Component({
  selector: 'ngx-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  //TODO: Add tinyMCE textarea
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
    private imagesService: ImagesService
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
      this.imagesService.compressFile(e.target.result, file.name, 55).then(compressedImage => {
        if(compressedImage) {
          this.product.thumbnail = {name: this.generateRandomString(), blob: compressedImage.blob};
        }
      }).catch(err => {
        console.log(err);
      })
    }

    reader.readAsDataURL(file);
  }

  generateRandomString(): string {
    let alphabeta = ['A', 'a', 'B', 'b', 'C', 'c', 'D', 'd', 'E', 'e', 'F', 'f', 'G', 'g', 'H', 'h', 'I', 'i', 'J', 'j', 'K', 'k', 'L', 'l', 'M', 'm', 'N', 'n', 'O', 'o', 'P', 'p', 'Q', 'q', 'R', 'r', 'S', 's', 'T', 't', 'U', 'u', 'V', 'v', 'W', 'w', 'X', 'x', 'Y', 'y', 'Z', 'z']
    let returnString = "";

    for(let i = 0; i <= 10; i++) {
      let randomNumber = Math.round((Math.random() * 10) + 1);
      returnString += alphabeta[randomNumber];
      returnString += randomNumber;
    }

    return returnString + Date.now() + '.jpg';
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
