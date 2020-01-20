import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { KeycloakService } from './Services/keycloak/keycloak.service';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AppAuthGuard implements CanActivate {

  authenticated: boolean;
  roles: any;

  constructor(private router: Router, private keycloak: KeycloakService) {
    console.log('INIT AuthGuard: ' + keycloak.isLoggedIn());
  }

  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (!this.keycloak.isLoggedIn()) {
        this.keycloak.login();
        return;
      }
      console.log('role restriction given at app-routing.module for this route', route.data.roles);
      console.log('User roles coming after login from keycloak :', this.roles);
      const requiredRoles = route.data.roles;
      let granted = false;
      if (!requiredRoles || requiredRoles.length === 0) {
        granted = true;
      } else {
        for (const requiredRole of requiredRoles) {
          if (this.keycloak.getKeycloakAuth().roles.indexOf(requiredRole) > -1) {
            granted = true;
            break;
          }
        }
      }

      if(granted === false) {
        this.router.navigate(['/']);
      }
      resolve(granted);

    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (!this.keycloak.isLoggedIn()) {
        return this.keycloak.login();
      }

      const token = await this.keycloak.getToken();
      
      const tokenDecoded = jwt_decode(token);
      const roles = tokenDecoded.realm_access.roles;

      console.log('role restriction given at app-routing.module for this route', route.data.roles);
      console.log('User roles coming after login from keycloak :', roles);
      const requiredRoles = route.data.roles;
      let granted = false;
      if (!requiredRoles || requiredRoles.length === 0) {
        granted = true;
      } else {
        for (const requiredRole of requiredRoles) {
          if (roles.indexOf(requiredRole) > -1) {
            granted = true;
            break;
          }
        }
      }

      if (granted === false) {
        this.router.navigate(['/']);
      }
      resolve(granted);

    });
    /*
    return new Promise(async (resolve, reject) => {
      try {
        console.log('Try to guarde');

        this.authenticated = await this.keycloak.isLoggedIn();
        this.roles = this.keycloak.getUserRoles();

        const result = await this.isAccessAllowed(route, state);
        resolve(result);
      } catch (error) {
        reject('An error happened during access validation. Details:' + error);
      }
    });
    /*console.log('check guard: ' + this.keycloak.isLoggedIn())
    const loggedIn = this.keycloak.isLoggedIn();

    if (loggedIn) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;*/
  }

}
