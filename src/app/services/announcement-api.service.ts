import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BannerMessage} from '../models/BannerMessage.model';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementApiService {

  constructor(private httpClient: HttpClient) { }

  getLastAnnouncement(): Observable<BannerMessage>  {
    return new Observable<BannerMessage>((observer) => {
      if (localStorage.getItem('announcement') !== null) {
         const announcementJson = JSON.parse(localStorage.getItem('announcement'));
         const announcementObj = new BannerMessage(announcementJson.message, announcementJson.type);
         announcementObj.id = announcementJson.id;
         observer.next(announcementObj);
      } else {
        observer.next(null);
      }
    });
  }
}
