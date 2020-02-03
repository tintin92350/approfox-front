import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  splashScreen = true;
  title = 'approfox-dev';

  constructor()  {
    setTimeout(() => {
      this.splashScreen = false;
    }, 1800);
  }
}
