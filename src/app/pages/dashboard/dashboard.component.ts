import { Component, OnInit } from '@angular/core';
import {Category} from "../../@core/data/category";

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  allCategories: Array<Category> = [
    {
      name: 'Produkty',
      url: '/pages/products',
      image: 'products.jpg',
    }, {
      name: 'Novinky',
      url: '/pages/news',
      image: 'news.jpg',
    }, {
      name: 'Akce',
      url: '/pages/offers',
      image: 'offers.jpg',
    }, {
      name: 'Reference',
      url: '/pages/references',
      image: 'references.jpg',
    }, {
      name: 'Produktová videa',
      url: '/pages/videos',
      image: 'videos.jpg',
    }, {
      name: 'Fotografie z akcí',
      url: '/pages/gallery',
      image: 'gallery.jpg',
    }, {
      name: 'Penzion CAIUS',
      url: '/pages/pension',
      image: 'pension.jpg',
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
