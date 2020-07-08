import { Component, OnInit } from '@angular/core';
import {Product} from "../../../@core/data/product";
import {ProductsService} from "../products.service";

@Component({
  selector: 'ngx-hydraulic-distributor',
  templateUrl: './hydraulic-distributor.component.html',
  styleUrls: ['./hydraulic-distributor.component.scss']
})
export class HydraulicDistributorComponent implements OnInit {

  public category: string = "hydraulic-distributor";
  allProducts: Array<Product>;

  categoryOptions = {
    productPosition: [
      {
        name: 'Nástěnné',
        value: 'nástěnné',
      },
      {
        name: 'Stacionární',
        value: 'stacionární',
      },
    ],
    productType: [
      {
        name: 'Pouze topné',
        value: 'pouze-topné',
      },
      {
        name: 'Kombinované s průtokovým ohřívačem',
        value: 'kombinované-s-průtokovým-ohřívačem',
        condition: 'nástěnné',
      },
      {
        name: 'Kombinované s vestavěným boilerem',
        value: 'kombinované-s-vestavěným-boilerem',
        condition: 'nástěnné',
      },
      {
        name: 'Kombinované s bojlerem',
        value: 'kombinované-s-bojlerem',
        condition: 'stacionární'
      }
    ]
  }

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
