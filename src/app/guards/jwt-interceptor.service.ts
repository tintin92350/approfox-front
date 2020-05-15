import {Injectable, Injector} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector, private router: Router, private authenticationService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    if (this.authenticationService.isLogged()) {
      const auth = this.authenticationService.currentAuthInfoValue;
      const token = auth.accessToken;
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError(
        (err, caught) => {
          if (err.status === 401 && this.authenticationService.isLogged()) {
            this.authenticationService.logout();
            this.router.navigate(['/login']);
            return of(err);
          }
          throw err;
        }
      )
    );
  }
}
