import { Injectable } from '@angular/core';
import {ToastService} from './toast.service';
import {ToastMessage} from '../models/ToastMessage.model';

@Injectable({
  providedIn: 'root'
})
export class ApiResponseHandlerService {

  constructor(private toastService: ToastService) { }

  public handleError(error) {
    if (error.status === 403) {
      this.toastService.pushToast(new ToastMessage('Accès non autorisé à une ressource', 'error'));
    } else if (error.status === 404) {
      this.toastService.pushToast(new ToastMessage('Accès à une ressource inconnue', 'error'));
    } else if (error.status === 500) {
      this.toastService.pushToast(new ToastMessage('Une erreur inattendu c\'est produit', 'error'));

    }
  }
}
