import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { KeycloakService } from './keycloak/keycloak.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': 'http://localhost:8081' })
};

@Injectable({
  providedIn: 'root'
})
export class ExempleService {

  private userUrl = '//90.79.79.31:8081/';

  constructor(private http: HttpClient, private keycloak: KeycloakService) {
  }

  public getString() {
    return this.http.get<Message>(this.userUrl + 'exemple', httpOptions);
  }

  public getRoles() {
    return this.keycloak.getUserRoles();
  }
}
