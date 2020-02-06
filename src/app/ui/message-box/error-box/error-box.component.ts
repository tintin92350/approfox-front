import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-box',
  templateUrl: './error-box.component.html',
  styleUrls: ['../message-box.css', './error-box.component.css']
})
export class ErrorBoxComponent implements OnInit {

  @Input() message: string;

  constructor() { }

  ngOnInit() {
  }

}
