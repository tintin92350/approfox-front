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
      localStorage.setItem('role', 'etudiant');
      this.router.navigate(['/']);
    } else if (username === 'responsable' && password === 'responsable') {
      localStorage.setItem('auth', 'true');
      localStorage.setItem('role', 'responsable');
      this.router.navigate(['/']);
    } else if (username === 'admin' && password === 'admin') {
      localStorage.setItem('auth', 'true');
      localStorage.setItem('role', 'admin');
      this.router.navigate(['/']);
    } else if (username === 'cfa' && password === 'cfa') {
      localStorage.setItem('auth', 'true');
      localStorage.setItem('role', 'cfa');
      this.router.navigate(['/']);
    } else {
      localStorage.setItem('auth', 'false');
    }
  }

  public logout() {
    localStorage.setItem('auth', 'false');
    this.router.navigate(['/login']);
  }

  public getRole(): string {
    return localStorage.getItem('role');
  }
}
