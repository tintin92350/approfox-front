import {Component, ElementRef, HostListener, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {BannerService} from '../../services/banner.service';
import {Router} from '@angular/router';
import {BannerMessage} from '../../models/BannerMessage.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css', '../logo/logo.component.css']
})
export class LoginPageComponent implements OnInit {

  document: any;

  public username: string;
  public password: string;

  public emptyUsername = false;
  public emptyPassword = false;

  public badCredentials = false;

  constructor(@Inject(DOCUMENT) document, private authService: AuthService, private bannerService: BannerService, private router: Router) {
    this.document = document;
    this.username = '';
    this.password = '';
  }

  ngOnInit() {
    this.bannerService.release();
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

      if (documentWidth >= 800) {
        this.document.getElementById('loginForm').style.top = ((documentHeight / 2.0) - (loginHeight / 2.0)) + 'px';
      } else {
        this.document.getElementById('loginForm').style.top = '0';
      }
  }

  login() {

    this.emptyUsername = (this.username === '');
    this.emptyPassword = (this.password === '');

    if (!this.emptyPassword && !this.emptyUsername) {
      this.authService.login(this.username.toLocaleLowerCase(), this.password).subscribe(result => {
        this.router.navigate(['/']);
      }, error => {
        this.badCredentials = true;
      });
    }
  }
}
