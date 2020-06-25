import {AfterViewInit, Injectable, Renderer2} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkModeActivated: boolean;

  constructor() {
    this.darkModeActivated = false;

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme !== undefined && savedTheme !== null) {
      this.darkModeActivated = savedTheme === 'dark';
    }
  }

  public switch(renderer: Renderer2) {
    this.darkModeActivated = !this.darkModeActivated;

    if (this.darkModeActivated) {
      renderer.addClass(document.body, 'theme-dark');
      localStorage.setItem('theme', 'dark');
    } else {
      renderer.removeClass(document.body, 'theme-dark');
      localStorage.setItem('theme', 'normal');
    }
  }

  public update(renderer: Renderer2) {
    if (this.darkModeActivated) {
      renderer.addClass(document.body, 'theme-dark');
    } else {
      renderer.removeClass(document.body, 'theme-dark');
    }
  }

  public switchNoUpdate(activated: boolean) {
    this.darkModeActivated = activated;
  }

  public isDarkModeActivated(): boolean {
    return this.darkModeActivated;
  }

}
