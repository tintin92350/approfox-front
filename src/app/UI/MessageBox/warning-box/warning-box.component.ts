import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-warning-box',
  templateUrl: './warning-box.component.html',
  styleUrls: ['../MessageBox.css', './warning-box.component.css']
})
export class WarningBoxComponent implements OnInit {

  @Input() message: string;

  constructor() { }

  ngOnInit() {
  }

}
