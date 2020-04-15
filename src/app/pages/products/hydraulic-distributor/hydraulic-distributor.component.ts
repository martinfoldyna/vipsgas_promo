import { Component, OnInit } from '@angular/core';
import {Product} from "../../../@core/data/product";
import {ProductsService} from "../products.service";

@Component({
  selector: 'ngx-hydraulic-distributor',
  templateUrl: './hydraulic-distributor.component.html',
  styleUrls: ['./hydraulic-distributor.component.scss']
})
export class HydraulicDistributorComponent implements OnInit {

  private category: string = "hydraulic-distributor";
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
