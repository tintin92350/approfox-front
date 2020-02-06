import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tag} from '../../../models/tag.model';

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.css']
})
export class DataCardComponent implements OnInit {

  @Output() ClickOnCard: EventEmitter<number> = new EventEmitter<number>();
  @Input() title: string;
  @Input() number: number;
  @Input() icon: string;

  constructor() { }

  ngOnInit() {
  }

  clickOnCard(event) {
    this.ClickOnCard.emit(this.number);
  }

}
