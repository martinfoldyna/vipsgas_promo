import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../products.service";
import {Product} from "../../../@core/data/product";
import {ImagesService} from "../../../@core/utils/images.service";

@Component({
  selector: 'ngx-condensing-boilers',
  templateUrl: './condensing-boilers.component.html',
  styleUrls: ['./condensing-boilers.component.scss']
})
export class CondensingBoilersComponent implements OnInit {
  public category: string = "condensing-boilers";
  allProducts: Array<Product>;
  uniquePositions: Array<string>;
  productPositions: Array<{name: string, code: string}>
  firstPosition: Array<Product>;
  filteredProducts: Array<any>;
  positionType: Array<string>;

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
    private productsService: ProductsService,
    private imagesService: ImagesService
  ) {
    this.allProducts = new Array<Product>();
    this.filteredProducts = new Array<any>();
    this.productPositions = new Array<{name: string, code: string}>();
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getProductsByCategory(this.category).then(response => {
      this.allProducts = response;

      // Loading thumbnail image for each boiler
      for (let product of this.allProducts) {
        this.productsService.getImage(product.thumbnail.name).then(image => {
          product.thumbnailURL = image;
        });

        // "Beautify" position names from type: "position&type" to "Position: type"
        let positionNameSplitted = product.position.split('&');
        let positionName = positionNameSplitted[0][0].toUpperCase() + positionNameSplitted[0].slice(1) + ': ' + positionNameSplitted[1].replace(/-/g, ' ');
        product.position = positionName
      }

      // sort products by name alphabetically
      this.allProducts.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
        if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
        return 0;
      })

      // Search for all unique positions
      this.uniquePositions = [...new Set(this.allProducts.map(product => product.position))];

      // sort postitions alphabetically
      this.uniquePositions.sort((a, b) => {
        if(a < b) { return -1; }
        if(a > b) { return 1; }
        return 0;
      })

      // Categorise products by its position
      for (let position of this.uniquePositions) {
        this.filteredProducts[position] = this.allProducts.filter(product => product.position === position);
      }

      console.log(this.filteredProducts);

    });
  }
}
