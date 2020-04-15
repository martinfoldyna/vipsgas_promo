import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {AuthRoutingModule} from './auth-routing.module';
import {NbAuthModule} from '@nebular/auth';
import {FormsModule} from '@angular/forms';
import {
  NbActionsModule,
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule, NbSpinnerModule
} from '@nebular/theme';
import {RouterModule} from '@angular/router';
import {AngularFireAuthModule} from '@angular/fire/auth';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    AuthRoutingModule,
    NbLayoutModule,
    NbActionsModule,
    NbAuthModule,
    NbIconModule,
    NbSpinnerModule,
  ],

})
export class AuthModule { }
