import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private splashScreen = true;

  constructor()  {
    setTimeout(() => {
      this.splashScreen = false;
    }, 1800);
  }

  isSplashScreen(): boolean {
    return this.splashScreen;
  }
}
