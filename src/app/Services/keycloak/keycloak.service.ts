import { Injectable } from '@angular/core';
import * as Keycloak from 'keycloak-js';
import { environment } from '../../../environments/environment';
import * as jwt_decode from 'jwt-decode';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  static auth: any = {};
  static roles: any;

  constructor() { }

  static init(): Promise<any> {
    /**
     * init KeycloakService with client-id
     * @type {Keycloak.KeycloakInstance}
     */
    const keycloakAuth: Keycloak.KeycloakInstance = Keycloak({
      url: environment.keycloakConfig.url,
      realm: environment.keycloakConfig.realm,
      clientId: environment.keycloakConfig.clientId
    });

    KeycloakService.auth.loggedIn = false;
    return new Promise((resolve, reject) => {
      keycloakAuth.init({ onLoad: 'check-sso', checkLoginIframe: false })
        .success(() => {
          KeycloakService.auth.loggedIn = false;
          KeycloakService.auth.authz = keycloakAuth;
          console.log(KeycloakService.auth.authz.tokenParsed);
          resolve();
        })
        .error(() => {
          reject();
        });
    });
  }

  getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (KeycloakService.auth.authz.token) {
        KeycloakService.auth.authz
          .updateToken(5)
          .success(() => {
            resolve(KeycloakService.auth.authz.token as string);
          })
          .error(() => {
            reject('Failed to refresh token');
          });
      } else {
        reject('Not logged in');
      }
    });
  }

  /*getUserRoles(): Promise<any> {
    console.log('get user roles');
    return new Promise<string[]>((resolve, reject) => {
      if (KeycloakService.auth.authz.token) {
        KeycloakService.auth.authz
          .updateToken(5)
          .success(() => {
            console.log('User roles retrieved');

            resolve(KeycloakService.auth.authz.tokenParsed);
          })
          .error(() => {
            reject('Failed to refresh token');
          });
      } else {
        reject('Not logged in');
      }
    });
    
  }*/

  getUserRoles(): any {
    this.getToken().then(response => {
      const token = jwt_decode(response);
      return token.realm_access.roles;
    });
  }

  getFullName(): string {
    return KeycloakService.auth.authz.tokenParsed.name;
  }

  login(): void {
    KeycloakService.auth.authz.login().success(
      () => {
        KeycloakService.auth.loggedIn = true;
        this.getToken().then(response => {
          const token = jwt_decode(response);
          KeycloakService.roles = token.realm_access.roles;
          console.log("Role out :");
          
          console.log(KeycloakService.roles);
        });
      }
    );
  }

  isLoggedIn(): boolean {
    return KeycloakService.auth.authz.authenticated;
  }


  logout(): void {
    KeycloakService.auth.authz.logout({redirectUri : document.baseURI}).success(() => {
      KeycloakService.auth.loggedIn = false;
      KeycloakService.auth.authz = null;
    });
  }

  getKeycloakAuth() {
    return KeycloakService.auth.authz;
  }
}
