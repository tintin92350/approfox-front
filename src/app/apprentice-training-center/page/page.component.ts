import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['../../common/style/page.component.css']
})
export class PageComponent implements OnInit {

  private userMenuOpened: boolean;

  constructor(private router: Router) {
    this.userMenuOpened = false;
    if (this.router.url.split('?')[0] === '/cfa') {
      this.router.navigate(['/cfa/dashboard']);
    }
  }

  ngOnInit() {
  }

  public isUserMenuOpened(): boolean {
    return this.userMenuOpened;
  }

  public openUserMenu() {
    this.userMenuOpened = !this.userMenuOpened;
  }

}
