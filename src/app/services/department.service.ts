import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tag} from '../models/tag.model';
import {environment} from '../../environments/environment';
import {timeout} from 'rxjs/operators';
import {Department} from '../models/Department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Returns the entire department as list
   */
  getAllDepartments(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(environment.api + 'department/all').pipe(timeout(1500));
  }

  /**
   * Add a new department to the database
   * @param department Department to add
   * @return department added
   */
  addDepartment(department: Department): Observable<Department> {
    return this.httpClient.post<Department>(environment.api + 'department', department).pipe(timeout(1500));
  }
}
