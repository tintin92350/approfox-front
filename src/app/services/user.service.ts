import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/User.model';
import {environment} from '../../environments/environment';
import {timeout} from 'rxjs/operators';
import {Tag} from '../models/tag.model';
import {Role} from '../models/Role.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(environment.api + 'users/' + id).pipe(timeout(1500));
  }

  public getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.api + 'users').pipe(timeout(1500));
  }


  public getAllUsersByDepartment(department: number): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.api + 'users?department=' + department).pipe(timeout(1500));
  }
  public getAllUsersByRole(role: Role): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.api + 'users?role=' + role).pipe(timeout(1500));
  }
  public getAllUsersByDepartmentAndRole(department: number, role: Role): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.api + 'users?department=' + department + '&role=' + role).pipe(timeout(1500));
  }

  public getUsersFiltered(department: number, role: Role, firstname: string, lastname: string, login: string): Observable<User[]> {
    if (department !== undefined) {
      return this.httpClient.get<User[]>(environment.api + 'users?department=' + department + '&role=' + role + '&firstname=' + firstname + '&lastname=' + lastname + '&login=' + login).pipe(timeout(1500));
    } else {
      return this.httpClient.get<User[]>(environment.api + 'users?role=' + role + '&firstname=' + firstname + '&lastname=' + lastname + '&login=' + login).pipe(timeout(1500));
    }
  }
  public getStudentsFiltered(department: number, firstname: string, lastname: string, login: string): Observable<User[]> {
    if (department !== undefined) {
      return this.httpClient.get<User[]>(environment.api + 'users?department=' + department + '&role=' + Role.STUDENT + '&firstname=' + firstname + '&lastname=' + lastname + '&login=' + login).pipe(timeout(1500));
    } else {
      return this.httpClient.get<User[]>(environment.api + 'users?firstname=' + firstname + '&role=' + Role.STUDENT + '&lastname=' + lastname + '&login=' + login).pipe(timeout(1500));
    }
  }

  public addUser(user: User): Observable<User> {
    return this.httpClient.post<any>(environment.api + 'users', user).pipe(timeout(1500));
  }

  public getMe(): Observable<User> {
    return this.httpClient.get<User>(environment.api + 'users/me').pipe(timeout(1500));
  }

  public getTagOfUser(id: number): Observable<Tag[]> {
    return this.httpClient.get<Tag[]>(environment.api + 'users/' + id + '/tags').pipe(timeout(1500));
  }

  public getMyTags(): Observable<Tag[]> {
    return this.httpClient.get<Tag[]>(environment.api + 'users/me/tags').pipe(timeout(1500));
  }

  public patchUserTags(id: number, tags: Tag[]): Observable<User> {
    return this.httpClient.patch<User>(environment.api + 'users/' + id + '/tags', tags).pipe(timeout(1500));
  }
}
