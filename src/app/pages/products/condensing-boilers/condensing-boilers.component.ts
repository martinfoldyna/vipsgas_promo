import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../products.service";
import {Product} from "../../../@core/data/product";
import {ImagesService} from "../../../@core/utils/images.service";

@Component({
  selector: 'ngx-condensing-boilers',
  templateUrl: './condensing-boilers.component.html',
  styleUrls: ['./condensing-boilers.component.scss']
})
export class CondensingBoilersComponent implements OnInit {
  private category: string = "condensing-boilers";
  allProducts: Array<Product>;

  constructor(
    private productsService: ProductsService,
    private imagesService: ImagesService
  ) {
    this.allProducts = new Array<Product>();
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getProductsByCategory(this.category).then(response => {
      this.allProducts = response;
      for (let product of this.allProducts) {
        this.productsService.getImage(product.thumbnail).then(image => {
          product.thumbnailURL = image
        })
      }
    });
  }
}
