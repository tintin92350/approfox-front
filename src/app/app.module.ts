import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AppPageComponent } from './app-page/app-page.component';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { StudentModule } from './student/student.module';
import { SharedModule } from './app-shared.module';
import { FormsModule } from '@angular/forms';
import { LogoutPageComponent } from './logout-page/logout-page.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { TagComponent } from './Resources/tag/tag.component';
import { StudentMainNavigationComponent } from './student/student-main-navigation/student-main-navigation.component';
import { StudentPageComponent } from './student/student-page/student-page.component';
import { RoleRedirectingComponent } from './role-redirecting/role-redirecting.component';
import { ResponsiblePageComponent } from './responsible/responsible-page/responsible-page.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { ResponsibleDashboardComponent } from './responsible/responsible-dashboard/responsible-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AppPageComponent,
    StudentDashboardComponent,
    LogoutPageComponent,
    MyAccountComponent,
    TagComponent,
    StudentMainNavigationComponent,
    StudentPageComponent,
    RoleRedirectingComponent,
    ResponsiblePageComponent,
    ResponsibleDashboardComponent
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
