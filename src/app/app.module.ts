import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import * as StudentDashboard from './users/student/dashboard/dashboard.component';
import * as AdminDashboard from './users/admin/dashboard/dashboard.component';
import * as ATCDashboard from './users/apprentice-training-center/dashboard/dashboard.component';
import * as ResponsibleDashboard from './users/responsible/dashboard/dashboard.component';

import { LoginPageComponent } from './common/login-page/login-page.component';
import { LogoComponent } from './common/logo/logo.component';
import {FormsModule} from '@angular/forms';
import { TextboxComponent } from './ui/textbox/textbox.component';
import { ButtonComponent } from './ui/button/button.component';
import { ErrorBoxComponent } from './ui/message-box/error-box/error-box.component';
import { InfoBoxComponent } from './ui/message-box/info-box/info-box.component';
import { SuccessBoxComponent } from './ui/message-box/success-box/success-box.component';
import { WarningBoxComponent } from './ui/message-box/warning-box/warning-box.component';
import { FileUploadComponent } from './ui/file-upload/file-upload.component';
import {HttpClientModule} from '@angular/common/http';
import { TagBadgeComponent } from './common/components/tag-badge/tag-badge.component';
import { TagPageComponent } from './common/tag-page/tag-page.component';
import { MyTagsComponent } from './users/student/my-tags/my-tags.component';
import { DragDropDirective } from './directives/drag-drop.directive';
import { DashboardComponent } from './users/responsible/dashboard/dashboard.component';
import { MyAccountComponent } from './common/my-account/my-account.component';
import { DataCardComponent } from './common/components/data-card/data-card.component';

import * as StudentCv from './users/student/my-cv/my-cv.component';
import * as ResponsibleCv from './users/responsible/my-cv/my-cv.component';
import {ClickOutsideModule} from 'ng-click-outside';
import { PageMemberBaseComponent } from './common/page-member-base/page-member-base.component';
import { NavigationComponent } from './common/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentDashboard.DashboardComponent,
    AdminDashboard.DashboardComponent,
    ATCDashboard.DashboardComponent,
    ResponsibleDashboard.DashboardComponent,
    LoginPageComponent,
    LogoComponent,
    TextboxComponent,
    ButtonComponent,
    ErrorBoxComponent,
    InfoBoxComponent,
    SuccessBoxComponent,
    WarningBoxComponent,
    FileUploadComponent,
    TagBadgeComponent,
    TagPageComponent,
    StudentCv.MyCvComponent,
    ResponsibleCv.MyCvComponent,
    MyTagsComponent,
    DragDropDirective,
    DashboardComponent,
    MyAccountComponent,
    DataCardComponent,
    PageMemberBaseComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ClickOutsideModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
