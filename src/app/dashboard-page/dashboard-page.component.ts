import { Component, OnInit, Inject, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  private accountMenuShowed = false;

  constructor(public router: Router) {
  }

  ngOnInit() {
  }

  accountButton() {
    this.accountMenuShowed = (this.accountMenuShowed) ? false : true;
  }

}
