import { Component, OnInit, Inject, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  document: any;

  @ViewChild('mainNavigation', {read: ElementRef, static: false}) mainNavigation: ElementRef;

  constructor(@Inject(DOCUMENT) document, public router: Router) {
    this.document = document;
   }

  ngOnInit() {
    this.updateGraphicsElementToRightPlace();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateGraphicsElementToRightPlace();
  }

  @HostListener('window:load', ['$event'])
  onLoad(event) {
    this.updateGraphicsElementToRightPlace();
  }

  updateGraphicsElementToRightPlace() {
    const documentWidth = window.innerWidth;
    const documentHeight = window.innerHeight;

    if(this.mainNavigation != null) {
      this.document.getElementById('main-navigation').style.right = 0;
      this.document.getElementById('main-navigation').style.top = ((documentHeight / 2.0) - (this.mainNavigation.nativeElement.offsetHeight / 2.0)) + 'px';
    }
  }

}
