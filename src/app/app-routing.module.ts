import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TokenComponent } from './token/token.component';
import { LoginComponent } from './login/login.component';
import { AppAuthGuard } from './app.authguard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutRouteComponent } from './logout-route/logout-route.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AppAuthGuard] },
  { path: 'token', component: TokenComponent, canActivate: [AppAuthGuard], data: { roles : ['admin'] } },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutRouteComponent, canActivate: [AppAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
