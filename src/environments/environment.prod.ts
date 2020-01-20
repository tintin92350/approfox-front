import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
  url: 'http://90.79.79.31:8082/auth',
  realm: 'approfox-dev',
  clientId: 'approfox-dev-login',
};


export const environment = {
  production: true,
  keycloakConfig,
};
