import {Component, Input, OnInit} from '@angular/core';
import {BannerService} from '../../services/banner.service';
import {BannerMessage} from '../../models/BannerMessage.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  @Input() banner: BannerMessage;

  constructor(private bannerService: BannerService) { }

  ngOnInit() {
  }

  getIcon(): string {
    switch (this.banner.type) {
      case 'warning':
        return 'fa-exclamation-triangle';
      case 'error':
        return 'fa-times';
      case 'announcement':
        return 'fa-bullhorn';
    }

    return '';
  }

  close() {
      this.banner.closed = true;
      this.bannerService.update();
  }

}
