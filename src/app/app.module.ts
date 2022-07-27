import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FroalaComponent } from './froala/froala.component';
import 'froala-editor/js/plugins.pkgd.min.js';


import { NavbarComponent } from './navbar/navbar.component';
import { PageBuilderComponent } from './page-builder/page-builder.component';
import { PagesComponent } from './pages/pages.component';

import { PagesDetailsComponent } from './Pages/pages-details/pages-details.component';
import {OnboardingModule} from "./onboarding/onboarding.module";



@NgModule({
  declarations: [
    AppComponent,
    FroalaComponent,
    NavbarComponent,
    PageBuilderComponent,
    PagesComponent,
    PagesDetailsComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    OnboardingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
