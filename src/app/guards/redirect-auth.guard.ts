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
      return false;
    }

    if (next.data.common) {
      return true;
    }

    const auth = JSON.parse(this.auth.getAuth());

    const role = this.auth.roleApiToRoleFront(auth.roles[0]);

    // check if route is restricted by role
    if ((next.data.role && role && next.data.role !== role) || next.routeConfig.path === '') {
      const roleDashboard = '/' + role + '/dashboard';

      // role not authorised so redirect to home page
      this.router.navigate([roleDashboard]);
      return false;
    }


    // authorised so return true
    return true;
  }
}
