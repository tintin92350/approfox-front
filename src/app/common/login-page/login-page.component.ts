import {Component, HostListener, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {LogoComponent} from '../logo/logo.component';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  document: any;

  @Input() public username: string;
  @Input() public password: string;

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

      this.document.getElementById('logo').style.left = ((documentWidth / 4.0) - (250.0)) + 'px';
      this.document.getElementById('logo').style.top = ((documentHeight / 2.0) - (250.0)) + 'px';
      this.document.getElementById('loginForm').style.top = ((documentHeight / 2.0) - (loginHeight / 2.0)) + 'px';
  }

  login() {
    console.log('Authentication...');
    this.authService.auth(this.username.toLocaleLowerCase(), this.password);
  }
}
