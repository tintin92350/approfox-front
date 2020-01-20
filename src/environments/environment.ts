import { KeycloakConfig } from 'keycloak-angular';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
  url: 'http://90.79.79.31:8082/auth',
  realm: 'approfox-dev',
  clientId: 'approfox-dev-login',
};

/*
{
  "realm": "approfox-dev",
  "auth-server-url": "http://90.79.79.31:8082/auth/",
  "ssl-required": "none",
  "resource": "approfox-dev-login",
  "public-client": true,
  "confidential-port": 0
}
*/



export const environment = {
  production: false,
  keycloakConfig,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
