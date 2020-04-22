import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../@core/data/product';
import {GeneralService} from '../../../@core/utils/general.service';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'ngx-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Output('loadProducts') loadProducts: EventEmitter<any> = new EventEmitter();

  @Input('product') product: Product;
  @Input('productCategory') productCategory: string;

  productDetailLink: string

  constructor(
    private generalService: GeneralService,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    this.productDetailLink = '/pages/products/detail/' + this.product.id;
    console.log(this.productDetailLink);
  }

  deleteProduct(productId) {
    console.log(productId);
    this.generalService.deleteItem('products', productId).then(result => {
      console.log(result);
      this.loadProducts.emit();
    }).catch(err => {
      console.log(err);
    });

  }

}
