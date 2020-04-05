import {Component, Input, OnInit} from '@angular/core';
import {ToastMessage} from '../../models/ToastMessage.model';
import {ToastService} from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  @Input() toastMessage: ToastMessage;

  constructor(private toastService: ToastService) {
  }

  ngOnInit() {
  }

  public getToast(): ToastMessage {
    return this.toastMessage;
  }

  public close() {
    console.log('closing the ' + this.toastMessage.id + '-th toast');
    this.toastMessage.closed = true;
    this.toastService.update();
  }

}
