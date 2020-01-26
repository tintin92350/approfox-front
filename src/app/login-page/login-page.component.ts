import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  document: any;

  constructor(@Inject(DOCUMENT) document) {
    this.document = document;
   }

  ngOnInit() {
    this.setElementRightPlace();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setElementRightPlace();
  }

  @HostListener('window:load', ['$event'])
  onLoad(event) {
  }

  setElementRightPlace() {
    const documentWidth = window.innerWidth;
    const documentHeight = window.innerHeight;

    const imgWidth = this.document.getElementById('logo').width;
    const imgHeight = this.document.getElementById('logo').height;
    const loginHeight = this.document.getElementById('loginForm').clientHeight;

    this.document.getElementById('logo').style.left = ((documentWidth / 4.0) - (imgWidth / 2.0)) + 'px';
    this.document.getElementById('logo').style.top = ((documentHeight / 2.0) - imgHeight / 2.0) + 'px';
    this.document.getElementById('loginForm').style.top = ((documentHeight / 2.0) - (loginHeight / 2.0)) + 'px';    
  }

}
