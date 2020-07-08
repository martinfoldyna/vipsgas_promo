import { Component, OnInit, Input } from '@angular/core';
import {Category} from "../../../@core/data/category";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'ngx-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent implements OnInit {
  @Input() category: Category;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    console.log(this.category);
  }

}
