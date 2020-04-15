import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../products.service";
import {Product} from "../../../@core/data/product";
import {ImagesService} from "../../../@core/utils/images.service";

@Component({
  selector: 'ngx-boiler-regulation',
  templateUrl: './boiler-regulation.component.html',
  styleUrls: ['./boiler-regulation.component.scss']
})
export class BoilerRegulationComponent implements OnInit {
  private category: string = "boiler-regulation";
  allProducts: Array<Product>;

  constructor(
    private productsService: ProductsService,
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
