import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {
    this.router = router;
  }

  public isAuthenticated(): boolean {
    const authValue = localStorage.getItem('auth');
    return authValue === 'true';
  }

  public auth(username: string, password: string) {
    if (username === 'etude' && password === 'etude') {
      localStorage.setItem('auth', 'true');
      localStorage.setItem('role', 'student');
      this.router.navigate(['/dashboard']);
    } else if (username === 'toto' && password === 'toto') {
      localStorage.setItem('auth', 'true');
      localStorage.setItem('role', 'responsible');
      this.router.navigate(['/dashboard']);
    } else {
      localStorage.setItem('auth', 'false');
    }
  }

  public uploadCv() {
    localStorage.setItem('cv', 'true');
  }

  public removeCv() {
    localStorage.setItem('cv', 'false');
  }

  public isCvUploaded(): boolean {
    return localStorage.getItem('cv') === 'true';
  }

  public logout() {
    localStorage.setItem('auth', 'false');
  }

  public getRole(): string {
    return localStorage.getItem('role');
  }
}
