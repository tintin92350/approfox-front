import { Component, OnInit, Inject, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './app-page.component.html',
  styleUrls: ['./app-page.component.css']
})
export class AppPageComponent implements OnInit {

  private accountMenuShowed = false;

  constructor(public router: Router) {
  }

  ngOnInit() {
  }

  accountButton() {
    this.accountMenuShowed = (this.accountMenuShowed) ? false : true;
  }

  isAccountMenuShowed(): boolean {
    return this.accountMenuShowed;
  }

  navigateTo(to: string) {
    this.accountMenuShowed = false;
    this.router.navigate([to]);
  }

}
