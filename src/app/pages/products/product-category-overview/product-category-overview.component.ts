import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Product,
  ProductPosition,
  ProductType,
} from '../../../@core/data/product';
import { ImagesService } from '../../../@core/utils/images.service';
import { ProductsService } from '../products.service';
import { Category, DynamicCategory } from '../../../@core/data/category';
import { CategoryService } from '../category.service';
import { GeneralService } from '../../../@core/utils/general.service';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { DeleteConfirmationComponent } from '../../cards/delete-confirmation/delete-confirmation.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';

@Component({
  selector: 'ngx-product-category-overview',
  templateUrl: './product-category-overview.component.html',
  styleUrls: ['./product-category-overview.component.scss'],
})
export class ProductCategoryOverviewComponent implements OnInit {
  positionOptions: Array<ProductPosition>;
  typeOptions: Array<ProductType>;
  thumbnail: { name: string; blob: Blob };
  allCategories: Array<DynamicCategory>;
  compressingImage: boolean = false;

  public myForm = new FormGroup({
    name: new FormControl('', Validators.required),
    thumbnail: new FormControl('', Validators.required),
    position: new FormControl(''),
    type: new FormControl(''),
  });

  constructor(
    private imagesService: ImagesService,
    private productsService: ProductsService,
    public categoryService: CategoryService,
    private generalService: GeneralService,
    private dialogService: NbDialogService,
    private toastr: NbToastrService
  ) {
    this.positionOptions = new Array<ProductPosition>();
    this.typeOptions = new Array<ProductType>();
    this.allCategories = new Array<DynamicCategory>();
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  onFileChange(event) {
    this.setupFileReader(event.target.files[0]);
  }

  setupFileReader(file) {
    this.compressingImage = true;
    let reader = new FileReader();

    reader.onload = (e: any) => {
      this.imagesService
        .compressFile(e.target.result, file.name, 55)
        .then((compressedImage) => {
          if (compressedImage) {
            this.compressingImage = false;
            this.thumbnail = {
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

  loadCategories() {
    this.categoryService.retrieveCategories().subscribe(
      (response) => {
        this.allCategories = response?.map((category) => {
          const data = category.payload.doc.data() as DynamicCategory;
          const id = category.payload.doc.id;
          return { id, ...data };
        });

        this.allCategories.forEach((category) => {
          category.categoryPositions.forEach((position, index) => {
            position.id = '0' + (index + 1);
          });
          category.categoryTypes.forEach((type, index) => {
            let positionId = category.categoryPositions.filter(
              (position) => position.value === type.condition
            )[0].id;

            type.id = positionId + '&' + '0' + (index + 1);
          });
        });

        console.log(this.allCategories);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  generateRandomString(): string {
    let alphabet = [
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
      returnString += alphabet[randomNumber];
      returnString += randomNumber;
    }

    return returnString + Date.now() + '.jpg';
  }

  pushToProductPosition(value) {
    // console.log(
    //   parseInt(this.positionOptions[this.positionOptions.length - 1].id)
    // );

    this.positionOptions.push({
      name: value,
      value: value.replace(/\s+/g, '-').toLowerCase(),
      id: '0' + (this.positionOptions.length + 1),
    });
    console.log(this.positionOptions);
  }

  pushToProductType(value, condition) {
    const id = condition.id + '&' + ('0' + (this.typeOptions.length + 1));

    this.typeOptions.push({
      name: value,
      value: value.replace(/\s+/g, '-').toLowerCase(),
      condition: condition.value,
      id: id,
    });

    console.log(this.typeOptions);
  }

  removePosition(index, value) {
    this.typeOptions.forEach((type, index) => {
      if (type.condition === value) {
        this.typeOptions.splice(index, 1);
      }
    });
    this.positionOptions.splice(index, 1);
    console.log('positionOptions', this.positionOptions);
    console.log('typeOptions', this.typeOptions);
  }

  uploadCategory() {
    let categoryData: DynamicCategory = {
      name: this.myForm.controls.name.value,
      thumbnail: this.thumbnail,
      categoryPositions: this.positionOptions,
      categoryTypes: this.typeOptions,
    };
    console.log(categoryData);
    this.categoryService
      .createCategory(categoryData)
      .then((response) => {
        this.toastr.success('', 'Nová kategorie byla úspěšně vytvořena.');
      })
      .catch((err) => {
        this.toastr.danger(
          err
            ? JSON.stringify(err)
            : 'Během komunikace s databází došlo k cyhbě.',
          'Chyba'
        );
      });
  }

  deleteCategory(categoryIndex: number) {
    let thisCatgegory = this.allCategories[categoryIndex];
    let categoryID = thisCatgegory.id;
    this.dialogService
      .open(DeleteConfirmationComponent, {
        context: {
          product: thisCatgegory,
          category: true,
        },
        backdropClass: 'custom-backdrop',
      })
      .onClose.subscribe((state) => {
        if (state) {
          this.productsService
            .getProductsByCategory(categoryID)
            .then((allProducts) => {
              let i = 0;
              let canDelete = false;
              if (allProducts && allProducts.length > 0) {
                for (let product of allProducts) {
                  this.generalService
                    .deleteItem('products', product.id)
                    .then((item) => {
                      i += 1;
                    })
                    .catch((err) => {
                      this.toastr.danger(
                        err.message
                          ? err.message
                          : 'Během odstaňování produktů došlo k chybě.',
                        'Chyba'
                      );
                    });
                }
                canDelete = i === allProducts.length;
              } else {
                canDelete = true;
              }
              if (canDelete) {
                this.categoryService
                  .removeCategory(thisCatgegory)
                  .then((response) => {
                    this.toastr.success('Kategorie byla úspěšně smazána.');
                  })
                  .catch((err) => {
                    this.toastr.danger(
                      err.message
                        ? err.message
                        : 'Během odstaňování kategorie došlo k chybě.',
                      'Chyba'
                    );
                  });
              }
            })
            .catch((err) => {
              this.toastr.danger(
                err.message
                  ? err.message
                  : 'Během načítání produtků kategorie došlo k chybě.',
                'Chyba'
              );
            });
        }
      });
  }

  editCategory(category: DynamicCategory) {
    this.dialogService
      .open(EditCategoryComponent, {
        context: {
          category: category,
        },
        closeOnBackdropClick: false,
        backdropClass: 'custom-backdrop',
      })
      .onClose.subscribe((state) => {
        this.loadCategories();
      });
  }
}
