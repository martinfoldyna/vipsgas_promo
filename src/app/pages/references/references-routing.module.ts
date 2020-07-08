import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ReferenceDashboardComponent} from "./reference-dashboard/reference-dashboard.component";
import {ReferencesDetailComponent} from "./reference-detail/references-detail.component";

const routes: Routes = [{
  path: 'dashboard',
  component: ReferenceDashboardComponent,
}, {
  path: 'detail/:id',
  component: ReferencesDetailComponent,
}, {
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full'
}, {
  path: '**',
  redirectTo: 'dashboard'
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferencesRoutingModule { }
