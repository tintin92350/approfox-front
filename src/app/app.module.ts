import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import * as StudentDashboard from './student/dashboard/dashboard.component';
import * as AdminDashboard from './admin/dashboard/dashboard.component';
import * as ATCDashboard from './apprentice-training-center/dashboard/dashboard.component';
import * as ResponsibleDashboard from './responsible/dashboard/dashboard.component';
import * as StudentPage from './student/page/page.component';
import * as AdminPage from './admin/page/page.component';
import * as ATCPage from './apprentice-training-center/page/page.component';
import * as ResponsiblePage from './responsible/page/page.component';

import { LoginPageComponent } from './common/login-page/login-page.component';
import { PageComponent } from './student/page/page.component';
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
import { MyCvComponent } from './student/my-cv/my-cv.component';
import { MyTagsComponent } from './student/my-tags/my-tags.component';
import { DragDropDirective } from './directives/drag-drop.directive';
import { DashboardComponent } from './responsible/dashboard/dashboard.component';
import { MyAccountComponent } from './common/my-account/my-account.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentDashboard.DashboardComponent,
    AdminDashboard.DashboardComponent,
    ATCDashboard.DashboardComponent,
    ResponsibleDashboard.DashboardComponent,
    StudentPage.PageComponent,
    AdminPage.PageComponent,
    ATCPage.PageComponent,
    ResponsiblePage.PageComponent,
    LoginPageComponent,
    PageComponent,
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
    MyCvComponent,
    MyTagsComponent,
    DragDropDirective,
    DashboardComponent,
    MyAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
