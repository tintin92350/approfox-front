import {Component, Renderer2} from '@angular/core';
import {ThemeService} from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private splashScreen = true;

  constructor(private themeService: ThemeService,
              private renderer: Renderer2)  {
    setTimeout(() => {
      this.splashScreen = false;
    }, 25);

    const date = new Date();

    if (date.getHours() > 20 || date.getHours() < 6) {
      themeService.switchNoUpdate(true);
    }

    themeService.update(renderer);
  }

  isSplashScreen(): boolean {
    return this.splashScreen;
  }
}
