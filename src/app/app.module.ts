/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {DateFnsModule} from "ngx-date-fns";
import {NgxImageCompressService} from "ngx-image-compress";
import { LazyLoadImageModule } from 'ng-lazyload-image';
import {NgxTinymceModule} from "ngx-tinymce";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    ThemeModule.forRoot(),

    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    DateFnsModule.forRoot(),
    NbDialogModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    CoreModule.forRoot(),
    LazyLoadImageModule,
    NgxTinymceModule.forRoot({
      baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/4.9.0/'
    })
  ],
  bootstrap: [AppComponent],
  providers: [NgxImageCompressService],
})
export class AppModule {
}
