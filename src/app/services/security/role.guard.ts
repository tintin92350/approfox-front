import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // check if route is restricted by role
      if (next.data.roles && next.data.roles.indexOf(this.auth.getRole()) === -1) {
        const roleDashboard = '/app/' + this.auth.getRole() + '/dashboard';
        console.log('redirecting to role dashboard : ' + roleDashboard);

        // role not authorised so redirect to home page
        this.router.navigate(['/app/' + this.auth.getRole() + '/dashboard']);
        return false;
      }

      // authorised so return true
      return true;
  }

}

