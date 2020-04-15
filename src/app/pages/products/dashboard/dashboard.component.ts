import { Component, OnInit } from '@angular/core';
import {Product} from "../../../@core/data/product";
import {AuthService} from "../../auth/auth.service";
import {ProductsService} from "../products.service";
import {Category} from "../../../@core/data/category";

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public product: Product;

  constructor(
    private authService: AuthService,
    private productsService: ProductsService,
  ) {
    this.product = {
      name: '',
    };
  }

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

  ngOnInit() {
  }




}
