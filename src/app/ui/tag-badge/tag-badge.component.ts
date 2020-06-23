import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tag } from 'src/app/models/tag.model';

@Component({
  selector: 'app-tag-badge',
  templateUrl: './tag-badge.component.html',
  styleUrls: ['./tag-badge.component.css', './tag-badge.dark.component.css']
})
export class TagBadgeComponent implements OnInit {

  @Input() tag: Tag;
  @Input() selectable: boolean;
  @Output() functionOnClick: EventEmitter<Tag> = new EventEmitter<any>();

  public isSelected: boolean;

  constructor() {
    this.isSelected = false;
  }

  ngOnInit() {
  }

  clickOnBadge(event) {
    this.functionOnClick.emit(this.tag);
    this.isSelected = !this.isSelected;
  }

}
