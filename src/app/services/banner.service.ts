import {Injectable, OnDestroy} from '@angular/core';
import {BannerMessage} from '../models/BannerMessage.model';
import {AnnouncementApiService} from './announcement-api.service';
import {interval, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  subscription: Subscription;
  private bannerMessages: BannerMessage[] = [];
  private total: number;
  private lastId = 0;
  private watcher;

  constructor(private announcementApiService: AnnouncementApiService) {
    this.announcementApiService.getLastAnnouncement().subscribe(announcement => {
      if (announcement !== null) {
        this.pushMessage(announcement);
        this.lastId = announcement.id;
      }
    });

    this.watcher = interval(1000);

    this.subscription = this.watcher.subscribe(val => {
      this.announcementApiService.getLastAnnouncement().subscribe(announcement => {
        if (announcement !== null) {
          if (announcement.id !== this.lastId) {
            this.lastId = announcement.id;
            this.pop();
            this.pushMessage(announcement);
          }
        }
      });
    });
  }

  public pushMessage(toast: BannerMessage) {
    this.total++;
    toast.id = (this.total);
    this.bannerMessages.push(toast);
  }

  public pop() {
    this.bannerMessages.pop();
  }

  public update() {
    this.bannerMessages = this.bannerMessages.filter(banner => {
      return !banner.closed;
    });
  }

  public getLastBanner(): BannerMessage {
    return this.bannerMessages.length === 0 ? null : this.bannerMessages[this.bannerMessages.length - 1];
  }

  public release() {
    while (this.bannerMessages.length > 0) {
      this.bannerMessages.pop();
    }

    this.lastId = -1;
  }
}
