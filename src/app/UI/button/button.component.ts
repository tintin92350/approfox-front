import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() label: string;
  @Input() type: string;
  @Input() fullSize: boolean;
  @Output() functionClick = new EventEmitter<boolean>();

  constructor() {
    this.label = 'Button';
    this.type = 'secondary';
  }

  ngOnInit() {
  }

  onClickButton(event) {
    this.functionClick.emit(event);
  }

}
