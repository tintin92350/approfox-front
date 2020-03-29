import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-page-member-base',
  templateUrl: './page-member-base.component.html',
  styleUrls: ['./page-member-base.component.css']
})
export class PageMemberBaseComponent implements OnInit {

  private userMenuOpened: boolean;

  @ViewChild('accountMenuLink', { static: false }) element: ElementRef<any>;

  constructor(protected router: Router, protected authService: AuthService) {
    this.userMenuOpened = false;
  }

  ngOnInit() {
  }

  public isUserMenuOpened(): boolean {
    return this.userMenuOpened;
  }

  public openUserMenu() {
    this.userMenuOpened = !this.userMenuOpened;
  }

  public closeUserMenu(event: any) {
    this.userMenuOpened = event.composedPath().includes(this.element.nativeElement);
  }

  public logout() {
    this.authService.logout();
    console.log('logged out');
  }

  public getLinkToAccount(): string {
    const role = this.authService.getRole();
    return '/' + role + '/mon-compte';
  }
}
