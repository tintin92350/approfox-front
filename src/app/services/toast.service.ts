import { Injectable } from '@angular/core';
import {ToastMessage} from '../models/ToastMessage.model';

@Injectable()
export class ToastService {

  private toastMessages: ToastMessage[] = [];
  private total: number;

  constructor() {
    this.total = 0;
  }

  public pushToast(toast: ToastMessage) {
    this.total++;
    toast.id = (this.total);
    this.toastMessages.push(toast);
  }

  public getToasts(): ToastMessage[] {
    return this.toastMessages;
  }

  public update() {
    this.toastMessages = this.toastMessages.filter(toast => {
      return !toast.closed;
    });
  }
}
