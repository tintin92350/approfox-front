import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {BannerService} from '../../services/banner.service';
import {BannerMessage} from '../../models/BannerMessage.model';
import {ToastService} from '../../services/toast.service';
import {ToastMessage} from '../../models/ToastMessage.model';
import {ThemeService} from '../../services/theme.service';
import {RouterCacheService} from '../../services/router-cache.service';
import {Time} from '@angular/common';

@Component({
  selector: 'app-page-member-base',
  templateUrl: './page-member-base.component.html',
  styleUrls: ['./page-member-base.component.css', './page-member-base.dark.component.css']
})
export class PageMemberBaseComponent implements OnInit {

  private userMenuOpened: boolean;
  private pageName: string;
  private mainNavigationOpened: boolean;

  @ViewChild('accountMenuLink', { static: false }) element: ElementRef;

  constructor(protected router: Router,
              protected authService: AuthService,
              private route: ActivatedRoute,
              private bannerService: BannerService,
              private toastService: ToastService,
              public themeService: ThemeService,
              public renderer: Renderer2,
              public routerCacheService: RouterCacheService) {
    this.userMenuOpened = false;
    route.url.subscribe(() => {
      if (route.snapshot.firstChild) {
        this.pageName = route.snapshot.firstChild.data.name;
      } else {
        const role = this.authService.roleApiToRoleFront(this.authService.getRole());
        router.navigate(['/' + role + '/dashboard']);
      }
    });
    this.mainNavigationOpened = false;

    router.events.subscribe((val) => {
      this.mainNavigationOpened = false;
    });
  }

  ngOnInit() {
    this.bannerService.release();
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
    this.router.navigate(['/login']);
    this.mainNavigationOpened = false;
    console.log('logged out');
  }

  public goToAccount() {
    const role = this.authService.getRole();
    this.router.navigate(['/' + role + '/mon-compte']);
    this.mainNavigationOpened = false;
    this.userMenuOpened = false;
  }

  public getPageName(): string {
    return this.pageName;
  }

  public getLastBanner(): BannerMessage {
    return this.bannerService.getLastBanner();
  }

  getToasts(): ToastMessage[] {
    return this.toastService.getToasts();
  }

  openMainNavigation() {
    this.mainNavigationOpened = !this.mainNavigationOpened;
  }

  isMainNavigationOpened(): boolean {
    return this.mainNavigationOpened;
  }

  isSmallScreen(): boolean {
    return window.innerWidth <= 810;
  }


  openMainNavigationOnSwipe(event) {
    const documentWidth = window.innerWidth;
    const sourceX = event.center.x;
    if (sourceX < 250) {
      this.mainNavigationOpened = true;
    }
  }

  closeMainNavigationOnSwipe(event) {
    this.mainNavigationOpened = false;
  }

  closeMainNavigationOnSwipeOutside(event) {
    if (event.clientY > 64) {
      this.closeMainNavigationOnSwipe(event);
    }
  }

  back() {
    this.routerCacheService.navigateToPreviousUrl();
  }

  forward() {
    this.routerCacheService.navigateToNextUrl();
  }

  public getSessionRemainingTime(): number {
    const now = new Date();
    return Math.floor(60 - ((now.getTime() - this.authService.getConnectionDate().getTime()) / 60000));
  }
}
