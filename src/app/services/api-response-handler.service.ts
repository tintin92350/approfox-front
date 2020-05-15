import { Injectable } from '@angular/core';
import {ToastService} from './toast.service';
import {ToastMessage} from '../models/ToastMessage.model';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiResponseHandlerService {

  constructor(private toastService: ToastService,
              private authenticationService: AuthService,
              private router: Router) { }


  public handleSuccess(message) {
    this.toastService.pushToast(new ToastMessage(message, 'success'));
  }

  public handleError(error) {
    if (error.status === 403) {
      this.toastService.pushToast(new ToastMessage('Accès non autorisé à une ressource', 'error'));
    } else if (error.status === 404) {
      this.toastService.pushToast(new ToastMessage('Accès à une ressource inconnue', 'error'));
    } else if (error.status === 500) {
      this.toastService.pushToast(new ToastMessage('Une erreur inattendu c\'est produit', 'error'));
    } else if (error.status === 401) {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
    }
  }
}
