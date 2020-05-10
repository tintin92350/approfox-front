import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {BannerService} from '../../services/banner.service';
import {BannerMessage} from '../../models/BannerMessage.model';
import {ToastService} from '../../services/toast.service';
import {ToastMessage} from '../../models/ToastMessage.model';
import {ThemeService} from '../../services/theme.service';

@Component({
  selector: 'app-page-member-base',
  templateUrl: './page-member-base.component.html',
  styleUrls: ['./page-member-base.component.css', './page-member-base.dark.component.css']
})
export class PageMemberBaseComponent implements OnInit {

  private userMenuOpened: boolean;
  private pageName: string;
  private mainNavigationOpened: boolean;

  public sourceX: string;

  @ViewChild('accountMenuLink', { static: false }) element: ElementRef;

  constructor(protected router: Router,
              protected authService: AuthService,
              private route: ActivatedRoute,
              private bannerService: BannerService,
              private toastService: ToastService,
              public themeService: ThemeService,
              public renderer: Renderer2) {
    this.userMenuOpened = false;
    route.url.subscribe(() => {
      this.pageName = route.snapshot.firstChild.data.name;
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
}
