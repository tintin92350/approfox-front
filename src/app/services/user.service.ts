import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/User.model';
import {environment} from '../../environments/environment';
import {timeout} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(environment.api + 'user/' + id).pipe(timeout(1500));
  }

  public getAllStudentsByDepartment(department: number): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.api + 'user/all').pipe(timeout(1500));
  }

  public addUser(user: User): Observable<User> {
    return this.httpClient.post<any>(environment.api + 'user/', user).pipe(timeout(1500));
  }

  public getMe(): Observable<User> {
    return this.httpClient.get<User>(environment.api + 'user/me').pipe(timeout(1500));
  }
}
