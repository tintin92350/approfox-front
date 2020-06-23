import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
import {forwardRef, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import * as StudentDashboard from './users/student/dashboard/dashboard.component';
import * as AdminDashboard from './users/admin/dashboard/dashboard.component';
import * as ATCDashboard from './users/apprentice-training-center/dashboard/dashboard.component';
import * as ResponsibleDashboard from './users/responsible/dashboard/dashboard.component';

import { LoginPageComponent } from './common/login-page/login-page.component';
import { LogoComponent } from './common/logo/logo.component';
import {FormBuilder, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import { TextboxComponent } from './ui/textbox/textbox.component';
import { ButtonComponent } from './ui/button/button.component';
import { ErrorBoxComponent } from './ui/message-box/error-box/error-box.component';
import { InfoBoxComponent } from './ui/message-box/info-box/info-box.component';
import { SuccessBoxComponent } from './ui/message-box/success-box/success-box.component';
import { WarningBoxComponent } from './ui/message-box/warning-box/warning-box.component';
import { FileUploadComponent } from './ui/file-upload/file-upload.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { TagBadgeComponent } from './ui/tag-badge/tag-badge.component';
import { TagPageComponent } from './common/tag-page/tag-page.component';
import { MyTagsComponent } from './users/student/my-tags/my-tags.component';
import { DragDropDirective } from './directives/drag-drop.directive';
import { DashboardComponent } from './users/responsible/dashboard/dashboard.component';
import { MyAccountComponent } from './common/my-account/my-account.component';
import { DataCardComponent } from './ui/data-card/data-card.component';

import * as StudentCv from './users/student/my-cv/my-cv.component';
import {ClickOutsideModule} from 'ng-click-outside';
import { PageMemberBaseComponent } from './common/page-member-base/page-member-base.component';
import { NavigationComponent } from './common/navigation/navigation.component';
import {MyStudentComponent} from './users/responsible/my-students/my-student.component';
import { OffersComponent } from './users/responsible/offers/offers.component';
import {ToastService} from './services/toast.service';
import { ToastComponent } from './ui/toast/toast.component';
import { BannerComponent } from './ui/banner/banner.component';
import {BannerService} from './services/banner.service';
import {AnnouncementApiService} from './services/announcement-api.service';
import { ServerConfigurationComponent } from './users/admin/server-configuration/server-configuration.component';
import { StudentViewComponent } from './users/responsible/student-view/student-view.component';
import {JwtInterceptorService} from './guards/jwt-interceptor.service';
import { TagsViewComponent } from './users/admin/tags-view/tags-view.component';
import { ResponsiblesViewComponent } from './users/admin/responsibles-view/responsibles-view.component';
import { StudentsViewComponent } from './users/admin/students-view/students-view.component';

import * as Hammer from 'hammerjs';
import 'hammer-timejs';
import {RouterCacheService} from './services/router-cache.service';
import { ApprenticesShipManagersViewComponent } from './users/admin/apprentices-ship-managers-view/apprentices-ship-managers-view.component';
import { UserProfileComponent } from './common/user-profile/user-profile.component';
import {NgxCsvParserModule} from 'ngx-csv-parser';
import { DepartmentViewComponent } from './users/admin/department-view/department-view.component';
import { OfferViewComponent } from './common/offer-view/offer-view.component';
import { PlanningComponent } from './users/apprentice-training-center/planning/planning.component';
import { TimetableComponent } from './ui/timetable/timetable.component';
import { TimetableAppointmentComponent } from './ui/timetable-appointment/timetable-appointment.component';

export class HammerConfig extends HammerGestureConfig  {
  buildHammer(element: HTMLElement) {
    return new Hammer.Manager(element, {
      touchAction: 'auto',
      inputClass: Hammer.TouchInput,
      recognizers: [
        [Hammer.Swipe, {
          direction: Hammer.DIRECTION_HORIZONTAL
        }]
      ]
    });
  }
}

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
    MyStudentComponent,
    MyTagsComponent,
    DragDropDirective,
    DashboardComponent,
    MyAccountComponent,
    DataCardComponent,
    PageMemberBaseComponent,
    NavigationComponent,
    OffersComponent,
    ToastComponent,
    BannerComponent,
    ServerConfigurationComponent,
    StudentViewComponent,
    TagsViewComponent,
    ResponsiblesViewComponent,
    StudentsViewComponent,
    ApprenticesShipManagersViewComponent,
    UserProfileComponent,
    DepartmentViewComponent,
    OfferViewComponent,
    PlanningComponent,
    TimetableComponent,
    TimetableAppointmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ClickOutsideModule,
    ReactiveFormsModule,
    NgxCsvParserModule
  ],
  providers: [
    ToastService,
    BannerService,
    AnnouncementApiService,
    FormBuilder,
    RouterCacheService,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TextboxComponent),
    },
    [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true }
    ],
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
