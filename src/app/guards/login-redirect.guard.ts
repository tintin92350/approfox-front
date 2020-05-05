import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginRedirectAuthGuard implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.auth.isAuthenticated()) {
      const auth = JSON.parse(this.auth.getAuth());
      const role = this.auth.roleApiToRoleFront(auth.roles[0]);
      const roleDashboard = '/' + role + '/dashboard';
      this.router.navigate([roleDashboard]);
      return false;
    }
    // authorised so return true
    return true;
  }
}
