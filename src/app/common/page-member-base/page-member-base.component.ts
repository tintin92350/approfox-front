import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {BannerService} from '../../services/banner.service';
import {BannerMessage} from '../../models/BannerMessage.model';
import {ToastService} from '../../services/toast.service';
import {ToastMessage} from '../../models/ToastMessage.model';

@Component({
  selector: 'app-page-member-base',
  templateUrl: './page-member-base.component.html',
  styleUrls: ['./page-member-base.component.css']
})
export class PageMemberBaseComponent implements OnInit {

  private userMenuOpened: boolean;
  private pageName: string;

  @ViewChild('accountMenuLink', { static: false }) element: ElementRef<any>;

  constructor(protected router: Router,
              protected authService: AuthService,
              private route: ActivatedRoute,
              private bannerService: BannerService,
              private toastService: ToastService) {
    this.userMenuOpened = false;
    route.url.subscribe(() => {
      this.pageName = route.snapshot.firstChild.data.name;
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
    console.log('logged out');
  }

  public getLinkToAccount(): string {
    const role = this.authService.getRole();
    return '/' + role + '/mon-compte';
  }

  public getPageName(): string {
    return this.pageName;
  }

  public getLastBanner(): BannerMessage {
    return this.bannerService.getLastBanner();
  }


  getToastService(): ToastService {
    return this.toastService;
  }

  getToasts(): ToastMessage[] {
    return this.toastService.getToasts();
  }
}
