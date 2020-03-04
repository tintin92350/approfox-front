import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectAuthGuard implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
    }

    console.log(next.data);
    if (next.data.common) {
      return true;
    }

    // check if route is restricted by role
    if ((next.data.role && next.data.role !== this.auth.getRole()) || next.routeConfig.path === '') {
      const roleDashboard = '/' + this.auth.getRole() + '/dashboard';
      console.log('redirecting to role dashboard : ' + roleDashboard);

      // role not authorised so redirect to home page
      this.router.navigate([roleDashboard]);
      return false;
    }


    // authorised so return true
    return true;
  }
}
