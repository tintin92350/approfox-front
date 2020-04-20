import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BannerMessage} from '../../../models/BannerMessage.model';

@Component({
  selector: 'app-server-configuration',
  templateUrl: './server-configuration.component.html',
  styleUrls: ['./server-configuration.component.css']
})
export class ServerConfigurationComponent implements OnInit {

  public announcement = new BannerMessage('', '');
  public message: string;

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.announcement.type = 'announcement';
    let id = 1;
    if (localStorage.getItem('announcement') !== null) {
      id = JSON.parse(localStorage.getItem('announcement')).id + 1;
    }
    this.announcement.id = id;
    localStorage.setItem('announcement', JSON.stringify(this.announcement));
    this.announcement.message = '';
  }

}
