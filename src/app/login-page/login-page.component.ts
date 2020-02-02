import { Component, OnInit, HostListener, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../services/security/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  document: any;

  @Input() private username: string;
  @Input() private password: string;

  constructor(@Inject(DOCUMENT) document, private authService: AuthService) {
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
    this.setElementRightPlace();
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

  login() {
    this.authService.auth(this.username, this.password);
  }

}
