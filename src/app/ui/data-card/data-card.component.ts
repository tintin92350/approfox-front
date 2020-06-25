import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tag} from '../../models/tag.model';

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.css', './data-card.dark.component.css']
})
export class DataCardComponent implements OnInit {

  @Output() ClickOnCard: EventEmitter<number> = new EventEmitter<number>();
  @Input() title: string;
  @Input() number: number;
  @Input() icon: string;
  @Input() status: string;

  constructor() { }

  ngOnInit() {
  }

  clickOnCard(event) {
    this.ClickOnCard.emit(this.number);
  }

}
