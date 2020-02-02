import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-success-box',
  templateUrl: './success-box.component.html',
  styleUrls: ['../MessageBox.css','./success-box.component.css']
})
export class SuccessBoxComponent implements OnInit {

  @Input() message: string;

  constructor() { }

  ngOnInit() {
  }

}
