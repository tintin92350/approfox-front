import { Injectable } from '@angular/core';
import { Tag } from 'src/app/Models/tag.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private httpClient: HttpClient) { }

  getTagListOfUser(userId: number): Tag[] {
    const tag1 = new Tag(1, 1, 'developpeur');
    const tag2 = new Tag(2, 1, 'c/c++');
    const tag3 = new Tag(3, 1, 'java');

    if (userId === 1) {
      return [tag1, tag2, tag3];
    }

    return [];
  }

  /**
   * Returns the tag that have the given id
   * @param tagid Tag id
   */
  getTag(tagid: number): Observable<Tag> {
    return this.httpClient.get<Tag>(environment.apiUrl + 'tag?id=' + tagid);
  }

  /**
   * Returns the entire tag as list
   */
  getTags(): Observable<Tag[]> {
    return this.httpClient.get<Tag[]>(environment.apiUrl + 'tags');
  }

  /**
   * Returns the entire tag that a student has
   */
  getTagsOfStudent(studentid: number): Observable<Tag> {
    return this.httpClient.get<Tag>(environment.apiUrl + 'student/' + studentid + '/tags');
  }

}
