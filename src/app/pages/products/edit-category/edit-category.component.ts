import { Component, OnInit } from '@angular/core';
import {DynamicCategory} from "../../../@core/data/category";
import {NbDialogRef, NbToastrService} from "@nebular/theme";
import {GeneralService} from "../../../@core/utils/general.service";
import {ImagesService} from "../../../@core/utils/images.service";
import {CategoryService} from "../category.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ProductPosition, ProductType} from "../../../@core/data/product";

@Component({
  selector: 'ngx-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  category: DynamicCategory;
  newThumbnailSrc: string;
  compressingImage: boolean = false;
  updatingCategory: boolean = false;
  positionOptions: Array<ProductPosition>;
  typeOptions: Array<ProductType>;


  constructor(
    public dialogRef: NbDialogRef<EditCategoryComponent>,
    private generalService: GeneralService,
    private imagesService: ImagesService,
    public categoryService: CategoryService,
    private toastr: NbToastrService
  ) {
    this.positionOptions = new Array<ProductPosition>();
    this.typeOptions = new Array<ProductType>();
  }

  editCategoryForm: FormGroup = new FormGroup({
    position: new FormControl(''),
    type: new FormControl(''),
    thumbnail: new FormControl('')
  })

  ngOnInit(): void {
  }

  onFileChange(event) {
    let file = event.target.files[0];
    this.compressingImage = true;
    this.setupFileReader(file).then(response => {
      this.category.newThumbnail = response;
      this.compressingImage = false;
    }).catch(err => {
      console.log(err);
    });
  }

  setupFileReader(file) {
    return new Promise<{name: string, blob: Blob}>((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = (e: any) => {
        let fileName = this.generalService.generateRandomString();
        this.newThumbnailSrc = e.target.result;
        this.imagesService.compressFile(e.target.result, fileName, 50).then(compressedImage => {
          if(compressedImage) {
            resolve({name: 'thumb_' + fileName, blob: compressedImage.blob});
          }
        }).catch(err => {
          reject(err);
        })
      }

      reader.readAsDataURL(file);
    })
  }

  updateCategory() {
    this.updatingCategory = true;
    this.category.categoryTypes.concat(this.typeOptions);
    this.category.categoryPositions.concat(this.positionOptions);
    this.category.categoryPositions = Object.assign({}, this.category.categoryPositions, this.positionOptions);
    this.category.categoryTypes = Object.assign({}, this.category.categoryTypes, this.typeOptions);
    console.log('Arrays concat');
    console.log('positions', this.category.categoryPositions);
    console.log('types', this.category.categoryTypes);
    this.categoryService.updateCategory(this.category).then(response => {
      this.toastr.success('', 'Kategorie byla upravená');
      this.updatingCategory = false;
      this.dialogRef.close(true);
    }).catch(err => {
      console.log(err);
      this.toastr.danger(err ? JSON.stringify(err) : 'Během komunikace s datábází došlo k chybě', 'Chyba');
    })
  }

  pushToProductPosition(value) {
    this.positionOptions.push({
      name: value,
      value: value.replace(/\s+/g, '-').toLowerCase()
    });
  }

  pushToProductType(value, condition) {
    this.typeOptions.push({
      name: value,
      value: value.replace(/\s+/g, '-').toLowerCase(),
      condition: condition.value
    });
    console.log(this.typeOptions);
  }

  removeFromTypesList(position) {
    this.typeOptions.splice(position, 1);
  }

  removeFromPositionsList(position) {
    let value = this.positionOptions[position].value;
      this.typeOptions.forEach((type, index) => {
        if(type.condition === value) {
          this.typeOptions.splice(index, 1);
        }
      })
      this.positionOptions.splice(position, 1);
      console.log('positionOptions', this.positionOptions);
      console.log('typeOptions', this.typeOptions);
  }

}
