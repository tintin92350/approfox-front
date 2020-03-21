import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from './common/login-page/login-page.component';
import {TagPageComponent} from './common/tag-page/tag-page.component';
import {MyTagsComponent} from './student/my-tags/my-tags.component';

import * as StudentPage from './student/page/page.component';
import * as AdminPage from './admin/page/page.component';
import * as ATCPage from './apprentice-training-center/page/page.component';
import * as ResponsiblePage from './responsible/page/page.component';
import * as StudentDashboard from './student/dashboard/dashboard.component';
import * as AdminDashboard from './admin/dashboard/dashboard.component';
import * as ATCDashboard from './apprentice-training-center/dashboard/dashboard.component';
import * as ResponsibleDashboard from './responsible/dashboard/dashboard.component';

import * as StudentCv from './student/my-cv/my-cv.component';
import * as ResponsibleCv from './responsible/my-cv/my-cv.component';

import {MyAccountComponent} from './common/my-account/my-account.component';
import {AuthGuard} from './guards/auth.guard';
import {RedirectAuthGuard} from './guards/redirect-auth.guard';
import {LoginRedirectAuthGuard} from './guards/login-redirect.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    canActivate: [AuthGuard, RedirectAuthGuard]
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [LoginRedirectAuthGuard]
  },
  {
    path: 'etudiant',
    component: StudentPage.PageComponent,
    canActivate: [AuthGuard, RedirectAuthGuard],
    data: { role: 'etudiant' },
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
        component: StudentCv.MyCvComponent,
      },
      {
        path: 'mon-compte',
        component: MyAccountComponent,
        data: { common: true }
      }
    ]
  },
  {
    path: 'admin',
    component: AdminPage.PageComponent,
    canActivate: [AuthGuard, RedirectAuthGuard],
    data: { role: 'admin' },
    children: [
      {
        path: 'dashboard',
        component: AdminDashboard.DashboardComponent,
      },
      {
        path: 'mon-compte',
        component: MyAccountComponent,
        data: { common: true }
      }
    ]
  },
  {
    path: 'cfa',
    component: ATCPage.PageComponent,
    canActivate: [AuthGuard, RedirectAuthGuard],
    data: { role: 'cfa' },
    children: [
      {
        path: 'dashboard',
        component: ATCDashboard.DashboardComponent
      },
      {
        path: 'mon-compte',
        component: MyAccountComponent,
        data: { common: true }
      }
    ]
  },
  {
    path: 'responsable',
    component: ResponsiblePage.PageComponent,
    canActivate: [RedirectAuthGuard],
    data: { role: 'responsable' },
    children: [
      {
        path: 'dashboard',
        component: ResponsibleDashboard.DashboardComponent
      },
      {
        path: 'mon-compte',
        component: MyAccountComponent,
        data: { common: true }
      },
      {
        path: 'mes-cv',
        component: ResponsibleCv.MyCvComponent
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
