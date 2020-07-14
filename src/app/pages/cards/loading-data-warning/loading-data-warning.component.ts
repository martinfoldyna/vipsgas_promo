import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-loading-data-warning',
  template: `
    <nb-alert *ngIf="!data" [nbSpinner]="!data" status="warning" class="text-center">
        Načítám data..
    </nb-alert>
  `
})
export class LoadingDataWarningComponent implements OnInit {
  @Input('data') data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
