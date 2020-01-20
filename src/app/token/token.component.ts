import { Component, OnInit } from '@angular/core';
import { TokenService } from '../Services/token.service';
import { KeycloakService } from '../Services/keycloak/keycloak.service';
import { KeycloakInstance } from 'keycloak-js';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {

  msg: Message;
  token: string;
  roles: any;

  public keycloakAuth: KeycloakInstance;

  constructor(private tokenService: TokenService, private keycloak: KeycloakService) {
    this.tokenService = tokenService;
    this.keycloak = keycloak;

    this.tokenService.getToken().subscribe(t => { this.msg = t; });
    /*this.keycloak.getToken().then(t => {
        //console.log(t);
    });*/
    console.log("Use roles :");
    console.log(keycloak.getUserRoles());
    
    
    /*this.keycloak.getUserRoles().then(response => {
      this.roles = response;
      console.log("ROLES USER:");
      console.log(response);
      
      
    });*/
   }

  ngOnInit() {
    this.keycloakAuth = this.keycloak.getKeycloakAuth();
  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }

  public islogged() {
    return this.keycloak.isLoggedIn();
  }

}
