import { Injectable } from '@angular/core';
import { Tag } from 'src/app/Models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor() { }

  getTagListOfUser(userId: number): Tag[] {
    const tag1 = new Tag(1, 1, 'developpeur');
    const tag2 = new Tag(2, 1, 'c/c++');
    const tag3 = new Tag(3, 1, 'java');

    if (userId === 1) {
      return [tag1, tag2, tag3];
    }

    return [];
  }
}
