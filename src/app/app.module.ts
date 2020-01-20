import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpXhrBackend, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenComponent } from './token/token.component';
import { LoginComponent } from './login/login.component';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { initializer } from './app.init';
import { AppAuthGuard } from './app.authguard';
import { KeycloakInterceptorService } from './Services/keycloak/keycloak.interceptor.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutRouteComponent } from './logout-route/logout-route.component';
import { HashLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    TokenComponent,
    LoginComponent,
    DashboardComponent,
    LogoutRouteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    KeycloakAngularModule
  ],
  providers: [
    /*{
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    },
  AppAuthGuard,
  KeycloakService*/
  {
    provide: HTTP_INTERCEPTORS,
    useClass: KeycloakInterceptorService,
    multi: true
  },
  KeycloakService,
  AppAuthGuard
],
  bootstrap: [AppComponent]
})
export class AppModule { }
