import { Component, OnInit } from '@angular/core';
import {Product} from "../../../@core/data/product";
import {ProductsService} from "../products.service";

@Component({
  selector: 'ngx-tuv-heaters',
  templateUrl: './tuv-heaters.component.html',
  styleUrls: ['./tuv-heaters.component.scss']
})
export class TuvHeatersComponent implements OnInit {

  public category: string = "tuv-heaters";
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
