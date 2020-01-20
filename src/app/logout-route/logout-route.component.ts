import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../Services/keycloak/keycloak.service';

@Component({
  selector: 'app-logout-route',
  templateUrl: './logout-route.component.html',
  styleUrls: ['./logout-route.component.css']
})
export class LogoutRouteComponent implements OnInit {

  constructor(private keycloack: KeycloakService) { }

  ngOnInit() {
    this.keycloack.logout();
  }

}
