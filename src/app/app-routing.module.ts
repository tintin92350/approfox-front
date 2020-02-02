import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyCvComponent } from './my-cv/my-cv.component';
import { CvComponent } from './Resources/cv/cv.component';
import { AuthGuardService } from './services/security/auth-guard.service';
import { LogoutPageComponent } from './logout-page/logout-page.component';
import { MyTagsComponent } from './my-tags/my-tags.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuardService] , children: [
    { path: 'my-cv', component: MyCvComponent},
    { path: 'my-tags', component: MyTagsComponent},
    { path: 'dashboard', component: DashboardComponent },
    { path: 'cv/:id', component: CvComponent }
  ] },
  { path: 'login', component: LoginPageComponent },
  { path: 'logout', component: LogoutPageComponent },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
