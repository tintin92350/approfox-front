import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './common/login-page/login-page.component';
import {TagPageComponent} from './common/tag-page/tag-page.component';
import {MyTagsComponent} from './users/student/my-tags/my-tags.component';
import * as StudentDashboard from './users/student/dashboard/dashboard.component';
import * as AdminDashboard from './users/admin/dashboard/dashboard.component';
import * as ATCDashboard from './users/apprentice-training-center/dashboard/dashboard.component';
import * as ResponsibleDashboard from './users/responsible/dashboard/dashboard.component';

import * as StudentCv from './users/student/my-cv/my-cv.component';

import {MyAccountComponent} from './common/my-account/my-account.component';
import {AuthGuard} from './guards/auth.guard';
import {RedirectAuthGuard} from './guards/redirect-auth.guard';
import {LoginRedirectAuthGuard} from './guards/login-redirect.guard';
import {PageMemberBaseComponent} from './common/page-member-base/page-member-base.component';
import {MyStudentComponent} from './users/responsible/my-students/my-student.component';
import {OffersComponent} from './users/responsible/offers/offers.component';
import {ServerConfigurationComponent} from './users/admin/server-configuration/server-configuration.component';

import * as AdminResponsiblesViewComponent from './users/admin/responsibles-view/responsibles-view.component';
import * as AdminStudentsViewComponent from './users/admin/students-view/students-view.component';
import * as AdminTagsViewComponent from './users/admin/tags-view/tags-view.component';
import {ApprenticesShipManagersViewComponent} from './users/admin/apprentices-ship-managers-view/apprentices-ship-managers-view.component';
import {UserProfileComponent} from './common/user-profile/user-profile.component';
import {DepartmentViewComponent} from './users/admin/department-view/department-view.component';
import {OfferViewComponent} from './common/offer-view/offer-view.component';
import {PlanningComponent} from './users/apprentice-training-center/planning/planning.component';

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
    component: PageMemberBaseComponent,
    canActivate: [AuthGuard, RedirectAuthGuard],
    data: { role: 'etudiant' },
    children: [
      {
        path: 'dashboard',
        component: StudentDashboard.DashboardComponent,
        data: {
          name: 'Dashboard'
        }
      },
      {
        path: 'tag/:id',
        component: TagPageComponent,
        data: {
          name: 'Tag'
        }
      },
      {
        path: 'mes-tags',
        component: MyTagsComponent,
        data: {
          name: 'Mes tags'
        }
      },
      {
        path: 'mon-cv',
        component: StudentCv.MyCvComponent,
        data: {
          name: 'Mon cv'
        }
      },
      {
        path: 'mon-compte',
        component: MyAccountComponent,
        data: { common: true,
          name: 'Mon compte'},
      }
    ]
  },
  {
    path: 'admin',
    component: PageMemberBaseComponent,
    canActivate: [AuthGuard, RedirectAuthGuard],
    data: { role: 'admin' },
    children: [
      {
        path: 'dashboard',
        component: AdminDashboard.DashboardComponent,
        data: {
          name: 'Dashboard'
        }
      },
      {
        path: 'outils-serveur',
        component: ServerConfigurationComponent,
        data: {
          name: 'Outils serveur'
        }
      },
      {
        path: 'responsables',
        component: AdminResponsiblesViewComponent.ResponsiblesViewComponent,
        data: {
          name: 'Responsables'
        }
      },
      {
        path: 'etudiants',
        component: AdminStudentsViewComponent.StudentsViewComponent,
        data: {
          name: 'Étudiants'
        }
      },
      {
        path: 'pole-alternance',
        component: ApprenticesShipManagersViewComponent,
        data: {
          name: 'Pôle alternance'
        }
      },
      {
        path: 'utilisateurs/:id',
        component: UserProfileComponent,
        data: {
          name: 'Profil utilisateur'
        }
      },
      {
        path: 'tags',
        component: AdminTagsViewComponent.TagsViewComponent,
        data: {
          name: 'Tags'
        }
      },
      {
        path: 'tags/:id',
        component: TagPageComponent,
        data: {
          name: 'Tag'
        }
      },
      {
        path: 'departments',
        component: DepartmentViewComponent,
        data: {
          name: 'Département'
        }
      },
      {
        path: 'mon-compte',
        component: MyAccountComponent,
        data: { common: true, name: 'Mon compte'}
      }
    ]
  },
  {
    path: 'cfa',
    component: PageMemberBaseComponent,
    canActivate: [AuthGuard, RedirectAuthGuard],
    data: { role: 'cfa' },
    children: [
      {
        path: 'dashboard',
        component: ATCDashboard.DashboardComponent,
        data: {
          name: 'Dashboard'
        }
      },
      {
        path: 'mon-compte',
        component: MyAccountComponent,
        data: { common: true, name: 'Mon compte' }
      },
      {
        path: 'offres',
        component: OffersComponent,
        data: {
          name: 'Offres'
        }
      },
      {
        path: 'offres/:id',
        component: OfferViewComponent,
        data: {
          name: 'Offre'
        }
      },
      {
        path: 'planning',
        component: PlanningComponent,
        data: {
          name: 'Planning'
        }
      }
    ]
  },
  {
    path: 'responsable',
    component: PageMemberBaseComponent,
    canActivate: [RedirectAuthGuard],
    data: { role: 'responsable' },
    children: [
      {
        path: 'dashboard',
        component: ResponsibleDashboard.DashboardComponent,
        data: {
          name: 'Dashboard'
        }
      },
      {
        path: 'mon-compte',
        component: MyAccountComponent,
        data: { common: true, name: 'Mon compte' }
      },
      {
        path: 'etudiants',
        component: MyStudentComponent,
        data: {
          name: 'Étudiants'
        }
      },
      {
        path: 'utilisateurs/:id',
        component: UserProfileComponent,
        data: {
          name: 'Profil utilisateur'
        }
      },
      {
        path: 'offres',
        component: OffersComponent,
        data: {
          name: 'Offres'
        }
      },
      {
        path: 'offres/:id',
        component: OfferViewComponent,
        data: {
          name: 'Offre'
        }
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
