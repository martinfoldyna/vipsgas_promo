import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';
import { Category, DynamicCategory } from '../../../@core/data/category';
import { NbToastrService } from '@nebular/theme';
import {
  Product,
  ProductPosition,
  ProductType,
  ProductTypeOptions,
} from '../../../@core/data/product';
import { ImagesService } from '../../../@core/utils/images.service';
import { TinyMceConfig } from '../../../@core/data/tinyMceConfig';
import { AuthService } from '../../auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'ngx-products-category',
  templateUrl: './products-category.component.html',
  styleUrls: ['./products-category.component.scss'],
})
export class ProductsCategoryComponent implements OnInit {
  id: string;
  category: DynamicCategory;
  allProducts: Array<Product>;
  filteredProducts: Array<{
    products: Array<any>;
    id: string;
    position: ProductPosition;
  }>;
  uniquePositions: Array<{ name: string; code: string }>;
  productPositions: Array<{ name: string; code: string }>;
  firstPosition: Array<Product>;
  positionType: Array<string>;
  productOptions: ProductTypeOptions;

  public product: Product;
  public uploadingProduct: boolean = false;
  public categoryLoaded: boolean = false;
  public tinyMceConfig = TinyMceConfig;

  constructor(
    private productsService: ProductsService,
    public categoryService: CategoryService,
    private route: ActivatedRoute,
    private toastr: NbToastrService,
    private imagesService: ImagesService,
    public authService: AuthService,
    private imageCompress: NgxImageCompressService
  ) {
    this.allProducts = new Array<Product>();
    this.filteredProducts = new Array<any>();
    this.productPositions = new Array<{ name: string; code: string }>();
    this.product = {
      name: '',
    };
  }

