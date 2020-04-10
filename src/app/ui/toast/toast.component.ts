import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ToastMessage} from '../../models/ToastMessage.model';
import {ToastService} from '../../services/toast.service';
// @ts-ignore
import Timeout = NodeJS.Timeout;

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnChanges {

  @Input() toastMessage: ToastMessage;

  public timeoutFunction: Timeout;

  constructor(private toastService: ToastService) {
  }

  ngOnInit() {
    this.onLeave();
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

  public onHover() {
    clearTimeout(this.timeoutFunction);
  }

  public onLeave() {
    this.timeoutFunction = setTimeout(() => {
      this.toastMessage.closed = true;
      setTimeout(() => {
        this.toastService.update();
      }, 900);
    }, this.toastMessage.delay);
  }
}
