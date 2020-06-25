import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {User} from '../models/User.model';
import {Auth} from '../models/auth';
import {catchError, map, timeout} from 'rxjs/operators';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private connectionDate: Date;

  private currentAuthInfoSubject: BehaviorSubject<Auth>;
  public currentAuthInfo: Observable<Auth>;

  constructor(private http: HttpClient,
              private userService: UserService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

    this.currentAuthInfoSubject = new BehaviorSubject<Auth>(JSON.parse(localStorage.getItem('currentAuthInfo')));
    this.currentAuthInfo = this.currentAuthInfoSubject.asObservable();

    this.connectionDate = new Date();

    if (localStorage.getItem('connectionDate')) {
      try {
        const dateParsed = JSON.parse(localStorage.getItem('connectionDate'));
        this.connectionDate = new Date(dateParsed);
      } catch (ignored) {
      }
    }
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get currentAuthInfoValue(): Auth {
    return this.currentAuthInfoSubject.value;
  }

  public isLogged(): boolean {
    return this.currentAuthInfoValue !== null && this.currentUserValue !== null;
  }

  public getRole(): string {
    return this.roleApiToRoleFront(this.currentAuthInfoValue.roles[0]);
  }

  public getConnectionDate(): Date {
    return this.connectionDate;
  }

  login(username: string, password: string) {
    if (username === undefined || username === null) {
      username = '';
    }

    if (password === undefined || password === null) {
      password = '';
    }

    return this.http.post<any>(environment.api + 'signin', { username, password })
      .pipe(map(auth => {
        // Object
        // login successful if there's a jwt token in the response
        if (auth && auth.accessToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentAuthInfo', JSON.stringify(auth));
          this.currentAuthInfoSubject.next(auth);

          // store real user information (all)
          this.currentUserSubject.next(auth);
          this.userService.getMe().subscribe(user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
          });

          this.connectionDate = new Date();
          localStorage.setItem('connectionDate', JSON.stringify(this.connectionDate));
        } else {
        }
        return auth;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentAuthInfo');
    this.currentUserSubject.next(null);
    this.currentAuthInfoSubject.next(null);
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
}
