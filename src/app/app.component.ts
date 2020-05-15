import {Component, Renderer2} from '@angular/core';
import {ThemeService} from './services/theme.service';
import {RouterCacheService} from './services/router-cache.service';
import {AuthService} from './services/auth.service';
import {ToastService} from './services/toast.service';
import {ToastMessage} from './models/ToastMessage.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private splashScreen = true;
  private remainUser = false;

  constructor(private themeService: ThemeService,
              private renderer: Renderer2,
              private routerCacheService: RouterCacheService,
              private authService: AuthService,
              private toastService: ToastService,
              private router: Router)  {
    setTimeout(() => {
      this.splashScreen = false;
    }, 25);

    const date = new Date();

    /*if (date.getHours() > 20 || date.getHours() < 6) {
      themeService.switchNoUpdate(true);
    }*/

    setInterval(() => {
      this.test();
    }, 1000);

    themeService.update(renderer);
  }

  isSplashScreen(): boolean {
    return this.splashScreen;
  }

  public getSessionRemainingTime(): number {
    const now = new Date();
    return Math.floor(60 - ((now.getTime() - this.authService.getConnectionDate().getTime()) / 60000));
  }

  public informUserSessionExpire(expireTime: number) {
    if (!this.remainUser) {
      this.toastService.pushToast(new ToastMessage(expireTime + ' minutes avant déconnexion !', 'warning'));
      this.remainUser = true;
    }
  }

  public test() {
    const remaining = this.getSessionRemainingTime();

    if (remaining === 30 || remaining === 25 || remaining === 10 || remaining === 5) {
      this.informUserSessionExpire(remaining);
    } else if (remaining <= 0) {
      if (!this.remainUser) {
        const m = new ToastMessage('Vous avez été déconnecté', 'error');
        m.infinite = true;
        this.toastService.pushToast(m);
        this.remainUser = true;
      }
    } else {
      this.remainUser = false;
    }

    if (remaining <= 10) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}
