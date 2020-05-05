import {Component, HostListener, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {LogoComponent} from '../logo/logo.component';
import {AuthService} from '../../services/auth.service';
import {BannerService} from '../../services/banner.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css', '../logo/logo.component.css']
})
export class LoginPageComponent implements OnInit {

  document: any;

  @Input() public username: string;
  @Input() public password: string;

  constructor(@Inject(DOCUMENT) document, private authService: AuthService, private bannerService: BannerService, private router: Router) {
    this.document = document;
    this.username = '';
    this.password = '';

    console.log('auth : ' + this.authService.isAuthenticated());
  }

  ngOnInit() {
    this.bannerService.release();
    console.log(this.bannerService.getLastBanner());
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
      }
  }

  login() {
    console.log('Authentication...');
    this.authService.auth(this.username.toLocaleLowerCase(), this.password).subscribe(result => {
      localStorage.setItem('auth', JSON.stringify(result));
      const role = this.authService.roleApiToRoleFront(result.roles[0]);
      this.router.navigate(['/']);

      console.log('go to ' + role);
    }, error => {
      console.log('error during auth.');
    });
  }
}
