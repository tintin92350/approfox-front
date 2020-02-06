import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {

  @Input() animated: boolean;
  @Input() width: number;
  @Input() height: number;
  @Input() percentages: boolean;

  constructor() {
    this.width = 500;
    this.height = 500;
    this.percentages = false;
  }

  ngOnInit() {
  }

  isAnimated(): boolean {
    return this.animated;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  isPercentage(): boolean {
    return this.percentages;
  }

}
