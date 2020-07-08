import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../@core/data/product';
import {GeneralService} from '../../../@core/utils/general.service';
import {AuthService} from "../../auth/auth.service";
import {NbMenuService} from "@nebular/theme";
import {Router} from "@angular/router";
import {Image} from "../../../@core/data/image";

@Component({
  selector: 'ngx-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Output('loadProducts') loadProducts: EventEmitter<any> = new EventEmitter();

  @Input('product') product: Product;
  @Input('productCategory') productCategory: string;
  thumbnail: Image;

  productDetailLink: string;
  deletingProduct: boolean = false;

  productOptions = [ {title: 'Upravit', icon: 'edit-outline'}, { title: 'Smazat', icon: 'trash-2-outline', status: 'danger' } ]

  constructor(
    private generalService: GeneralService,
    public authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.productDetailLink = '/pages/products/detail/' + this.product.id;
    for (const [index, value] of this.product.images.entries()) {
      if (value.thumbnail) {
        this.thumbnail = this.product.images[index];
      }
    }
    console.log(this.thumbnail);
  }

  navigateToProductDetail() {
    this.router.navigateByUrl(this.productDetailLink);
  }


}
