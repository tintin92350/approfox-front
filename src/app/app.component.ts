import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  splashScreen = false;
  title = 'approfox-dev';

  constructor()  {
    /*setTimeout(() => {
      this.splashScreen = false;
    }, 32);*/
  }
}
