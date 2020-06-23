import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tag} from '../models/tag.model';
import {environment} from '../../environments/environment';
import {timeout} from 'rxjs/operators';
import {CV} from '../models/cv.model';

@Injectable({
  providedIn: 'root'
})
export class CVService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Returns the CV that have the given id
   * @param cvid CV id
   */
  getCV(cvid: number): Observable<CV> {
    return this.httpClient.get<CV>(environment.api + 'cv/' + cvid).pipe(timeout(1500));
  }

  /**
   * Returns the CV that belongs to an user
   * @param userid CV owner id
   */
  getCvOfUser(userid: number): Observable<CV> {
    return this.httpClient.get<CV>(environment.api + 'cv/user/' + userid).pipe(timeout(1500));
  }

  /**
   * Returns the entire CV list
   */
  getAllCv(): Observable<CV[]> {
    return this.httpClient.get<CV[]>(environment.api + 'cv/all').pipe(timeout(1500));
  }

  /**
   * Add a new tag to the database
   * @param cv CV to add
   */
  addCv(cv: CV): Observable<CV> {
    return this.httpClient.post<CV>(environment.api + 'cv', cv).pipe(timeout(1500));
  }

  /**
   * Approve a CV
   * @param cv CV to approve
   */
  approveCv(cv: CV): Observable<CV> {
    return this.httpClient.patch<CV>(environment.api + 'cv/' + cv.cvId + '/approve', cv).pipe(timeout(1500));
  }

  /**
   * Reject a CV
   * @param cv CV to reject
   */
  rejectCv(cv: CV): Observable<CV> {
    return this.httpClient.patch<CV>(environment.api + 'cv/' + cv.cvId + '/reject', cv).pipe(timeout(1500));
  }

  /**
   * Patch CV file
   * @param cv CV to approve
   */
  updateCvFile(cv: CV): Observable<CV> {
    return this.httpClient.patch<CV>(environment.api + 'cv/' + cv.cvId, cv.cvFile).pipe(timeout(1500));
  }
}
