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
  public closing = false;

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
    this.closing = true;
    setTimeout(() => { this.realClose(); }, 800);
  }

  private realClose() {
      this.toastMessage.closed = true;
      this.toastService.update();
  }

  private delay() {
    this.toastMessage.closed = true;
    setTimeout(this.realClose, 300);
  }

  public onHover() {
    clearTimeout(this.timeoutFunction);
  }

  public onLeave() {
    if (!this.toastMessage.infinite) {
      this.timeoutFunction = setTimeout(() => {
        setTimeout(() => {
          this.close();
        }, 900);
      }, this.toastMessage.delay);
    }
  }
}
