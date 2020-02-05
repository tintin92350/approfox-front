import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AppPageComponent } from './app-page/app-page.component';
import { StudentMyCvComponent } from './student/student-my-cv/student-my-cv.component';
import { CvComponent } from './Resources/cv/cv.component';
import { AuthGuardService } from './services/security/auth-guard.service';
import { LogoutPageComponent } from './logout-page/logout-page.component';
import { StudentMyTagsComponent } from './student/student-my-tags/student-my-tags.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { TagComponent } from './Resources/tag/tag.component';
import { StudentMainNavigationComponent } from './student/student-main-navigation/student-main-navigation.component';
import { StudentModule } from './student/student.module';
import { StudentPageComponent } from './student/student-page/student-page.component';
import { RoleGuard } from './services/security/role.guard';
import { RoleRedirectingComponent } from './role-redirecting/role-redirecting.component';
import { ResponsiblePageComponent } from './responsible/responsible-page/responsible-page.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { ResponsibleDashboardComponent } from './responsible/responsible-dashboard/responsible-dashboard.component';


const routes: Routes = [
  { path: '', redirectTo: '/app', pathMatch: 'full'},
  { path: 'app', component: RoleRedirectingComponent, canActivate: [AuthGuardService] },
  { path: 'student', component: StudentPageComponent, canActivate: [RoleGuard, AuthGuardService], data: { roles: 'student'}, children: [
    { path: 'my-cv', component: StudentMyCvComponent},
    { path: 'my-tags', component: StudentMyTagsComponent},
    { path: 'dashboard', component: StudentDashboardComponent},
    { path: 'cv/:id', component: CvComponent },
    { path: 'tag/:id', component: TagComponent },
    { path: 'account', component: MyAccountComponent },
  ] },
  /*{ path: 'responsible', component: ResponsiblePageComponent, canActivate: [RoleGuard], data: { roles: 'responsible'}, children: [
    { path: 'dashboard', component: ResponsibleDashboardComponent},
    { path: 'account', component: MyAccountComponent },
    { path: 'cv/:id', component: CvComponent },
    { path: 'tag/:id', component: TagComponent },
  ] },*/
  { path: 'responsible', component: ResponsiblePageComponent, canActivate: [RoleGuard, AuthGuardService], data: { roles: 'responsible'}, children: [
    { path: 'dashboard', component: ResponsibleDashboardComponent},
    { path: 'tag/:id', component: TagComponent },
    { path: 'account', component: MyAccountComponent },
  ] },
  { path: 'login', component: LoginPageComponent },
  { path: 'logout', component: LogoutPageComponent },
  { path: '**', redirectTo: '/app' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
