import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from './common/login-page/login-page.component';
import {AuthGuard} from './guards/auth.guard';
import {RedirectAuthGuard} from './guards/redirect-auth.guard';
import {TagPageComponent} from './common/tag-page/tag-page.component';
import {MyCvComponent} from './student/my-cv/my-cv.component';
import {MyTagsComponent} from './student/my-tags/my-tags.component';

import * as StudentPage from './student/page/page.component';
import * as AdminPage from './admin/page/page.component';
import * as ATCPage from './apprentice-training-center/page/page.component';
import * as ResponsiblePage from './responsible/page/page.component';
import * as StudentDashboard from './student/dashboard/dashboard.component';
import * as AdminDashboard from './admin/dashboard/dashboard.component';
import * as ATCDashboard from './apprentice-training-center/dashboard/dashboard.component';
import * as ResponsibleDashboard from './responsible/dashboard/dashboard.component';
import {MyAccountComponent} from './common/my-account/my-account.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    canActivate: [RedirectAuthGuard]
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'etudiant',
    component: StudentPage.PageComponent,
    //canActivate: [AuthGuard],
    data: { role: 'student' },
    children: [
      {
        path: 'dashboard',
        component: StudentDashboard.DashboardComponent,
      },
      {
        path: 'tag/:id',
        component: TagPageComponent,
      },
      {
        path: 'mes-tags',
        component: MyTagsComponent,
      },
      {
        path: 'mon-cv',
        component: MyCvComponent,
      },
      {
        path: 'mon-compte',
        component: MyAccountComponent,
      }
    ]
  },
  {
    path: 'admin',
    component: AdminPage.PageComponent,
    //canActivate: [AuthGuard],
    data: { role: 'admin' },
    children: [
      {
        path: 'dashboard',
        component: AdminDashboard.DashboardComponent,
      },
      {
        path: 'mon-compte',
        component: MyAccountComponent,
      }
    ]
  },
  {
    path: 'cfa',
    component: ATCPage.PageComponent,
    //canActivate: [AuthGuard],
    data: { role: 'admin' },
    children: [
      {
        path: 'dashboard',
        component: ATCDashboard.DashboardComponent,
      },
      {
        path: 'mon-compte',
        component: MyAccountComponent,
      }
    ]
  },
  {
    path: 'responsable',
    component: ResponsiblePage.PageComponent,
    //canActivate: [AuthGuard],
    data: { role: 'admin' },
    children: [
      {
        path: 'dashboard',
        component: ResponsibleDashboard.DashboardComponent,
      },
      {
        path: 'mon-compte',
        component: MyAccountComponent,
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
