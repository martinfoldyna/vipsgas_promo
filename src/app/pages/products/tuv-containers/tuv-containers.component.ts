import { Component, OnInit } from '@angular/core';
import {Product} from "../../../@core/data/product";
import {ProductsService} from "../products.service";

@Component({
  selector: 'ngx-tuv-containers',
  templateUrl: './tuv-containers.component.html',
  styleUrls: ['./tuv-containers.component.scss']
})
export class TuvContainersComponent implements OnInit {

  private category: string = "tuv-containers";
  allProducts: Array<Product>;

  constructor(
    private productsService: ProductsService
  ) {
    this.allProducts = new Array<Product>();
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getProductsByCategory(this.category).then(response => {
      this.allProducts = response;
      for(let product of this.allProducts) {
        this.productsService.getImage(product.thumbnail).then(image => {
          product.thumbnailURL = image
        })
      }
    });
  }

}
