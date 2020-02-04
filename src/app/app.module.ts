import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AppPageComponent } from './app-page/app-page.component';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { StudentModule } from './student/student.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from './app-shared.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';
import { LogoutPageComponent } from './logout-page/logout-page.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { TagComponent } from './Resources/tag/tag.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AppPageComponent,
    DashboardComponent,
    LogoutPageComponent,
    MyAccountComponent,
    TagComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StudentModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy}

  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
