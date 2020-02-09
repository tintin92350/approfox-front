import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page-member-base',
  template: ``,
  styleUrls: ['./page-member-base.component.css']
})
export class PageMemberBaseComponent implements OnInit {

  private userMenuOpened: boolean;

  @ViewChild('accountMenuLink', { static: false }) element: ElementRef<any>;

  constructor(protected router: Router) {
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
}