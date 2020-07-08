import { Component, OnInit } from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {Product} from "../../../@core/data/product";

@Component({
  selector: 'ngx-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent implements OnInit {

  product: Product;
  title: string;
  category: boolean;

  constructor(public dialogRef: NbDialogRef<DeleteConfirmationComponent>) {}

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.title = this.product ? this.product.name : '';
  }

}
