import { Component, OnInit } from '@angular/core';
import {Category} from '../../@core/data/category';
import {AuthService} from '../auth/auth.service';
import {ProductsService} from './products.service';
import {Product} from '../../@core/data/product';

@Component({
  selector: 'ngx-products',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class ProductsComponent implements OnInit {
 constructor() {
 }
 ngOnInit(): void {
 }

}
