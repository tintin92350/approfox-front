import { Injectable } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouterCacheService {

  private _previousUrl: string;
  private _currentUrl: string;
  private _nextUrl: string;
  private _routeHistory: string[];
  private _currentUrlIndex;
  private forwarding: boolean;

  constructor(private router: Router) {
    this._routeHistory = [];
    this._currentUrlIndex = 0;
    this.forwarding = false;

    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this._setURLs(event);
      });
  }

  private _setURLs(event: NavigationEnd): void {

    if (this.forwarding) {
      this._routeHistory = this._routeHistory.slice(0, this._currentUrlIndex);
    }

    if (this._currentUrlIndex === this._routeHistory.length ) {
      this._routeHistory.push(event.urlAfterRedirects);
    } else {
      this._routeHistory[this._currentUrlIndex] = event.urlAfterRedirects;
    }

    this._currentUrlIndex++;
  }


  public nextUrl(): boolean {
    return this._currentUrlIndex < this._routeHistory.length;
  }

  get routeHistory(): string[] {
    return this._routeHistory;
  }

  public navigateToPreviousUrl() {
    if (this.routeHistory.length > 0) {
      const previousUrl = this.routeHistory[this._currentUrlIndex - 2];
      if (previousUrl !== undefined) {
        if (this._currentUrlIndex < 0) {
          this._currentUrlIndex = 0;
        }
        this.router.navigate([previousUrl]);
        this._currentUrlIndex -= 2;
      }
    }
  }

  public navigateToNextUrl() {
    if (this.routeHistory.length > 0) {
      const nextUrl = this.routeHistory[this._currentUrlIndex];
      if (nextUrl !== undefined) {
        this.forwarding = true;
        this.router.navigate([nextUrl]);
        this.forwarding = false;
      }
    }
  }
}