  public newProductForm = new FormGroup({
    name: new FormControl('', Validators.required),
    thumbnail: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    type: new FormControl(''),
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadCategoryInfo();
    this.loadProducts();
    console.log(parseInt('01&03'));
    let array = ['01&01', '02&01', '01&02', '01&03'];
    console.log(array.sort((a, b) => (a > b ? 1 : -1)));
  }

  loadCategoryInfo() {
    this.categoryService
      .retrieveCategoryByID(this.id)
      .then((category) => {
        this.category = category;
        this.categoryLoaded = true;
        this.productOptions = {
          productPosition: this.category.categoryPositions,
          productType: this.category.categoryTypes,
        };
      })
      .catch((err) => {
        this.toastr.danger(err.stringify, 'Chyba');
      });
  }

  loadProducts() {
    this.filteredProducts = new Array<any>();

    this.productsService.getProductsByCategory(this.id).then((response) => {
      this.allProducts = response;

      // Loading thumbnail image for each boiler
      for (let product of this.allProducts) {
        // "Beautify" position names from type: "position&type" to "Position: type"
        let positionNameSplitted = product.position.split('&');

        let positionName =
          positionNameSplitted[1].length > 0
            ? positionNameSplitted[0][0].toUpperCase() +
              positionNameSplitted[0].slice(1).replace(/-/g, ' ') +
              ': ' +
              positionNameSplitted[1].replace(/-/g, ' ')
            : positionNameSplitted[0][0].toUpperCase() +
              positionNameSplitted[0].slice(1).replace(/-/g, ' ');
        product.beautifiedPosition = positionName;
      }

      // sort products by name alphabetically
      this.allProducts.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        return 0;
      });

      // Search for all unique positions
      this.uniquePositions = this.allProducts.map((product) => ({
        name: product.beautifiedPosition,
        code: product.position,
      }));

      //Remove duplicates from unique positions
      this.uniquePositions = this.uniquePositions.filter(
        (thing, index, self) =>
          self.findIndex(
            (t) => t.code === thing.code && t.name === thing.name
          ) === index
      );

      console.log(this.uniquePositions);

      // sort postitions alphabetically
      this.uniquePositions.sort((a, b) => {
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      });

      // Categorise products by its position
      for (let position of this.uniquePositions) {
        // this.filteredProducts[position.name] = this.allProducts.filter(
        //   (product) => product.beautifiedPosition === position.name
        // );
        // this.filteredProducts[position.name] = [];
        // this.filteredProducts[position.name].products = this.allProducts.filter(
        //   (product) => product.position === position.code
        // );
        // this.filteredProducts[
        //   position.name
        // ].id = this.translateProductPositionToId(position.code);
        let products = this.allProducts.filter(
          (product) => product.position === position.code
        );

        this.filteredProducts.push({
          products: this.allProducts.filter(
            (product) => product.position === position.code
          ),
          id: this.translateProductPositionToId(position.code),
          position: position,
        });
      }

      this.filteredProducts = this.filteredProducts.sort((a, b) =>
        a.id > b.id ? 1 : -1
      );
    });
  }

  //translate position to it's id for correct sorting
  translateProductPositionToId(positionString: string): string {
    let positionNameSplitted = positionString.split('&');
    let position = positionNameSplitted[0];
    let type = positionNameSplitted[1];

    let positionInfo = this.category.categoryPositions.find(
      (foundPosition) => foundPosition.value === position
    ).id;
    let typeInfo = this.category.categoryTypes.find(
      (foundType) =>
        foundType.value === type && foundType.condition === position
    ).id;

    console.log(`positionInfo info for ${position}`, positionInfo);
    console.log(`typeInfo info for ${type}`, typeInfo);

    return typeInfo;
  }

  onFileChange(event) {
    this.setupFileReader(event.target.files[0]);
  }

  setupFileReader(file) {
    let reader = new FileReader();

    reader.onload = (e: any) => {
      const imageSize = this.imageCompress.byteCount(e.target.result) / 1024;
      console.log('imageSize:', imageSize);

      const quality = this.imagesService.translateQuality(imageSize);

      console.log('quality:', quality);

      this.imagesService
        .compressFile(e.target.result, file.name, quality)
        .then((compressedImage) => {
          if (compressedImage) {
            this.product.thumbnail = {
              name: this.generateRandomString(),
              blob: compressedImage.blob,
            };
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    reader.readAsDataURL(file);
  }

  generateRandomString(): string {
    let alphabeta = [
      'A',
      'a',
      'B',
      'b',
      'C',
      'c',
      'D',
      'd',
      'E',
      'e',
      'F',
      'f',
      'G',
      'g',
      'H',
      'h',
      'I',
      'i',
      'J',
      'j',
      'K',
      'k',
      'L',
      'l',
      'M',
      'm',
      'N',
      'n',
      'O',
      'o',
      'P',
      'p',
      'Q',
      'q',
      'R',
      'r',
      'S',
      's',
      'T',
      't',
      'U',
      'u',
      'V',
      'v',
      'W',
      'w',
      'X',
      'x',
      'Y',
      'y',
      'Z',
      'z',
    ];
    let returnString = '';

    for (let i = 0; i <= 10; i++) {
      let randomNumber = Math.round(Math.random() * 10 + 1);
      returnString += alphabeta[randomNumber];
      returnString += randomNumber;
    }

    return returnString + Date.now() + '.jpg';
  }

  addProduct() {
    this.uploadingProduct = true;
    this.product.productCategory = {
      id: this.category.id,
      name: this.category.name,
    };

    const positionValue = this.newProductForm.controls.position.value
      .replace(/\s+/g, '-')
      .toLowerCase();
    const typeValue = this.newProductForm.controls.type.value
      .replace(/\s+/g, '-')
      .toLowerCase();

    this.product.name = this.newProductForm.controls.name.value;
    this.product.description = this.newProductForm.controls.description.value;
    this.product.position = positionValue + '&' + typeValue;
    console.log(this.product);
    this.productsService
      .createProduct(this.product)
      .then((result) => {
        this.toastr.success('', 'Nový produkt byl přidán.');
        this.loadProducts();
        this.newProductForm.reset();
        this.uploadingProduct = false;
      })
      .catch((err) => {
        console.log(err);
        this.toastr.danger(JSON.stringify(err), 'Chyba');
      });
  }
}
