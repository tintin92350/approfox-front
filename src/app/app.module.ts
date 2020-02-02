import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { TagComponent } from './tag/tag.component';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { StudentModule } from './student/student.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from './app-shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardPageComponent,
    TagComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StudentModule,
    SharedModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy}

  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
