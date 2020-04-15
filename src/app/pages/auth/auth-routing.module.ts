import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {NbAuthComponent} from '@nebular/auth';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: '',
        redirectTo: 'login',
      },
    ],
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AuthRoutingModule {
}
