import { Component } from '@angular/core';
import {ToastService} from './services/toast.service';
import {ToastMessage} from './models/ToastMessage.model';

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
    }, 5);
  }

  isSplashScreen(): boolean {
    return this.splashScreen;
  }
}
