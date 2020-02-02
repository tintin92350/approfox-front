import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyCvComponent } from './my-cv/my-cv.component';
import { CvComponent } from './Resources/cv/cv.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardPageComponent, children: [
    { path: 'my-cv', component: MyCvComponent},
    { path: 'dashboard', component: DashboardComponent },
    { path: 'cv/:id', component: CvComponent }
  ] },
  { path: 'login', component: LoginPageComponent },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
