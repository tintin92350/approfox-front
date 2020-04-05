import { Injectable } from '@angular/core';
import {BannerMessage} from '../models/BannerMessage.model';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  private bannerMessages: BannerMessage[] = [];
  private total: number;

  constructor() { }


  public pushMessage(toast: BannerMessage) {
    this.total++;
    toast.id = (this.total);
    this.bannerMessages.push(toast);
  }

  public getToasts(): BannerMessage[] {
    return this.bannerMessages;
  }

  public update() {
    this.bannerMessages = this.bannerMessages.filter(banner => {
      return !banner.closed;
    });
  }

  public getLastBanner(): BannerMessage {
    return this.bannerMessages.length === 0 ? null : this.bannerMessages[this.bannerMessages.length - 1];
  }
}
