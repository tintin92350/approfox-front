import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {ToastMessage} from '../../models/ToastMessage.model';
import {ToastService} from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnChanges {

  @Input() toastMessage: ToastMessage;

  constructor(private toastService: ToastService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.toastMessage.closed = true;
      setTimeout(() => {
        this.toastService.update();
      }, 900);
    }, this.toastMessage.delay);
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  public getToast(): ToastMessage {
    return this.toastMessage;
  }

  public close() {
    console.log('closing the ' + this.toastMessage.id + '-th toast');
    this.toastMessage.closed = true;
    setTimeout(this.realClose, 300);
  }

  private realClose() {
    console.log(this.toastMessage);
    this.toastService.update();
  }

  private delay() {
    console.log(this.toastMessage);
    this.toastMessage.closed = true;
    setTimeout(this.realClose, 300);
  }

}
