import { Component, OnInit } from '@angular/core';
import {Product} from "../../../@core/data/product";
import {AuthService} from "../../auth/auth.service";
import {ProductsService} from "../products.service";
import {Category, DynamicCategory} from "../../../@core/data/category";
import {CategoryService} from "../category.service";

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public product: Product;

  constructor(
    public authService: AuthService,
    private productsService: ProductsService,
    public categoryService: CategoryService,
  ) {
    this.product = {
      name: '',
    };
  }

  allDynamicCategories: Array<Category>;

  allCategories: Category[] = [
    {
      name: 'Kondenzační kotle',
      url: '/pages/products/condensing-boilers',
      image: 'products.png',
    },
    {
      name: 'Průtokové ohřívače TUV',
      url: '/pages/products/tuv-heaters',
      image: 'products.png',
    },
    {
      name: 'Zásobníky TUV',
      url: '/pages/products/tuv-containers',
      image: 'products.png',
    },
    {
      name: 'Regulace kotlů',
      url: '/pages/products/boiler-regulation',
      image: 'products.png',
    },
    {
      name: 'Hydraulické rozdělovače DIM ErP',
      url: '/pages/products/hydraulic-distributor',
      image: 'products.png',
    },
  ];

  categoryOverview: Category = {
    name: 'Přehled kategorií',
    url: '/pages/products/category-overview',
    image: 'products.png'
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.retrieveCategories().subscribe(response => {
      if(response) {
        this.allDynamicCategories = response.map(category => {
          const data = category.payload.doc.data() as DynamicCategory;
          return {
            name: data.name,
            url: '/pages/products/category/' + category.payload.doc.id,
            thumbnail: data.thumbnail.url,
          }
        })
      }
    }, err => {
      console.log(err);
    })
  }




}
