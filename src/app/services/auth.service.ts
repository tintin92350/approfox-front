import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private httpClient: HttpClient) {
    this.router = router;
  }

  public isAuthenticated(): boolean {
    const authValue = localStorage.getItem('auth');
    return authValue !== null;
  }

  public auth(username: string, password: string) {
    return this.httpClient.post(environment.api + 'signin', { username, password });
  }

  public logout() {
    localStorage.removeItem('auth');
    this.router.navigate(['/login']);
  }

  public roleApiToRoleFront(roleApi: string) {
    if (roleApi === 'APPRENTICESHIP_MANAGER') {
      return 'cfa';
    } else if (roleApi === 'ADMINISTRATOR') {
      return 'admin';
    } else if (roleApi === 'DEPARTMENT_MANAGER') {
      return 'responsable';
    } else if (roleApi === 'STUDENT') {
      return 'etudiant';
    }

    return null;
  }

  public getAuth(): string {
    return localStorage.getItem('auth');
  }
}
