import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLinkActive} from "@angular/router";
import {ProductsService} from "../products.service";
import {Product} from "../../../@core/data/product";

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
  routerLink: string = "";
  html: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) {
    this.product = { name: '' }
    this.productCategory  = {name: ''};
  }

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct() {
    this.productLoaded = false;
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot);
    this.productsService.getProductById(this.id).then(product => {
      this.product = product;
      this.productCategory= {
        name: this.productsService.translateProductCategory(product.productCategory),
        url: '/pages/products/' + product.productCategory
      };
      this.productLoaded = true;
    })
  }

  logHtml() {
    console.log(this.html)
  }

}
