import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../environments/environment';
import {Tag} from '../models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Returns the tag that have the given id
   * @param tagid Tag id
   */
  getTag(tagid: number): Observable<Tag> {
    return this.httpClient.get<Tag>(environment.api + 'tag?id=' + tagid);
  }

  /**
   * Returns the entire tag as list
   */
  getTags(): Observable<Tag[]> {
    return this.httpClient.get<Tag[]>(environment.api + 'tags');
  }
}
